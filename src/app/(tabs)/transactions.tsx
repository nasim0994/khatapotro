import AppBackground from "@/components/AppBackground";
import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { SafeAreaView } from "react-native-safe-area-context";

const DATABASE_CATEGORIES = [
  {
    _id: "cat_1",
    name: "Food & Dining",
    iconName: "food-fork-drink",
    iconFamily: "MaterialCommunityIcons",
  },
  {
    _id: "cat_2",
    name: "Shopping",
    iconName: "shopping-bag",
    iconFamily: "Feather",
  },
  {
    _id: "cat_3",
    name: "Transport & Fuel",
    iconName: "car",
    iconFamily: "MaterialCommunityIcons",
  },
  {
    _id: "cat_4",
    name: "Electricity Bill",
    iconName: "zap",
    iconFamily: "Feather",
  },
  {
    _id: "cat_5",
    name: "Salary Income",
    iconName: "wallet",
    iconFamily: "Entypo",
  },
  {
    _id: "cat_6",
    name: "Freelance",
    iconName: "code",
    iconFamily: "Feather",
  },
  {
    _id: "cat_7",
    name: "Medical & Pills",
    iconName: "pill",
    iconFamily: "MaterialCommunityIcons",
  },
];

export default function Transactions() {
  const [activeTab, setActiveTab] = useState<"all" | "income" | "expense">(
    "all",
  );

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const currentYearMonth = `${year} ${month}`;

  const [selectedMonth, setSelectedMonth] = useState(currentYearMonth);
  const [selectedCategory, setSelectedCategory] = useState<{
    _id: string;
    name: string;
  } | null>(null);

  const [monthModalVisible, setMonthModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = DATABASE_CATEGORIES.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getFormattedMonthText = (dateString: string) => {
    if (!dateString) return "";
    const [year, month] = dateString.split(" ");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
  };

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
    if (family === "Entypo") {
      return <Entypo name={name as any} size={size} color={color} />;
    }
    return (
      <MaterialCommunityIcons name={name as any} size={size} color={color} />
    );
  };

  return (
    <AppBackground>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Transactions</Text>
        </View>

        {/* Income | Expense | All Tab */}
        <View style={styles.tabContainer}>
          {["all", "income", "expense"].map((tab) => {
            const isActive = activeTab === tab;
            let tabStyle: any = styles.tabButton;
            let textStyle: any = styles.tabText;

            if (isActive) {
              if (tab === "all")
                tabStyle = [styles.tabButton, styles.activeAllTab];
              if (tab === "income") {
                tabStyle = [styles.tabButton, styles.activeIncomeTab];
                textStyle = styles.activeIncomeText;
              }
              if (tab === "expense")
                tabStyle = [styles.tabButton, styles.activeExpenseTab];
            }

            return (
              <TouchableOpacity
                key={tab}
                style={tabStyle}
                onPress={() => setActiveTab(tab as any)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    textStyle,
                    isActive && tab !== "income" && styles.activeTabText,
                  ]}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Month & Category Filter Row */}
        <View style={styles.filterRow}>
          {/* Month Filter Button */}
          <TouchableOpacity
            style={styles.filterBox}
            activeOpacity={0.7}
            onPress={() => setMonthModalVisible(true)}
          >
            <View style={styles.filterContent}>
              <Feather
                name="calendar"
                size={14}
                color="rgba(255,255,255,0.5)"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.filterText} numberOfLines={1}>
                {getFormattedMonthText(selectedMonth)}
              </Text>
            </View>
            <Feather
              name="chevron-down"
              size={14}
              color="rgba(255,255,255,0.4)"
            />
          </TouchableOpacity>

          {/* Category Filter Button */}
          <TouchableOpacity
            style={styles.filterBox}
            activeOpacity={0.7}
            onPress={() => setCategoryModalVisible(true)}
          >
            <View style={styles.filterContent}>
              <Feather
                name="grid"
                size={14}
                color="rgba(255,255,255,0.5)"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.filterText} numberOfLines={1}>
                {selectedCategory ? selectedCategory.name : "All Categories"}
              </Text>
            </View>
            <Feather
              name="chevron-down"
              size={14}
              color="rgba(255,255,255,0.4)"
            />
          </TouchableOpacity>
        </View>

        {/* ট্রানজেকশন লিস্ট এরিয়া */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <Text style={styles.sectionLabel}>History Log</Text>
          <View style={styles.placeholderContainer}>
            <Text
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: 13,
                textAlign: "center",
              }}
            >
              Transaction List Component টি এখানে বসবে।
            </Text>
          </View>
        </ScrollView>

        {/* ==================== DYNAMIC MONTH PICKER MODAL ==================== */}
        <Modal
          animationType="slide"
          transparent
          visible={monthModalVisible}
          onRequestClose={() => setMonthModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setMonthModalVisible(false)}
          />
          <View style={styles.modalBottomContainer}>
            <View style={styles.bottomSheetMenu}>
              <View style={styles.sheetHandle} />
              <Text style={styles.modalTitle}>Select Month & Year</Text>

              <DatePicker
                mode="monthYear"
                selectorStartingYear={2020}
                current={selectedMonth.replace(" ", "/")}
                selected={selectedMonth.replace(" ", "/")}
                onMonthYearChange={(selectedDate) => {
                  setSelectedMonth(selectedDate.replace("/", " "));
                  setMonthModalVisible(false);
                }}
                onSelectedChange={(selectedDate) => {
                  if (selectedDate) {
                    setSelectedMonth(selectedDate.replace("/", " "));
                    setMonthModalVisible(false);
                  }
                }}
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
          </View>
        </Modal>

        {/* ==================== CATEGORY SEARCH MODAL ==================== */}
        <Modal
          animationType="slide"
          transparent
          visible={categoryModalVisible}
          onRequestClose={() => setCategoryModalVisible(false)}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
              setCategoryModalVisible(false);
            }}
          >
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalBottomContainer}
          >
            <View style={styles.bottomSheetMenu}>
              <View style={styles.sheetHandle} />
              <Text style={styles.modalTitle}>Select Category</Text>

              <View style={styles.searchBarBox}>
                <Feather
                  name="search"
                  size={16}
                  color="rgba(255,255,255,0.4)"
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  style={styles.searchInputText}
                  placeholder="Search open categories..."
                  placeholderTextColor="rgba(255,255,255,0.25)"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoCorrect={false}
                  returnKeyType="search"
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery("")}>
                    <Feather name="x" size={16} color="rgba(255,255,255,0.4)" />
                  </TouchableOpacity>
                )}
              </View>

              <ScrollView
                style={{ maxHeight: 280 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <TouchableOpacity
                  style={[
                    styles.listItem,
                    !selectedCategory && styles.itemActive,
                  ]}
                  onPress={() => {
                    setSelectedCategory(null);
                    setCategoryModalVisible(false);
                    setSearchQuery("");
                    Keyboard.dismiss();
                  }}
                >
                  <View style={styles.infoLeft}>
                    <View style={styles.listIconWrapper}>
                      <Feather name="grid" size={16} color="#FFFFFF" />
                    </View>
                    <Text
                      style={[
                        styles.listText,
                        !selectedCategory && styles.listTextActive,
                      ]}
                    >
                      All Categories
                    </Text>
                  </View>
                  {!selectedCategory && (
                    <Feather name="check" size={16} color="#34C759" />
                  )}
                </TouchableOpacity>

                {filteredCategories.map((category) => {
                  const isSelected = selectedCategory?._id === category._id;
                  return (
                    <TouchableOpacity
                      key={category._id}
                      style={[styles.listItem, isSelected && styles.itemActive]}
                      onPress={() => {
                        setSelectedCategory({
                          _id: category._id,
                          name: category.name,
                        });
                        setCategoryModalVisible(false);
                        setSearchQuery("");
                        Keyboard.dismiss();
                      }}
                    >
                      <View style={styles.infoLeft}>
                        <View style={styles.listIconWrapper}>
                          <CategoryIcon
                            name={category.iconName}
                            family={category.iconFamily}
                            size={18}
                            color={isSelected ? "#34C759" : "#D1D5DB"}
                          />
                        </View>
                        <Text
                          style={[
                            styles.listText,
                            isSelected && styles.listTextActive,
                          ]}
                        >
                          {category.name}
                        </Text>
                      </View>
                      {isSelected && (
                        <Feather name="check" size={16} color="#34C759" />
                      )}
                    </TouchableOpacity>
                  );
                })}

                {filteredCategories.length === 0 && (
                  <Text style={styles.noResultText}>No categories found</Text>
                )}
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  headerRow: { paddingVertical: 16, alignItems: "center" },
  headerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    padding: 4,
    borderRadius: 14,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 11,
    alignItems: "center",
    borderRadius: 10,
  },
  activeAllTab: { backgroundColor: "rgba(255, 255, 255, 0.12)" },
  activeExpenseTab: { backgroundColor: "#EB5757" },
  activeIncomeTab: { backgroundColor: "#34C759" },
  tabText: { color: "#D1D5DB", fontSize: 14, fontWeight: "600" },
  activeTabText: { color: "#FFFFFF", fontWeight: "700" },
  activeIncomeText: { color: "#06110A", fontWeight: "700" },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  filterBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.07)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: "48.5%",
  },
  filterContent: { flexDirection: "row", alignItems: "center", flex: 1 },
  filterText: { color: "#FFFFFF", fontSize: 13, fontWeight: "600", flex: 1 },
  sectionLabel: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  placeholderContainer: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  // মডার্ন বটম শীট মোডাল স্টাইলসমূহ
  modalOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalBottomContainer: { flex: 1, justifyContent: "flex-end" },
  bottomSheetMenu: {
    backgroundColor: "#121F38",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  sheetHandle: {
    width: 42,
    height: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignSelf: "center",
    marginBottom: 16,
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  searchBarBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.07)",
    marginBottom: 16,
  },
  searchInputText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 4,
  },
  itemActive: { backgroundColor: "rgba(255,255,255,0.05)" },
  infoLeft: { flexDirection: "row", alignItems: "center" },
  listIconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.04)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  listText: { color: "#D1D5DB", fontSize: 14, fontWeight: "600" },
  listTextActive: { color: "#34C759", fontWeight: "700" },
  noResultText: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 13,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});
