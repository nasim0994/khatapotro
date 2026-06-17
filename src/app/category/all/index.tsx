import AppBackground from "@/components/AppBackground";
import BackBtn from "@/components/BackBtn";
import CategoryCard from "@/components/modules/category/CategoryCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useGetAllCategoryQuery } from "@/redux/features/categoryApi";
import { useAppSelector } from "@/redux/hooks";
import { TCategory } from "@/types/categoryTypes";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AllCategory() {
  const router = useRouter();
  const { loggedUser } = useAppSelector((state: any) => state.auth);
  const [transactionType, setTransactionType] = useState<"expense" | "income">(
    "expense",
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data } = useGetAllCategoryQuery({ user: loggedUser?._id });
  const categories = data?.data || [];

  return (
    <ProtectedRoute>
      <AppBackground>
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
          <View style={styles.headerRow}>
            <BackBtn />
            <Text style={styles.headerTitle}>My Categories</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.typeSelectorContainer}>
            <TouchableOpacity
              style={[
                styles.typeTab,
                transactionType === "expense" && styles.activeExpenseTab,
              ]}
              onPress={() => setTransactionType("expense")}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.typeTabText,
                  transactionType === "expense" && styles.activeTypeText,
                ]}
              >
                Expense
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeTab,
                transactionType === "income" && styles.activeIncomeTab,
              ]}
              onPress={() => setTransactionType("income")}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.typeTabText,
                  transactionType === "income" && styles.activeIncomeText,
                ]}
              >
                Income
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollGrid}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {categories?.map((item: TCategory) => (
              <CategoryCard
                key={item?._id}
                category={item}
                setSelectedCategory={setSelectedCategory}
              />
            ))}

            <TouchableOpacity
              style={[styles.categoryCard, styles.addNewCategoryCard]}
              onPress={() => router.push("/category/add" as any)}
              activeOpacity={0.85}
            >
              <View
                style={[
                  styles.iconWrapper,
                  { backgroundColor: "rgba(255,255,255,0.03)" },
                ]}
              >
                <Feather name="plus" size={20} color="rgba(255,255,255,0.4)" />
              </View>
              <Text
                style={[
                  styles.categoryName,
                  { color: "rgba(255,255,255,0.4)" },
                ]}
                numberOfLines={1}
              >
                Add New
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </AppBackground>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
  },
  typeSelectorContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    padding: 4,
    borderRadius: 14,
    marginBottom: 20,
  },
  typeTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  activeExpenseTab: { backgroundColor: "#EB5757" },
  activeIncomeTab: { backgroundColor: "#2F80ED" },
  typeTabText: { color: "#D1D5DB", fontSize: 14, fontFamily: "Poppins-Medium" },
  activeTypeText: { color: "#FFFFFF", fontFamily: "Poppins-SemiBold" },
  activeIncomeText: { color: "#06110A", fontFamily: "Poppins-SemiBold" },
  scrollGrid: { flexDirection: "row", flexWrap: "wrap", paddingBottom: 30 },
  categoryCard: {
    width: "22.5%",
    marginHorizontal: "1.25%",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  addNewCategoryCard: {
    borderStyle: "dashed",
    borderColor: "rgba(255, 255, 255, 0.15)",
    backgroundColor: "transparent",
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  categoryName: {
    color: "#D1D5DB",
    fontSize: 10,
    fontFamily: "Poppins-Medium",
    textAlign: "center",
    paddingHorizontal: 2,
  },
  modalRoot: { justifyContent: "flex-end", flex: 1 },
  modalOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomSheetContainer: {
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 34 : 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    maxHeight: "85%",
  },
  sheetHandle: {
    width: 42,
    height: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignSelf: "center",
    marginBottom: 16,
  },
  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  modalLabel: {
    color: "rgba(255,255,255,0.35)",
    fontSize: 10,
    fontFamily: "Poppins-SemiBold",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  modalSelectedTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Poppins-Bold",
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    justifyContent: "center",
    alignItems: "center",
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 14,
  },
  amountTextInput: {
    color: "#FFFFFF",
    fontSize: 42,
    fontFamily: "Poppins-Bold",
    minWidth: 130,
    paddingVertical: 8,
    textAlign: "center",
    includeFontPadding: false,
  },
  fieldsColumnWrapper: { flexDirection: "column", marginVertical: 16 },
  inputFieldBox: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.07)",
  },
  inputRow: { flexDirection: "row", alignItems: "center" },
  fieldInputText: { color: "#FFFFFF", flex: 1 },

  datePickerTriggerText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Poppins-Regilar",
  },
  pickerWrapper: {
    marginTop: 10,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
});
