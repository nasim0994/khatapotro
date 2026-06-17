import AppBackground from "@/components/AppBackground";
import BackBtn from "@/components/BackBtn";
import { commonStyles } from "@/constants/style";
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
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <View>
          <BackBtn />

          <View style={{ marginTop: 30 }}>
            <Text
              style={[
                commonStyles.fontMedium,
                { color: "#FFFFFF", fontSize: 32, letterSpacing: -0.5 },
              ]}
            >
              Create Account
            </Text>
            <Text
              style={[
                commonStyles.fontRegular,
                { color: "#D1D5DB", fontSize: 14 },
              ]}
            >
              Sign up to get started with your financial journey
            </Text>
          </View>

          <View style={{ marginTop: 30, gap: 14 }}>
            <View style={[commonStyles.inputFieldBox]}>
              <Feather name="user" size={18} color="#ccc" />
              <TextInput
                style={[commonStyles.fieldInputText]}
                placeholder="Enter your name"
                placeholderTextColor="#ccc"
                keyboardType="default"
                autoCapitalize="none"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={[commonStyles.inputFieldBox]}>
              <Feather name="at-sign" size={18} color="#828282" />
              <TextInput
                style={[commonStyles.fieldInputText]}
                placeholder="Enter your email"
                placeholderTextColor="#ccc"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={[commonStyles.inputFieldBox]}>
              <Feather name="lock" size={18} color="#828282" />
              <TextInput
                style={[commonStyles.fieldInputText]}
                placeholder="Enter your password"
                placeholderTextColor="#ccc"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  size={18}
                  color="#ccc"
                />
              </TouchableOpacity>
            </View>

            <View style={[commonStyles.inputFieldBox]}>
              <Feather name="lock" size={18} color="#ccc" />
              <TextInput
                style={[commonStyles.fieldInputText]}
                placeholder="Enter confirm password"
                placeholderTextColor="#ccc"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={rePassword}
                onChangeText={setRePassword}
              />
            </View>

            <View>
              <TouchableOpacity
                onPress={handleSubmit}
                activeOpacity={0.85}
                style={[commonStyles.primaryButton]}
                disabled={isLoading}
              >
                <Text style={[commonStyles.primaryButtonText]}>
                  {isLoading ? "Creating your account..." : "Register"}
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
                style={[
                  commonStyles.fontRegular,
                  { color: "#D1D5DB", fontSize: 14 },
                ]}
              >
                Already have an account?{" "}
              </Text>
              <Link href="/login">
                <Text
                  style={[
                    commonStyles.fontRegular,
                    { color: "#2F80ED", fontSize: 14 },
                  ]}
                >
                  Sign in
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </AppBackground>
  );
}
