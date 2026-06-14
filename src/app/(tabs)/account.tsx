import AppBackground from "@/components/AppBackground";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
  return (
    <AppBackground>
      <SafeAreaView>
        <Text className="text-white">Account</Text>
      </SafeAreaView>
    </AppBackground>
  );
}
