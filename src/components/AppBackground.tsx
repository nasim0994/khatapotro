import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View } from "react-native";

interface AppBackgroundProps {
  children?: React.ReactNode;
}

export default function AppBackground({ children }: AppBackgroundProps) {
  return (
    <View className="bg-secondary flex-1">
      <LinearGradient
        colors={["#253E73", "#0E2E6B", "#081328", "#05070D"]}
        locations={[0, 0.22, 0.58, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      {/* Top Right Dark Blue */}
      <View
        style={{
          position: "absolute",
          width: 280,
          height: 280,
          borderRadius: 999,
          backgroundColor: "#15338C",
          top: -80,
          right: -100,
          opacity: 0.28,
        }}
      />

      {/* Bottom Black Overlay */}
      <LinearGradient
        colors={["rgba(5,7,13,0)", "rgba(5,7,13,0.35)", "rgba(5,7,13,0)"]}
        locations={[0, 0.55, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      {children}
    </View>
  );
}
