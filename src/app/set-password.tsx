import AppBackground from "@/components/AppBackground";
import { commonStyles } from "@/constants/style";
import { useSetNewPasswordMutation } from "@/redux/features/auth/authApi";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function SetPassword() {
  const { email } = useLocalSearchParams();
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<"otp" | "password" | null>(
    null,
  );

  const [setNewPassword, { isLoading }] = useSetNewPasswordMutation();
  const handleSubmit = async () => {
    if (!otp || !password) {
      Toast.show({
        type: "error",
        text2: "Please fill in all fields",
        position: "top",
      });
      return;
    }

    if (otp.length < 6) {
      Toast.show({
        type: "error",
        text2: "OTP must be 6 digits",
        position: "top",
      });
      return;
    }

    if (password.length < 6) {
      Toast.show({
        type: "error",
        text2: "Password must be at least 6 characters",
        position: "top",
      });
      return;
    }

    Keyboard.dismiss();

    const data = {
      email,
      otp,
      password,
    };

    try {
      const res = await setNewPassword(data).unwrap();
      if (res?.success) {
        Toast.show({
          type: "success",
          text2: res?.message,
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
        });

        router.push("/login");
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
      <SafeAreaView style={styles.container}>
        <View style={{ marginTop: 20 }} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to your email and choose a strong new
            password.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={[commonStyles.fontMedium, styles.inputLabel]}>
              Verification Code
            </Text>
            <View style={[styles.inputWrapper]}>
              <Feather
                name="shield"
                size={20}
                color={"rgba(255, 255, 255, 0.4)"}
                style={styles.inputIcon}
              />
              <TextInput
                style={[
                  commonStyles.fontRegular,
                  styles.input,
                  { letterSpacing: otp ? 4 : 0 },
                ]}
                keyboardType="number-pad"
                maxLength={6}
                value={otp}
                onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, ""))}
                placeholder="Enter 6-digit code"
                placeholderTextColor="rgba(255, 255, 255, 0.25)"
                onFocus={() => setFocusedField("otp")}
                onBlur={() => setFocusedField(null)}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[commonStyles.fontMedium, styles.inputLabel]}>
              New Password
            </Text>
            <View style={[styles.inputWrapper]}>
              <Feather
                name="lock"
                size={20}
                color={"rgba(255, 255, 255, 0.4)"}
                style={styles.inputIcon}
              />
              <TextInput
                style={[commonStyles.fontRegular, styles.input]}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Minimum 6 characters"
                placeholderTextColor="rgba(255, 255, 255, 0.25)"
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  size={18}
                  color="rgba(255, 255, 255, 0.4)"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={[commonStyles.primaryButton, { marginTop: 20 }]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={commonStyles.primaryButtonText}>
            {isLoading ? "Updating..." : "Reset Password"}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  headerContainer: {
    marginTop: 30,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "rgba(255, 255, 255, 0.6)",
    lineHeight: 22,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    width: "100%",
  },
  inputLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 56,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#FFFFFF",
    fontSize: 15,
  },
  eyeButton: {
    padding: 4,
  },
});
