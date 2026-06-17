import AppBackground from "@/components/AppBackground";
import { commonStyles } from "@/constants/style";
import { Link, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <AppBackground>
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-6 justify-between">
          <View className="flex-row items-center justify-between mt-4">
            <Text
              className="text-white text-2xl tracking-tight"
              style={commonStyles.fontRegular}
            >
              Khata
              <Text className="text-primary" style={commonStyles.fontRegular}>
                Potro.
              </Text>
            </Text>

            <Link href="/signup">
              <Text
                className="text-white text-base font-semibold"
                style={commonStyles.fontRegular}
              >
                Sign up
              </Text>
            </Link>
          </View>

          <View>
            <Image
              source={require("@/assets/images/onboard_icon.webp")}
              className="w-full"
              resizeMode="cover"
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </View>

          {/* TYPOGRAPHY & COPY SECTION */}
          <View className="space-y-4 mb-4">
            <Text
              className="text-white text-[40px] leading-[46px] tracking-tight"
              style={commonStyles.fontRegular}
            >
              Your Digital{"\n"}
              <Text className="text-primary" style={commonStyles.fontRegular}>
                Financial
              </Text>
              {"\n"}
              Navigator
            </Text>

            <Text
              className="text-[#828282] text-base leading-6 mt-3"
              style={commonStyles.fontRegular}
            >
              Effortlessly track expenses, manage customized SaaS multi-ledgers,
              and control budgets under a secure, lightning-fast dashboard.
            </Text>
          </View>

          {/* GET STARTED BUTTON */}
          <View className="mb-8">
            <TouchableOpacity
              activeOpacity={0.85}
              style={commonStyles.primaryButton}
              onPress={() => {
                router.push("/login");
              }}
            >
              <Text style={commonStyles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </AppBackground>
  );
}
