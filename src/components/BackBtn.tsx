import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function BackBtn() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl justify-center items-center mt-2"
      activeOpacity={0.7}
    >
      <Feather name="chevron-left" size={20} color="#FFFFFF" />
    </TouchableOpacity>
  );
}
