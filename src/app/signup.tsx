import AppBackground from "@/components/AppBackground";
import BackBtn from "@/components/BackBtn";
import { useRegisterUserMutation } from "@/redux/features/auth/authApi";
import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = async () => {
    if (!email) {
      Toast.show({
        type: "error",
        text2: "Email Is required!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }

    if (!name) {
      Toast.show({
        type: "error",
        text2: "Name is required!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }

    if (!password) {
      Toast.show({
        type: "error",
        text2: "Password is required!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }

    if (password !== rePassword) {
      Toast.show({
        type: "error",
        text2: "Password not match!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }

    const data = {
      name,
      email,
      password,
    };

    try {
      const res = await registerUser(data).unwrap();
      if (res?.success) {
        Toast.show({
          type: "success",
          text2: res?.message,
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
        });

        router.push({
          pathname: "/registration-verification",
          params: { email },
        });
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
                Create Account
              </Text>
              <Text className="text-gray-300 text-sm mt-1">
                Sign up to get started with your financial journey
              </Text>
            </View>

            {/* FORM INPUTS SECTION */}
            <View className="mt-10 space-y-4">
              {/* Name INPUT */}
              <View className="flex-row items-center bg-white/20 border border-white/10 rounded-2xl px-4 py-3.5 mb-4">
                <Feather name="user" size={18} color="#ccc" />
                <TextInput
                  className="flex-1 text-white ml-3 text-base"
                  placeholder="Enter your name"
                  placeholderTextColor="#ccc"
                  keyboardType="default"
                  autoCapitalize="none"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* EMAIL INPUT */}
              <View className="flex-row items-center bg-white/20 border border-white/10 rounded-2xl px-4 py-3.5 mb-4">
                <Feather name="at-sign" size={18} color="#828282" />
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
              <View className="flex-row items-center bg-white/20 border border-white/10 rounded-2xl px-4 py-3.5 mb-4">
                <Feather name="lock" size={18} color="#828282" />
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

              {/* PASSWORD INPUT */}
              <View className="flex-row items-center bg-white/20 border border-white/10 rounded-2xl px-4 py-3.5">
                <Feather name="lock" size={18} color="#ccc" />
                <TextInput
                  className="flex-1 text-white ml-3 text-base"
                  placeholder="Enter confirm password"
                  placeholderTextColor="#ccc"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  value={rePassword}
                  onChangeText={setRePassword}
                />
              </View>
            </View>
          </View>

          {/* BUTTON & FOOTER SECTION */}
          <View className="space-y-6">
            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.85}
              className="w-full bg-primary py-4 rounded-2xl justify-center items-center shadow-lg"
              style={{
                shadowColor: "#2F80ED",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
              }}
              disabled={isLoading}
            >
              <Text className="text-white text-lg font-bold">
                {isLoading ? "loading..." : "Register"}
              </Text>
            </TouchableOpacity>

            {/* REDIRECT TO SIGN UP */}
            <View className="flex-row justify-center items-center mt-4">
              <Text className="text-gray-300 text-sm">
                Already have an account?{" "}
              </Text>
              <Link href="/login">
                <Text className="text-primary text-sm font-bold">Sign in</Text>
              </Link>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </AppBackground>
  );
}
