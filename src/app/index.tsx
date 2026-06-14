import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-secondary">
      <LinearGradient
        colors={["#253E73", "#0B0E14", "#0B0E14", "#07090D"]}
        locations={[0, 0.32, 0.68, 1]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <SafeAreaView className="flex-1">
        <View className="flex-1 px-6 justify-between">
          <View className="flex-row items-center justify-between mt-4">
            <Text className="text-white text-2xl font-bold tracking-tight">
              Khata<Text className="text-primary">Potro.</Text>
            </Text>

            <Link href="/signup">
              <Text className="text-white text-base font-semibold">
                Sign up
              </Text>
            </Link>
          </View>

          <View>
            <Image
              source={require("@/assets/images/onboard_icon.webp")}
              className="w-full"
              resizeMode="cover"
            />
          </View>

          {/* TYPOGRAPHY & COPY SECTION */}
          <View className="space-y-4 mb-4">
            <Text className="text-white text-[40px] font-bold leading-[46px] tracking-tight">
              Your Digital{"\n"}
              <Text className="text-primary">Financial</Text>
              {"\n"}
              Navigator
            </Text>

            <Text className="text-[#828282] text-base leading-6 mt-3">
              Effortlessly track expenses, manage customized SaaS multi-ledgers,
              and control budgets under a secure, lightning-fast dashboard.
            </Text>
          </View>

          {/* GET STARTED BUTTON */}
          <View className="mb-8">
            <TouchableOpacity
              activeOpacity={0.85}
              className="w-full bg-primary py-4 rounded-2xl justify-center items-center shadow-md"
              style={{
                shadowColor: "#2F80ED",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
              }}
              onPress={() => {
                router.push("/login");
              }}
            >
              <Text className="text-white text-lg font-bold">Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
