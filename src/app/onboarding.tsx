import AppBackground from "@/components/AppBackground";
import { commonStyles } from "@/constants/style";
import { Link, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <AppBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 24,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 16,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 28,
                letterSpacing: -0.5,
                ...commonStyles.fontRegular,
              }}
            >
              Khata
              <Text style={{ color: "#2F80ED", ...commonStyles.fontRegular }}>
                Potro.
              </Text>
            </Text>

            <Link href="/signup">
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "600",
                  ...commonStyles.fontRegular,
                }}
              >
                Sign up
              </Text>
            </Link>
          </View>

          <View>
            <Image
              source={require("../../assets/images/onboard_icon.png")}
              resizeMode="cover"
            />
          </View>

          {/* TYPOGRAPHY & COPY SECTION */}
          <View style={{ gap: 16, marginBottom: 16 }}>
            <Text
              style={{
                color: "white",
                fontSize: 40,
                lineHeight: 46,
                letterSpacing: -0.5,
                ...commonStyles.fontRegular,
              }}
            >
              Your Digital{"\n"}
              <Text style={{ color: "#2F80ED", ...commonStyles.fontRegular }}>
                Financial
              </Text>
              {"\n"}
              Navigator
            </Text>

            <Text
              style={{
                color: "#828282",
                fontSize: 16,
                lineHeight: 24,
                marginTop: 12,
                ...commonStyles.fontRegular,
              }}
            >
              Effortlessly track expenses, manage customized SaaS multi-ledgers,
              and control budgets under a secure, lightning-fast dashboard.
            </Text>
          </View>

          {/* GET STARTED BUTTON */}
          <View style={{ marginBottom: 32 }}>
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
