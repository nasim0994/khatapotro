import AppBackground from "@/components/AppBackground";
import BackBtn from "@/components/BackBtn";
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
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

const CATEGORIES = {
  expense: [
    {
      id: "e1",
      name: "Food",
      icon: (
        <MaterialCommunityIcons
          name="food-fork-drink"
          size={20}
          color="#FFA1A1"
        />
      ),
    },
    {
      id: "e2",
      name: "Shopping",
      icon: <Feather name="shopping-bag" size={18} color="#BB6BD9" />,
    },
    {
      id: "e3",
      name: "Transport",
      icon: <FontAwesome5 name="car" size={18} color="#56CCF2" />,
    },
    {
      id: "e4",
      name: "Utilities",
      icon: <Feather name="zap" size={18} color="#F2C94C" />,
    },
    {
      id: "e5",
      name: "Entertainment",
      icon: <Feather name="film" size={18} color="#FF85A2" />,
    },
    {
      id: "e6",
      name: "Medical",
      icon: <MaterialCommunityIcons name="pill" size={20} color="#FF7675" />,
    },
  ],
  income: [
    {
      id: "i1",
      name: "Salary",
      icon: <FontAwesome5 name="wallet" size={16} color="#34C759" />,
    },
    {
      id: "i2",
      name: "Freelance",
      icon: <Feather name="code" size={18} color="#4FACFE" />,
    },
    {
      id: "i3",
      name: "Investments",
      icon: <Feather name="trending-up" size={18} color="#00FFCC" />,
    },
    {
      id: "i4",
      name: "Bonus",
      icon: <Feather name="award" size={18} color="#F39C12" />,
    },
  ],
};

export default function AddTransactionScreen() {
  const router = useRouter();
  const [transactionType, setTransactionType] = useState<"expense" | "income">(
    "expense",
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("14-06-2026");

  const amountInputRef = useRef<TextInput>(null);

  const handleCategoryPress = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setModalVisible(true);
  };

  const closeModal = () => {
    Keyboard.dismiss();
    setModalVisible(false);
  };

  const handleSave = () => {
    if (!amount.trim()) return;

    console.log({
      transactionType,
      category: selectedCategory,
      amount,
      note,
      date,
    });

    setModalVisible(false);
    setAmount("");
    setNote("");
    setSelectedCategory(null);
  };

  const activeColor = transactionType === "expense" ? "#EB5757" : "#34C759";

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
          {CATEGORIES[transactionType].map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(item.name)}
              activeOpacity={0.85}
            >
              <View style={styles.iconWrapper}>{item.icon}</View>
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

              {/* কীবোর্ডের কারণে স্ক্রিন ছোট হয়ে গেলেও যাতে স্ক্রোল করা যায় */}
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
                  <View style={styles.inputFieldBox}>
                    <View style={styles.inputRow}>
                      <Feather
                        name="calendar"
                        size={15}
                        color="rgba(255,255,255,0.45)"
                        style={{ marginRight: 8 }}
                      />
                      <TextInput
                        style={styles.fieldInputText}
                        value={date}
                        onChangeText={setDate}
                        placeholder="DD-MM-YYYY"
                        placeholderTextColor="rgba(255,255,255,0.25)"
                      />
                    </View>
                  </View>

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
                  style={[
                    styles.modalSaveButton,
                    {
                      backgroundColor: activeColor,
                      opacity: amount.trim() ? 1 : 0.5,
                    },
                  ]}
                  onPress={handleSave}
                  activeOpacity={0.85}
                  disabled={!amount.trim()}
                >
                  <Text
                    style={[
                      styles.modalSaveButtonText,
                      {
                        color:
                          transactionType === "expense" ? "#FFFFFF" : "#06110A",
                      },
                    ]}
                  >
                    Save Transaction
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
    fontSize: 18,
    fontWeight: "700",
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

  activeExpenseTab: {
    backgroundColor: "#EB5757",
  },

  activeIncomeTab: {
    backgroundColor: "#34C759",
  },

  typeTabText: {
    color: "#D1D5DB",
    fontSize: 14,
    fontWeight: "600",
  },

  activeTypeText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  activeIncomeText: {
    color: "#06110A",
    fontWeight: "700",
  },

  scrollGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 30,
  },

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

  modalRoot: {
    flex: 1,
    justifyContent: "flex-end",
  },

  modalOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.4)",
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

  modalSelectedTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
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
    fontWeight: "800",
    minWidth: 130,
    paddingVertical: 0,
    textAlign: "center",
  },

  fieldsColumnWrapper: {
    flexDirection: "column",
    marginVertical: 16,
  },

  inputFieldBox: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.07)",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  fieldInputText: {
    color: "#FFFFFF",
    flex: 1,
  },

  modalSaveButton: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 10,
  },

  modalSaveButtonText: {
    fontSize: 15,
    fontWeight: "800",
  },
});
