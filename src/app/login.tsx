import AppBackground from "@/components/AppBackground";
import BackBtn from "@/components/BackBtn";
import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

    router.push("/(tabs)/dashboard");
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
              className="w-full bg-primary py-4 rounded-2xl justify-center items-center shadow-lg"
              style={{
                shadowColor: "#2F80ED",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
              }}
              onPress={handleSubmit}
            >
              <Text className="text-white text-lg font-bold">Log In</Text>
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
