import AppBackground from "@/components/AppBackground";
import { useGetStatisticsReportQuery } from "@/redux/features/reportApi";
import { useAppSelector } from "@/redux/hooks";
import { TCategory } from "@/types/categoryTypes";
import { renderIcon } from "@/utils/renderIcon";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { SafeAreaView } from "react-native-safe-area-context";

type TStatisticCategory = {
  category: TCategory;
  percentage: number;
  amount: number;
};

export default function Statistics() {
  const { loggedUser } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState<"income" | "expense">("expense");

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const { data, isLoading, isFetching } = useGetStatisticsReportQuery(
    {
      id: loggedUser?._id,
      query: {
        type: activeTab,
        month: currentDate.format("MM-YYYY"),
      },
    },
    {
      skip: !loggedUser?._id,
    },
  );
  const statistic = data?.data;

  const handleMonthChange = (monthAndYear: string) => {
    const [year, month] = monthAndYear.split(" ");
    setCurrentDate(dayjs(`${year}-${month}-01`));
    setIsDatePickerVisible(false);
  };

  const showLoading = isLoading || isFetching;
  const hasData = statistic?.categories && statistic.categories.length > 0;

  return (
    <AppBackground>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Statistics</Text>

          <TouchableOpacity
            style={styles.monthSelector}
            activeOpacity={0.7}
            onPress={() => setIsDatePickerVisible(true)}
          >
            <Text style={styles.monthSelectorText}>
              {currentDate.format("MMMM YYYY")}
            </Text>
            <Feather
              name="chevron-down"
              size={14}
              color="#34C759"
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>
        </View>

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
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>
                Total {activeTab === "expense" ? "Spent" : "Earned"}
              </Text>
              <Text style={styles.chartTotalAmount}>
                {showLoading ? "---" : statistic?.total || 0}
              </Text>
            </View>
          </View>

          <Text style={styles.sectionLabel}>
            Top {activeTab === "expense" ? "Spending" : "Sources"}
          </Text>

          {showLoading ? (
            <View style={styles.centerStateWrapper}>
              <ActivityIndicator size="small" color="#34C759" />
              <Text style={styles.stateText}>Loading data...</Text>
            </View>
          ) : !hasData ? (
            <View style={styles.centerStateWrapper}>
              <Feather
                name="pie-chart"
                size={32}
                color="rgba(255,255,255,0.2)"
              />
              <Text style={styles.stateText}>
                No data available for this month
              </Text>
            </View>
          ) : (
            <View style={styles.categoryListCard}>
              {statistic?.categories?.map((item: TStatisticCategory) => (
                <View key={item?.category?._id} style={styles.categoryItemRow}>
                  <View
                    style={[
                      styles.iconWrapper,
                      {
                        backgroundColor: `${item?.category?.icon?.color}20`,
                        borderRadius: 50,
                      },
                    ]}
                  >
                    {renderIcon({
                      family: item?.category?.icon?.family,
                      name: item?.category?.icon?.name,
                      color: item?.category?.icon?.color,
                      size: 20,
                    })}
                  </View>

                  <View style={styles.itemMetaInfo}>
                    <View style={styles.itemTitleRow}>
                      <Text style={styles.categoryNameText}>
                        {item?.category?.name}
                      </Text>
                      <Text style={styles.categoryAmountText}>
                        {item?.amount}
                      </Text>
                    </View>

                    <View style={styles.progressBarTrack}>
                      <View
                        style={[
                          styles.progressBarFill,
                          {
                            width: `${item?.percentage * 100}%`,
                            backgroundColor:
                              activeTab === "expense"
                                ? item?.category?.icon?.color
                                : "#34C759",
                          },
                        ]}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>

      <Modal
        visible={isDatePickerVisible}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setIsDatePickerVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsDatePickerVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.notchBar} />
                <Text style={styles.modalTitle}>Select Month</Text>
                <DatePicker
                  mode="monthYear"
                  selectorStartingYear={2020}
                  current={currentDate.format("YYYY/MM")}
                  onMonthYearChange={handleMonthChange}
                  locale="en"
                  isGregorian={true}
                  options={{
                    backgroundColor: "#121F38",
                    textHeaderColor: "#FFFFFF",
                    textDefaultColor: "#D1D5DB",
                    selectedTextColor: "#fff",
                    mainColor: "#2F80ED",
                    textSecondaryColor: "rgba(255,255,255,0.4)",
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    marginBottom: 4,
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
  centerStateWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 20,
    paddingVertical: 40,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  stateText: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 14,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#121F38",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 34,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  notchBar: {
    width: 40,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
});
