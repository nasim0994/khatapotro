import AppBackground from "@/components/AppBackground";
import BackBtn from "@/components/BackBtn";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useGetAllCategoryQuery } from "@/redux/features/categoryApi"; // 🎯 আপনার সঠিক পাথ দিন
import {
  useGetTransactionByIdQuery,
  useUpdateTransactionMutation,
} from "@/redux/features/transactionApi";
import { TCategory } from "@/types/categoryTypes";
import { renderIcon } from "@/utils/renderIcon";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function EditTransaction() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data: transData, isLoading: isTransLoading } =
    useGetTransactionByIdQuery(id, { skip: !id });
  const { data: catData, isLoading: isCatLoading } =
    useGetAllCategoryQuery(undefined);
  const [updateTransaction, { isLoading: isUpdating }] =
    useUpdateTransactionMutation();

  const transaction = transData?.data || {};
  const categories: TCategory[] = catData?.data || [];

  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [note, setNote] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    null,
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (transaction && Object.keys(transaction).length > 0) {
      setAmount(String(transaction.amount || ""));
      setType(transaction.type || "expense");
      setNote(transaction.note || "");
      if (transaction.category) {
        setSelectedCategory(transaction.category);
      }
    }
  }, [transaction]);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleUpdate = async () => {
    if (!amount || Number(amount) <= 0) {
      Alert.alert("Validation Error", "Please enter a valid amount.");
      return;
    }
    if (!selectedCategory) {
      Alert.alert("Validation Error", "Please select a category.");
      return;
    }

    try {
      const updatedBody = {
        amount: Number(amount),
        type,
        note,
        category: selectedCategory?._id,
      };

      await updateTransaction({ id, data: updatedBody }).unwrap();
      Toast.show({
        type: "success",
        text2: "Transaction updated successfully!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
      router.back();
    } catch (err: any) {
      const firstErrorMessage =
        Array.isArray(err?.data?.error) && err.data.error.length > 0
          ? `${err.data.error[0].path}: ${err.data.error[0].message}`
          : err?.data?.message || "Something went wrong";

      Toast.show({
        type: "error",
        text2: firstErrorMessage,
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  if (isTransLoading || isCatLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: "#0D1117" }]}>
        <ActivityIndicator size="large" color="#2F80ED" />
      </View>
    );
  }

  return (
    <ProtectedRoute>
      <AppBackground>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <View style={styles.header}>
              <BackBtn />
              <Text style={styles.headerTitle}>Edit Transaction</Text>
              <View style={{ width: 40 }} />
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}
            >
              {/* 🔄 টাইপ সিলেক্টর (Income / Expense) */}
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[
                    styles.tabButton,
                    type === "expense" && styles.activeExpenseTab,
                  ]}
                  onPress={() => setType("expense")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      type === "expense" && styles.activeText,
                    ]}
                  >
                    Expense
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tabButton,
                    type === "income" && styles.activeIncomeTab,
                  ]}
                  onPress={() => setType("income")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      type === "income" && styles.activeText,
                    ]}
                  >
                    Income
                  </Text>
                </TouchableOpacity>
              </View>

              {/* 💵 অ্যামাউন্ট ইনপুট বক্স */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Amount ($)</Text>
                <View style={styles.amountInputBox}>
                  <Text
                    style={[
                      styles.currencySymbol,
                      type === "income" && { color: "#34C759" },
                    ]}
                  >
                    {type === "expense" ? "-" : "+"} $
                  </Text>
                  <TextInput
                    style={styles.amountInput}
                    keyboardType="numeric"
                    placeholder="0.00"
                    placeholderTextColor="rgba(255,255,255,0.2)"
                    value={amount}
                    onChangeText={setAmount}
                  />
                </View>
              </View>

              {/* 📂 ক্যাটাগরি ড্রপডাউন বাটন */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Category</Text>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  activeOpacity={0.7}
                  onPress={() => setIsModalVisible(true)}
                >
                  <View style={styles.dropdownLeft}>
                    {selectedCategory ? (
                      <>
                        <View style={styles.selectedIconBox}>
                          {renderIcon({
                            family: selectedCategory.icon?.family,
                            name: selectedCategory.icon?.name,
                            size: 16,
                            color: selectedCategory.icon?.color,
                          })}
                        </View>
                        <Text style={styles.dropdownText}>
                          {selectedCategory.name}
                        </Text>
                      </>
                    ) : (
                      <Text
                        style={[
                          styles.dropdownText,
                          { color: "rgba(255,255,255,0.3)" },
                        ]}
                      >
                        Select a category
                      </Text>
                    )}
                  </View>
                  <Feather
                    name="chevron-down"
                    size={18}
                    color="rgba(255,255,255,0.4)"
                  />
                </TouchableOpacity>
              </View>

              {/* 📝 নোট / ডেসক্রিপশন ইনপুট */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Note / Description</Text>
                <View style={styles.noteInputBox}>
                  <Feather
                    name="edit-3"
                    size={16}
                    color="rgba(255,255,255,0.3)"
                    style={{ marginRight: 10 }}
                  />
                  <TextInput
                    style={styles.noteInput}
                    placeholder="What was this for?"
                    placeholderTextColor="rgba(255,255,255,0.3)"
                    value={note}
                    onChangeText={setNote}
                    multiline
                  />
                </View>
              </View>

              {/* 🚀 সেভ চেঞ্জেস বাটন */}
              <TouchableOpacity
                style={styles.submitButton}
                activeOpacity={0.8}
                onPress={handleUpdate}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitButtonText}>Save Changes</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </AppBackground>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(false);
                  setSearchQuery("");
                }}
              >
                <Feather name="x" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* 🔍 সার্চ বার */}
            <View style={styles.searchBarBox}>
              <Feather
                name="search"
                size={18}
                color="rgba(255,255,255,0.3)"
                style={{ marginRight: 10 }}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search category..."
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* 📜 ক্যাটাগরি লিস্ট */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat) => (
                  <TouchableOpacity
                    key={cat._id}
                    style={[
                      styles.categoryListItem,
                      selectedCategory?._id === cat._id &&
                        styles.activeCategoryItem,
                    ]}
                    onPress={() => {
                      setSelectedCategory(cat);
                      setIsModalVisible(false);
                      setSearchQuery(""); // ক্লিয়ার সার্চ
                    }}
                  >
                    <View style={styles.categoryListLeft}>
                      <View
                        style={[
                          styles.selectedIconBox,
                          { backgroundColor: "rgba(255,255,255,0.03)" },
                        ]}
                      >
                        {renderIcon({
                          family: cat.icon?.family,
                          name: cat.icon?.name,
                          size: 16,
                          color: cat.icon?.color,
                        })}
                      </View>
                      <Text style={styles.categoryListText}>{cat.name}</Text>
                    </View>
                    {selectedCategory?._id === cat._id && (
                      <Feather name="check" size={18} color="#2F80ED" />
                    )}
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noDataText}>No categories found</Text>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  scrollContainer: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 40 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
  },

  // ট্যাব স্টাইল
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 14,
    padding: 4,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  activeExpenseTab: { backgroundColor: "#EB5757" },
  activeIncomeTab: { backgroundColor: "#34C759" },
  tabText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  activeText: { color: "#FFFFFF" },

  // ইনপুট বক্স সমূহ
  inputWrapper: { marginBottom: 20 },
  inputLabel: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    marginBottom: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  amountInputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 64,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  currencySymbol: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
    marginRight: 6,
  },
  amountInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
  },

  // ড্রপডাউন স্টাইল
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  dropdownLeft: { flexDirection: "row", alignItems: "center" },
  selectedIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.06)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  dropdownText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Poppins-Medium",
  },

  noteInputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: 16,
    paddingHorizontal: 16,
    minHeight: 56,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  noteInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    paddingVertical: 10,
  },

  submitButton: {
    width: "100%",
    height: 54,
    backgroundColor: "#2F80ED",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },

  // 🎯 মডাল স্টাইলস
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#121F38",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
  },

  searchBarBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 46,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  searchInput: { flex: 1, color: "#FFFFFF", fontSize: 14 },

  categoryListItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 4,
  },
  activeCategoryItem: { backgroundColor: "rgba(47, 128, 237, 0.08)" },
  categoryListLeft: { flexDirection: "row", alignItems: "center" },
  categoryListText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Poppins-Medium",
  },
  noDataText: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
  },
});
