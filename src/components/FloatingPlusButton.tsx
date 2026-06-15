import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";

export default function FloatingPlusButton() {
  const router = useRouter();
  return (
    <>
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => router.push("/addTransaction")}
        activeOpacity={0.7}
      >
        <Feather name="plus" size={26} color="#FFFFFF" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  fabButton: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 85 : 75,
    right: 14,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2F80ED",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#2F80ED",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
});
