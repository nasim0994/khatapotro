import AppBackground from "@/components/AppBackground";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TOP_SPENDING = [
  {
    _id: "1",
    name: "Food & Dining",
    amount: "$340.00",
    percentage: 0.65,
    icon: "food-fork-drink",
    iconFamily: "MaterialCommunityIcons",
    color: "#FF9F0A",
  },
  {
    _id: "2",
    name: "Shopping",
    amount: "$185.50",
    percentage: 0.4,
    icon: "shopping-bag",
    iconFamily: "Feather",
    color: "#BF5AF2",
  },
  {
    _id: "3",
    name: "Transport & Fuel",
    amount: "$92.00",
    percentage: 0.2,
    icon: "car",
    iconFamily: "MaterialCommunityIcons",
    color: "#64D2FF",
  },
  {
    _id: "4",
    name: "Electricity Bill",
    amount: "$60.00",
    percentage: 0.12,
    icon: "flash",
    iconFamily: "MaterialCommunityIcons",
    color: "#FFD60A",
  },
];

const CategoryIcon = ({
  name,
  family,
  size = 18,
  color = "#D1D5DB",
}: {
  name: string;
  family: string;
  size?: number;
  color?: string;
}) => {
  if (family === "Feather") {
    return <Feather name={name as any} size={size} color={color} />;
  }
  return (
    <MaterialCommunityIcons name={name as any} size={size} color={color} />
  );
};

export default function Statistics() {
  const [activeTab, setActiveTab] = useState<"income" | "expense">("expense");
  const [selectedMonth, setSelectedMonth] = useState("June 2026");

  return (
    <AppBackground>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* ১. হেডার এরিয়া */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Statistics</Text>

          <TouchableOpacity style={styles.monthSelector} activeOpacity={0.7}>
            <Text style={styles.monthSelectorText}>{selectedMonth}</Text>
            <Feather
              name="chevron-down"
              size={14}
              color="#34C759"
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>
        </View>

        {/* ২. Income | Expense Tab */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "income" && styles.activeIncomeTab,
            ]}
            onPress={() => setActiveTab("income")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "income" && styles.activeIncomeText,
              ]}
            >
              Income
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "expense" && styles.activeExpenseTab,
            ]}
            onPress={() => setActiveTab("expense")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "expense" && styles.activeTabText,
              ]}
            >
              Expense
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {/* ৩. চার্ট এরিয়া প্লেসহোল্ডার */}
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>
                Total {activeTab === "expense" ? "Spent" : "Earned"}
              </Text>
              <Text style={styles.chartTotalAmount}>
                {activeTab === "expense" ? "$677.50" : "$2,450.00"}
              </Text>
            </View>

            {/* 📈 চার্ট কম্পোনেন্ট প্লেসহোল্ডার */}
            <View style={styles.chartVisualPlaceholder}>
              <Feather
                name="trending-up"
                size={32}
                color="rgba(255,255,255,0.15)"
              />
              <Text style={styles.chartPlaceholderText}>
                [ Your Chart Component Here ]
              </Text>
            </View>
          </View>

          {/* ৪. টপ স্পেন্ডিং/আর্নিং ক্যাটাগরি লিস্ট */}
          <Text style={styles.sectionLabel}>
            Top {activeTab === "expense" ? "Spending" : "Sources"}
          </Text>

          <View style={styles.categoryListCard}>
            {TOP_SPENDING.map((item) => (
              <View key={item._id} style={styles.categoryItemRow}>
                {/* আইকন বক্স */}
                <View
                  style={[
                    styles.iconWrapper,
                    { backgroundColor: `${item.color}15` },
                  ]}
                >
                  {/* ফিক্সড ডাইনামিক আইকন কল */}
                  <CategoryIcon
                    name={item.icon}
                    family={item.iconFamily}
                    size={18}
                    color={item.color}
                  />
                </View>

                {/* প্রোগ্রেস বার এবং নাম */}
                <View style={styles.itemMetaInfo}>
                  <View style={styles.itemTitleRow}>
                    <Text style={styles.categoryNameText}>{item.name}</Text>
                    <Text style={styles.categoryAmountText}>{item.amount}</Text>
                  </View>

                  {/* কাস্টম প্রোগ্রেস বার */}
                  <View style={styles.progressBarTrack}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {
                          width: `${item.percentage * 100}%`,
                          backgroundColor:
                            activeTab === "expense" ? item.color : "#34C759",
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  monthSelectorText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    padding: 4,
    borderRadius: 14,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 11,
    alignItems: "center",
    borderRadius: 10,
  },
  activeExpenseTab: {
    backgroundColor: "#EB5757",
  },
  activeIncomeTab: {
    backgroundColor: "#34C759",
  },
  tabText: {
    color: "#D1D5DB",
    fontSize: 14,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  activeIncomeText: {
    color: "#06110A",
    fontWeight: "700",
  },
  chartCard: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 24,
    padding: 16,
    marginBottom: 24,
  },
  chartHeader: {
    marginBottom: 16,
  },
  chartTitle: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 13,
    fontWeight: "600",
  },
  chartTotalAmount: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 4,
  },
  chartVisualPlaceholder: {
    height: 180,
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  chartPlaceholderText: {
    color: "rgba(255, 255, 255, 0.25)",
    fontSize: 13,
    fontWeight: "500",
    marginTop: 8,
  },
  sectionLabel: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  categoryListCard: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 20,
    padding: 12,
  },
  categoryItemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  itemMetaInfo: {
    flex: 1,
    justifyContent: "center",
  },
  itemTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  categoryNameText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  categoryAmountText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
});
