import AppBackground from "@/components/AppBackground";
import { commonStyles } from "@/constants/style";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();
  const { loggedUser } = useAppSelector((state: any) => state.auth);
  const fullText = "KhataPotro.";
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 80);

      return () => clearTimeout(timeout);
    } else {
      const redirectTimeout = setTimeout(() => {
        if (loggedUser?.email) {
          router.replace("/dashboard");
        } else {
          router.replace("/onboarding");
        }
      }, 500);

      return () => clearTimeout(redirectTimeout);
    }
  }, [currentIndex]);

  const renderAnimatedText = () => {
    if (displayedText.startsWith("Khata")) {
      const rest = displayedText.substring(5);
      return (
        <Text
          style={{
            color: "white",
            fontSize: 28,
            letterSpacing: -0.5,
            ...commonStyles.fontRegular,
          }}
        >
          Khata
          <Text style={[commonStyles.fontRegular, { color: "#2F80ED" }]}>
            {rest}
          </Text>
        </Text>
      );
    }
    return (
      <Text
        style={{
          color: "white",
          fontSize: 28,
          letterSpacing: -0.5,
        }}
      >
        {displayedText}
      </Text>
    );
  };

  return (
    <AppBackground>
      {/* CENTER BRAND LOGO WITH TYPEWRITER EFFECT */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ height: 48, justifyContent: "center" }}>
          {renderAnimatedText()}
        </View>
      </View>

      {/* FOOTER */}
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <Text
          style={{
            color: "#828282",
            fontSize: 12,
            letterSpacing: 1,
            fontWeight: "600",
            textTransform: "uppercase",
            ...commonStyles.fontMedium,
          }}
        >
          by DevNasim
        </Text>
      </View>
    </AppBackground>
  );
}
