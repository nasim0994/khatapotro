import { Feather, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
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

      <SafeAreaView className="flex-1 pt-6">
        <View className="flex-1 px-6 justify-between">
          <View className="flex-row items-center justify-between mt-4">
            <Text className="text-white text-2xl font-bold tracking-tight">
              Khata<Text className="text-primary">Potro.</Text>
            </Text>
          </View>

          <View className="relative h-[320px] w-full justify-center items-center my-4">
            <View
              className="absolute w-[80%] h-[180px] bg-[#219653]/10 border border-[#219653]/20 rounded-3xl p-5 justify-between top-4 left-4"
              style={{
                shadowColor: "#219653",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.1,
                shadowRadius: 20,
              }}
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  <Text className="text-white text-xs font-semibold">
                    USD Wallet
                  </Text>
                </View>
                <TouchableOpacity className="w-8 h-8 bg-white/10 rounded-full justify-center items-center border border-white/10">
                  <Feather name="eye" size={14} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <View>
                <Text className="text-[#828282] text-xs">Total Balance</Text>
                <Text className="text-white text-2xl font-bold mt-1">
                  $45,500.80
                </Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-[#828282] text-xs font-mono">
                  •••• 9934
                </Text>
                <Text className="text-[#828282] text-xs">05/30</Text>
              </View>
            </View>

            {/* FOREGROUND APPLE-STYLE GLOSSY CARD (Main Ledger) */}
            <View
              className="absolute w-[80%] h-[180px] rounded-3xl bottom-4 right-4 z-10 overflow-hidden"
              style={{
                backgroundColor: "rgba(255,255,255,0.12)",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.22)",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 18 },
                shadowOpacity: 0.45,
                shadowRadius: 28,
                elevation: 16,
              }}
            >
              {/* Base dark glass */}
              <LinearGradient
                colors={[
                  "rgba(255,255,255,0.28)",
                  "rgba(255,255,255,0.10)",
                  "rgba(255,255,255,0.04)",
                  "rgba(47,128,237,0.14)",
                ]}
                locations={[0, 0.35, 0.7, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  position: "absolute",
                  inset: 0,
                }}
              />

              {/* Blue glow */}
              <View
                style={{
                  position: "absolute",
                  width: 180,
                  height: 180,
                  borderRadius: 90,
                  backgroundColor: "rgba(47,128,237,0.28)",
                  right: -70,
                  bottom: -70,
                  opacity: 0.9,
                }}
              />

              {/* White glossy shine */}
              <LinearGradient
                colors={[
                  "rgba(255,255,255,0.55)",
                  "rgba(255,255,255,0.14)",
                  "rgba(255,255,255,0)",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  position: "absolute",
                  width: 210,
                  height: 95,
                  top: -25,
                  left: -35,
                  borderRadius: 999,
                  transform: [{ rotate: "-12deg" }],
                }}
              />

              {/* Thin highlight line */}
              <View
                style={{
                  position: "absolute",
                  top: 1,
                  left: 18,
                  right: 18,
                  height: 1,
                  backgroundColor: "rgba(255,255,255,0.45)",
                }}
              />

              <View className="relative flex-1 p-5 justify-between">
                <View className="flex-row items-center bg-gray-500/30 self-start px-2.5 py-1 rounded-full border border-white/50">
                  <MaterialIcons
                    name="account-balance"
                    size={12}
                    color="#fff"
                  />
                  <Text className="text-white text-xs font-semibold ml-1">
                    Main Ledger
                  </Text>
                </View>

                <View>
                  <Text className="text-white/70 text-xs">
                    This Month Expense
                  </Text>
                  <Text className="text-white text-2xl font-bold mt-1 tracking-wide">
                    $12,240.50
                  </Text>
                </View>

                <View className="flex-row justify-between items-center">
                  <Text className="text-white/60 text-xs font-mono">
                    •••• 4821
                  </Text>

                  <View className="bg-primary px-3 py-1 rounded-full">
                    <Text className="text-white text-xs font-medium">
                      Active
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* FLOATING ACTION TAG */}
            <View className="absolute bottom-0 left-10 z-20 bg-white px-4 py-2.5 rounded-2xl flex-row items-center shadow-lg transform rotate-[-4deg]">
              <Feather
                name="arrow-up-right"
                size={14}
                color="#0B0E14"
                strokeWidth={3}
              />
              <Text className="text-[#0B0E14] font-bold text-sm ml-1">
                Track Expense
              </Text>
            </View>
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
            >
              <Text className="text-white text-lg font-bold">Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
