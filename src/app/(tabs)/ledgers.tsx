import AppBackground from "@/components/AppBackground";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Ledgers() {
  return (
    <AppBackground>
      <SafeAreaView>
        <Text className="text-white">Ledgers</Text>
      </SafeAreaView>
    </AppBackground>
  );
}
