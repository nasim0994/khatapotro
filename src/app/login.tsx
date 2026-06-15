import AppBackground from "@/components/AppBackground";
import BackBtn from "@/components/BackBtn";
import { commonStyles } from "@/constants/style";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userLoggedIn } from "@/redux/slices/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const router = useRouter();
  const { loggedUser } = useAppSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (loggedUser?.email) router.push("/(tabs)/dashboard");
  }, [loggedUser]);

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text2: "Please fill in all fields to continue",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }

    const data = {
      email,
      password,
    };

    try {
      const res = await loginUser(data).unwrap();
      if (res?.success) {
        Toast.show({
          type: "success",
          text2: res?.message,
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
        });

        const token = res?.data?.accessToken;
        const user = verifyToken(token);
        dispatch(userLoggedIn({ token, user }));

        router.push("/(tabs)/dashboard");
      }
    } catch (err: any) {
      const firstErrorMessage =
        Array.isArray(err?.data?.error) && err.data.error.length > 0
          ? `${err.data.error[0].path}: ${err.data.error[0].message}`
          : err?.data?.message || "Something went wrong";

      Toast.show({
        type: "error",
        text2: firstErrorMessage,
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  return (
    <AppBackground>
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-6 justify-between pt-4 pb-8">
          <View>
            <BackBtn />

            {/* TYPOGRAPHY SECTION */}
            <View className="mt-8 space-y-2">
              <Text className="text-white text-[32px] font-bold tracking-tight">
                Welcome Back
              </Text>
              <Text className="text-gray-300 text-sm mt-1">
                Log in to your account to monitor your expenses
              </Text>
            </View>

            {/* FORM INPUTS SECTION */}
            <View className="mt-10 space-y-4">
              {/* EMAIL INPUT */}
              <View className="flex-row items-center bg-white/20 border border-white/10 rounded-2xl px-4 py-3.5 mb-4">
                <Feather name="at-sign" size={18} color="#ccc" />
                <TextInput
                  className="flex-1 text-white ml-3 text-base"
                  placeholder="Enter your email"
                  placeholderTextColor="#ccc"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* PASSWORD INPUT */}
              <View className="flex-row items-center bg-white/20 border border-white/10 rounded-2xl px-4 py-3.5">
                <Feather name="lock" size={18} color="#ccc" />
                <TextInput
                  className="flex-1 text-white ml-3 text-base"
                  placeholder="Enter your password"
                  placeholderTextColor="#ccc"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Feather
                    name={showPassword ? "eye" : "eye-off"}
                    size={18}
                    color="#ccc"
                  />
                </TouchableOpacity>
              </View>

              {/* FORGOT PASSWORD */}
              <TouchableOpacity className="align-self-end mt-2">
                <Text className="text-[#4D96FF] text-right text-xs font-semibold">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* BUTTON & FOOTER SECTION */}
          <View className="space-y-6">
            <TouchableOpacity
              activeOpacity={0.85}
              style={commonStyles.primaryButton}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <Text style={commonStyles.primaryButtonText}>
                {isLoading ? "Loading..." : "Log in"}
              </Text>
            </TouchableOpacity>

            {/* REDIRECT TO SIGN UP */}
            <View className="flex-row justify-center items-center mt-4">
              <Text className="text-gray-300 text-sm">
                Don't have an account?{" "}
              </Text>
              <Link href="/signup">
                <Text className="text-primary text-sm font-bold">Sign Up</Text>
              </Link>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </AppBackground>
  );
}
