import AppBackground from "@/components/AppBackground";
import BackBtn from "@/components/BackBtn";
import { commonStyles } from "@/constants/style";
import { useGetAllCategoryQuery } from "@/redux/features/categoryApi";
import { useAddTransactionMutation } from "@/redux/features/transactionApi";
import { useAppSelector } from "@/redux/hooks";
import { TCategory } from "@/types/categoryTypes";
import { renderIcon } from "@/utils/renderIcon";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
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
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function AddTransactionScreen() {
  const router = useRouter();
  const { loggedUser } = useAppSelector((state: any) => state.auth);
  const [transactionType, setTransactionType] = useState<"expense" | "income">(
    "expense",
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [modalVisible, setModalVisible] = useState(false);

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const amountInputRef = useRef<TextInput>(null);

  const { data } = useGetAllCategoryQuery({ user: loggedUser?._id });
  const categories = data?.data || [];

  const handleCategoryPress = (category: TCategory) => {
    setSelectedCategory(category?.name);
    setSelectedCategoryId(category?._id);
    setModalVisible(true);
  };

  const closeModal = () => {
    Keyboard.dismiss();
    setModalVisible(false);
    setShow(false);
  };

  const [addTransaction, { isLoading }] = useAddTransactionMutation();
  const handleSubmit = async () => {
    if (!amount.trim()) return;

    const data = {
      type: transactionType,
      category: selectedCategoryId,
      user: loggedUser?._id,
      amount,
      note,
      date,
    };

    try {
      const res = await addTransaction(data).unwrap();
      if (res?.success) {
        Toast.show({
          type: "success",
          text2: res?.message,
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
        });

        setModalVisible(false);
        setAmount("");
        setNote("");
        setSelectedCategory(null);
        setDate(new Date());
        router.back();
      }
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

  return (
    <AppBackground>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <View style={styles.headerRow}>
          <BackBtn />
          <Text style={styles.headerTitle}>Add Transaction</Text>
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
            <TouchableOpacity
              key={item?._id}
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(item)}
              activeOpacity={0.85}
            >
              <View style={styles.iconWrapper}>
                {renderIcon({
                  family: item?.icon?.family,
                  name: item?.icon?.name,
                  size: 20,
                  color: item?.icon?.color,
                })}
              </View>
              <Text style={styles.categoryName} numberOfLines={1}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.categoryCard, styles.addNewCategoryCard]}
            onPress={() => router.push("/addCategory")}
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
              style={[styles.categoryName, { color: "rgba(255,255,255,0.4)" }]}
              numberOfLines={1}
            >
              Add New
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <KeyboardAvoidingView
            style={styles.modalRoot}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={closeModal}
            />

            <LinearGradient
              colors={["#121F38", "#0D1117"]}
              style={styles.bottomSheetContainer}
            >
              <View style={styles.sheetHandle} />

              <View style={styles.modalHeaderRow}>
                <View>
                  <Text style={styles.modalLabel}>Selected Category</Text>
                  <Text style={styles.modalSelectedTitle}>
                    {selectedCategory} — {transactionType.toUpperCase()}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeModal}
                  activeOpacity={0.8}
                >
                  <Feather name="x" size={20} color="#D1D5DB" />
                </TouchableOpacity>
              </View>

              <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.amountInputContainer}>
                  <TextInput
                    ref={amountInputRef}
                    style={styles.amountTextInput}
                    placeholder="0.00"
                    placeholderTextColor="rgba(255,255,255,0.16)"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                  />
                </View>

                <View style={styles.fieldsColumnWrapper}>
                  <TouchableOpacity
                    style={styles.inputFieldBox}
                    activeOpacity={0.7}
                    onPress={() => {
                      Keyboard.dismiss();
                      setShow(!show);
                    }}
                  >
                    <View style={styles.inputRow}>
                      <Feather
                        name="calendar"
                        size={16}
                        color="#2F80ED"
                        style={{ marginRight: 10 }}
                      />
                      <Text style={styles.datePickerTriggerText}>
                        {dayjs(date, "YYYY/MM/DD").format("DD-MMM-YYYY")}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {show && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="default"
                      onValueChange={(event, selectedDate) => {
                        setShow(false);
                        if (selectedDate) {
                          setDate(selectedDate);
                        }
                      }}
                    />
                  )}

                  <View style={[styles.inputFieldBox, { marginTop: 12 }]}>
                    <TextInput
                      style={styles.fieldInputText}
                      placeholder="Add description..."
                      placeholderTextColor="rgba(255,255,255,0.25)"
                      value={note}
                      onChangeText={setNote}
                      multiline
                      textAlignVertical="top"
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={commonStyles.primaryButton}
                  onPress={handleSubmit}
                  activeOpacity={0.85}
                  disabled={!amount.trim() || isLoading}
                >
                  <Text style={commonStyles.primaryButtonText}>
                    {isLoading ? "Loading..." : "Save Transaction"}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </LinearGradient>
          </KeyboardAvoidingView>
        </Modal>
      </SafeAreaView>
    </AppBackground>
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
  headerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
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
  typeTabText: { color: "#D1D5DB", fontSize: 14, fontWeight: "600" },
  activeTypeText: { color: "#FFFFFF", fontWeight: "700" },
  activeIncomeText: { color: "#06110A", fontWeight: "700" },
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
    fontWeight: "600",
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
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  modalSelectedTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
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
    fontWeight: "800",
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

  // 🎯 মডার্ন পিকারের কাস্টম স্টাইল:
  datePickerTriggerText: { color: "#FFFFFF", fontSize: 15, fontWeight: "500" },
  pickerWrapper: {
    marginTop: 10,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
});
