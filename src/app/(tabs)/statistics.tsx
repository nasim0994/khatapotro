import AppBackground from "@/components/AppBackground";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Statistics() {
  return (
    <AppBackground>
      <SafeAreaView>
        <Text className="text-white">Statistics</Text>
      </SafeAreaView>
    </AppBackground>
  );
}
