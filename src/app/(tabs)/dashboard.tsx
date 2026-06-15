import AppBackground from "@/components/AppBackground";
import DashboardCard from "@/components/modules/dashboard/Card";
import Transactions from "@/components/modules/dashboard/Transactions";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const hrs = new Date().getHours();
    if (hrs < 12) setGreeting("Good Morning 🌅");
    else if (hrs < 18) setGreeting("Good Afternoon ☀️");
    else setGreeting("Good Evening 🌙");
  }, []);

  return (
    <AppBackground>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 10 }}>
            <View>
              <Text className="text-white text-sm">{greeting}</Text>
            </View>

            <View style={{ marginTop: 4, marginBottom: 8 }}>
              <Text
                className="text-white font-semibold"
                style={{
                  fontSize: 36,
                  lineHeight: 30,
                  textTransform: "uppercase",
                }}
              >
                Finance{" "}
                <Text style={{ color: "#9CA3AF", opacity: 0.7 }}>made</Text>{" "}
                simple
              </Text>
            </View>

            {/* card */}
            <DashboardCard />

            {/* transactions */}
            <Transactions />
          </View>
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}
