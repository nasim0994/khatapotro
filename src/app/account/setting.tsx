import AppBackground from "@/components/AppBackground";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Setting() {
  return (
    <ProtectedRoute>
      <AppBackground>
        <SafeAreaView>
          <Text>Setting Page</Text>
        </SafeAreaView>
      </AppBackground>
    </ProtectedRoute>
  );
}
