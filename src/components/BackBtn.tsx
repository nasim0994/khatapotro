import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function BackBtn() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={{
        width: 40,
        height: 40,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
      }}
      activeOpacity={0.7}
    >
      <Feather name="chevron-left" size={20} color="#FFFFFF" />
    </TouchableOpacity>
  );
}
