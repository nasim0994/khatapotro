import FloatingPlusButton from "@/components/FloatingPlusButton";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#2F80ED",
          tabBarInactiveTintColor: "#828282",
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
            marginTop: -2,
          },

          tabBarStyle: {
            position: "absolute",
            left: 20,
            right: 20,
            height: 64,
            backgroundColor: "rgba(22, 27, 38, 0.95)",
            borderRadius: 32,
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.08)",
            paddingTop: 4,
            elevation: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4,
            shadowRadius: 16,
            overflow: "hidden",
          },
        }}
      >
        {/* 1. DASHBOARD */}
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={20}
                color={color}
                strokeWidth={focused ? 2.5 : 2}
              />
            ),
          }}
        />

        {/* 2. History */}
        <Tabs.Screen
          name="transactions"
          options={{
            title: "Transactions",
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "swap-horizontal-bold" : "swap-horizontal"}
                size={20}
                color={color}
                strokeWidth={focused ? 2.5 : 2}
              />
            ),
          }}
        />

        {/* 3. STATISTICS */}
        <Tabs.Screen
          name="statistics"
          options={{
            title: "Stats",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "pie-chart" : "pie-chart-outline"}
                size={20}
                color={color}
              />
            ),
          }}
        />

        {/* 4. ACCOUNT */}
        <Tabs.Screen
          name="account"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <Feather
                name="user"
                size={21}
                color={color}
                strokeWidth={focused ? 2.5 : 2}
              />
            ),
          }}
        />
      </Tabs>

      <FloatingPlusButton />
    </View>
  );
}
