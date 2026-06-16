import AppBackground from "@/components/AppBackground";
import { commonStyles } from "@/constants/style";
import {
  useRegisterVerificationUserMutation,
  useResentOtpMutation,
} from "@/redux/features/auth/authApi";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CONTAINER_PADDING = 48;
const TOTAL_GAPS = 40;
const OTP_INPUT_WIDTH = (SCREEN_WIDTH - CONTAINER_PADDING - TOTAL_GAPS) / 6;

export default function RegistrationVerification() {
  const { email } = useLocalSearchParams();
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(59);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const cleanValue = value.replace(/[^0-9]/g, "");

    if (cleanValue.length > 1) {
      const pastedOtp = cleanValue.slice(0, 6).split("");
      const newOtp = [...otp];

      for (let i = 0; i < 6; i++) {
        if (index + i < 6 && pastedOtp[i]) {
          newOtp[index + i] = pastedOtp[i];
        }
      }

      setOtp(newOtp);

      const nextFocusIndex = Math.min(index + cleanValue.length - 1, 5);
      inputRefs.current[nextFocusIndex]?.focus();
      if (newOtp.join("").length === 6) {
        Keyboard.dismiss();
      }
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = cleanValue;
    setOtp(newOtp);

    if (cleanValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const [registerVerificationUser, { isLoading }] =
    useRegisterVerificationUserMutation();

  const handleSubmit = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) {
      alert("Please enter all 6 digits");
      return;
    }
    Keyboard.dismiss();

    const data = {
      email,
      otp: fullOtp,
    };

    try {
      const res = await registerVerificationUser(data).unwrap();
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

  const [resentOtp, { isLoading: reOtpLoading }] = useResentOtpMutation();
  const handleResend = async () => {
    const data = {
      email,
    };

    try {
      const res = await resentOtp(data).unwrap();
      if (res?.success) {
        Toast.show({
          type: "success",
          text2: res?.message,
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
        });

        if (timer === 0) {
          setTimer(59);
          setOtp(["", "", "", "", "", ""]);
          inputRefs.current[0]?.focus();
        }
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
          <Text style={styles.title}>Verification Code</Text>

          <View style={styles.alertBox}>
            <Feather
              name="info"
              size={16}
              color="#34C759"
              style={{ marginTop: 2 }}
            />
            <Text style={styles.alertText}>
              We have sent a 6-digit verification code to{" "}
              <Text style={styles.emailHighlight}>{email || "your email"}</Text>
              . Please check your <Text style={styles.boldText}>Inbox</Text> or{" "}
              <Text style={styles.boldText}>Spam folder</Text>.
            </Text>
          </View>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={[styles.otpInput, digit ? styles.otpInputActive : null]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              placeholder="0"
              placeholderTextColor="rgba(255, 255, 255, 0.15)"
              textAlign="center"
            />
          ))}
        </View>

        <View style={styles.timerContainer}>
          {timer > 0 ? (
            <Text style={styles.timerText}>
              Resend code in{" "}
              <Text style={{ color: "#34C759", fontWeight: "600" }}>
                0:{timer < 10 ? `0${timer}` : timer}
              </Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend} disabled={reOtpLoading}>
              <Text style={styles.resendText}>
                {reOtpLoading ? "Code Sending..." : "Resend Code"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={commonStyles.primaryButton}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={commonStyles.primaryButtonText}>
            {isLoading ? "Loading..." : "Verify & Continue"}
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
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  alertBox: {
    flexDirection: "row",
    backgroundColor: "rgba(52, 199, 89, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(52, 199, 89, 0.2)",
    borderRadius: 16,
    padding: 14,
    gap: 10,
  },
  alertText: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: 20,
    flex: 1,
  },
  emailHighlight: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  boldText: {
    color: "#34C759",
    fontWeight: "700",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
    width: "100%",
  },
  otpInput: {
    width: OTP_INPUT_WIDTH,
    height: OTP_INPUT_WIDTH * 1.18,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    padding: 0,

    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    includeFontPadding: false,
  },
  otpInputActive: {
    borderColor: "#34C759",
    backgroundColor: "rgba(52, 199, 89, 0.02)",
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  timerText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.4)",
    fontWeight: "500",
  },
  resendText: {
    fontSize: 14,
    color: "#34C759",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
