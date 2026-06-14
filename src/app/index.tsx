import AppBackground from "@/components/AppBackground";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();
  const fullText = "KhataPotro.";
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 60);

      return () => clearTimeout(timeout);
    } else {
      const redirectTimeout = setTimeout(() => {
        router.replace("/onboarding");
      }, 500);

      return () => clearTimeout(redirectTimeout);
    }
  }, [currentIndex]);

  const renderAnimatedText = () => {
    if (displayedText.startsWith("Khata")) {
      const rest = displayedText.substring(5);
      return (
        <Text className="text-white text-2xl font-bold tracking-tight">
          Khata<Text className="text-primary">{rest}</Text>
        </Text>
      );
    }
    return (
      <Text className="text-white text-2xl font-bold tracking-tight">
        {displayedText}
      </Text>
    );
  };

  return (
    <AppBackground>
      {/* CENTER BRAND LOGO WITH TYPEWRITER EFFECT */}
      <View className="flex-1 items-center justify-center">
        <View className="h-12 justify-center">{renderAnimatedText()}</View>
      </View>

      {/* FOOTER */}
      <View className="items-center" style={{ marginBottom: 30 }}>
        <Text className="text-[#828282] text-xs tracking-widest font-semibold uppercase">
          by DevNasim
        </Text>
      </View>
    </AppBackground>
  );
}
