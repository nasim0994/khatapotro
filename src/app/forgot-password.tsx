import AppBackground from "@/components/AppBackground";
import { commonStyles } from "@/constants/style";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const handleSubmit = async () => {
    if (!email) {
      Toast.show({
        type: "error",
        text2: "Please enter your email address",
        position: "top",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text2: "Please enter a valid email address",
        position: "top",
      });
      return;
    }

    Keyboard.dismiss();
    const data = { email };

    try {
      const res = await forgotPassword(data).unwrap();
      if (res?.success) {
        Toast.show({
          type: "success",
          text2: res?.message,
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
        });

        router.push({
          pathname: "/set-password",
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
      <SafeAreaView style={styles.container}>
        <View style={{ marginTop: 20 }} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter your email address below. We will send you a 6-digit code to
            reset your password. 218378
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={[commonStyles.fontMedium, styles.inputLabel]}>
            Email Address
          </Text>
          <View style={[styles.inputWrapper]}>
            <Feather
              name="mail"
              size={20}
              color={"rgba(255, 255, 255, 0.4)"}
              style={styles.inputIcon}
            />
            <TextInput
              style={[commonStyles.fontRegular, styles.input]}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="example@gmail.com"
              placeholderTextColor="rgba(255, 255, 255, 0.25)"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={[commonStyles.primaryButton]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={commonStyles.primaryButtonText}>
            {isLoading ? "Sending..." : "Send Reset Code"}
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
    marginBottom: 35,
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
  inputContainer: {
    marginBottom: 15,
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
});
