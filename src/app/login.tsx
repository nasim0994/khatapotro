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
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 24,
          justifyContent: "space-between",
          paddingTop: 16,
        }}
      >
        <View>
          <BackBtn />

          {/* TYPOGRAPHY SECTION */}
          <View style={{ marginTop: 32, gap: 8 }}>
            <Text
              style={{
                color: "white",
                fontSize: 32,
                letterSpacing: -0.5,
                ...commonStyles.fontMedium,
              }}
            >
              Welcome Back
            </Text>
            <Text
              style={{
                color: "#CCCCCC",
                fontSize: 14,
                marginTop: 4,
                ...commonStyles.fontRegular,
              }}
            >
              Log in to your account to monitor your expenses
            </Text>
          </View>

          {/* FORM INPUTS SECTION */}
          <View style={{ marginTop: 30, gap: 14 }}>
            {/* EMAIL INPUT */}
            <View style={[commonStyles.inputFieldBox]}>
              <Feather name="at-sign" size={18} color="#ccc" />
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#ccc"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                style={commonStyles.fieldInputText}
              />
            </View>

            {/* PASSWORD INPUT */}
            <View>
              <View style={[commonStyles.inputFieldBox]}>
                <Feather name="lock" size={18} color="#ccc" />
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="#ccc"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={setPassword}
                  style={[commonStyles.fieldInputText]}
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
              <Link href="/forgot-password" style={{ marginTop: 8 }}>
                <Text
                  style={{
                    color: "#2F80ED",
                    textAlign: "right",
                    fontSize: 12,
                    ...commonStyles.fontMedium,
                  }}
                >
                  Forgot Password?
                </Text>
              </Link>
            </View>

            {/* BUTTON & FOOTER SECTION */}
            <View>
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
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#CCCCCC",
                  fontSize: 14,
                  ...commonStyles.fontRegular,
                }}
              >
                Don't have an account?{" "}
              </Text>
              <Link href="/signup">
                <Text
                  style={{
                    color: "#2F80ED",
                    fontSize: 14,
                    ...commonStyles.fontRegular,
                  }}
                >
                  Sign Up
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </AppBackground>
  );
}
