import AppBackground from "@/components/AppBackground";
import BackBtn from "@/components/BackBtn";
import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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

// মোডালের জন্য আইকন টাইপ ডিফাইন করা
type SelectedIconType = {
  family: string;
  name: string;
  color: string;
};

// ক্যাটাগরি তৈরির জন্য একগাদা প্রিমিয়াম আইকন লিস্ট
const AVAILABLE_ICONS = [
  {
    id: "1",
    family: "MaterialCommunityIcons",
    name: "food-fork-drink",
    color: "#FFA1A1",
  },
  { id: "2", family: "Feather", name: "shopping-bag", color: "#BB6BD9" },
  { id: "3", family: "FontAwesome5", name: "car", color: "#56CCF2" },
  { id: "4", family: "Feather", name: "zap", color: "#F2C94C" },
  { id: "5", family: "Feather", name: "film", color: "#FF85A2" },
  { id: "6", family: "MaterialCommunityIcons", name: "pill", color: "#FF7675" },
  { id: "7", family: "FontAwesome5", name: "wallet", color: "#34C759" },
  { id: "8", family: "Feather", name: "code", color: "#4FACFE" },
  { id: "9", family: "Feather", name: "trending-up", color: "#00FFCC" },
  { id: "10", family: "Feather", name: "award", color: "#F39C12" },
  { id: "11", family: "Ionicons", name: "book-outline", color: "#A2E043" },
  {
    id: "12",
    family: "MaterialCommunityIcons",
    name: "dumbbell",
    color: "#FF7675",
  },
  { id: "13", family: "FontAwesome", name: "plane", color: "#2F80ED" },
  { id: "14", family: "Ionicons", name: "home-outline", color: "#10B981" },
  { id: "15", family: "Feather", name: "heart", color: "#EF4444" },
  {
    id: "16",
    family: "MaterialCommunityIcons",
    name: "gift-outline",
    color: "#F43F5E",
  },
  { id: "17", family: "FontAwesome", name: "coffee", color: "#8B5CF6" },
  {
    id: "18",
    family: "Ionicons",
    name: "game-controller-outline",
    color: "#EC4899",
  },
  { id: "19", family: "Entypo", name: "tools", color: "#6B7280" },
  { id: "20", family: "Octicons", name: "device-desktop", color: "#3B82F6" },
  { id: "21", family: "MaterialCommunityIcons", name: "dog", color: "#10B981" },
  { id: "22", family: "Feather", name: "scissors", color: "#F59E0B" },
  { id: "23", family: "FontAwesome5", name: "baby", color: "#EC4899" },
  { id: "24", family: "MaterialCommunityIcons", name: "bus", color: "#06B6D4" },
];

// ডাইনামিক আইকন রেন্ডারার ফাংশন
const renderIcon = (
  family: string,
  name: string,
  size: number,
  color: string,
) => {
  switch (family) {
    case "MaterialCommunityIcons":
      return (
        <MaterialCommunityIcons name={name as any} size={size} color={color} />
      );
    case "Feather":
      return <Feather name={name as any} size={size} color={color} />;
    case "FontAwesome5":
      return <FontAwesome5 name={name as any} size={size} color={color} />;
    case "FontAwesome":
      return <FontAwesome name={name as any} size={size} color={color} />;
    case "Ionicons":
      return <Ionicons name={name as any} size={size} color={color} />;
    case "Entypo":
      return <Entypo name={name as any} size={size} color={color} />;
    case "Octicons":
      return <Octicons name={name as any} size={size} color={color} />;
    default:
      return <Feather name="help-circle" size={size} color={color} />;
  }
};

export default function AddCategoryScreen() {
  const [transactionType, setTransactionType] = useState<"expense" | "income">(
    "expense",
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<SelectedIconType | null>(
    null,
  );

  const nameInputRef = useRef<TextInput>(null);

  const handleIconPress = (icon: SelectedIconType) => {
    setSelectedIcon(icon);
    setModalVisible(true);
  };

  const closeModal = () => {
    Keyboard.dismiss();
    setModalVisible(false);
    setCategoryName("");
  };

  const handleSave = () => {
    if (!categoryName.trim() || !selectedIcon) return;

    console.log({
      transactionType,
      categoryName: categoryName.trim(),
      icon: selectedIcon,
    });

    closeModal();
  };

  const activeColor = transactionType === "expense" ? "#EB5757" : "#34C759";

  return (
    <AppBackground>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <BackBtn />
          <Text style={styles.headerTitle}>Add Category</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Expense | Income Type Selector */}
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

        {/* Instruction Label */}
        <Text style={styles.sectionLabel}>Select an Icon for Category</Text>

        {/* Icons Grid */}
        <ScrollView
          contentContainerStyle={styles.scrollGrid}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {AVAILABLE_ICONS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.categoryCard}
              onPress={() =>
                handleIconPress({
                  family: item.family,
                  name: item.name,
                  color: item.color,
                })
              }
              activeOpacity={0.85}
            >
              <View style={styles.iconWrapper}>
                {renderIcon(item.family, item.name, 20, item.color)}
              </View>
              {/* text */}
              <Text
                style={{
                  marginTop: 8,
                  fontSize: 11,
                  color: "#FFFFFF",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {item.name.replace(/-/g, " ")}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Bottom Sheet Modal */}
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onShow={() => {
            setTimeout(() => nameInputRef.current?.focus(), 150);
          }}
          onRequestClose={closeModal}
        >
          <KeyboardAvoidingView
            style={styles.modalRoot}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <LinearGradient
              colors={["#0D1117", "#121F38"]}
              style={styles.bottomSheetContainer}
            >
              <View style={styles.sheetHandle} />

              <View style={styles.modalHeaderRow}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {selectedIcon && (
                    <View
                      style={[
                        styles.modalIconPreview,
                        {
                          backgroundColor: "rgba(255,255,255,0.05)",
                          marginRight: 10,
                        },
                      ]}
                    >
                      {renderIcon(
                        selectedIcon.family,
                        selectedIcon.name,
                        20,
                        selectedIcon.color,
                      )}
                    </View>
                  )}
                  <View>
                    <Text style={styles.modalLabel}>Create New Category</Text>
                    <Text style={styles.modalSelectedTitle}>
                      {transactionType.toUpperCase()} CATEGORY
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeModal}
                  activeOpacity={0.8}
                >
                  <Feather name="x" size={20} color="#D1D5DB" />
                </TouchableOpacity>
              </View>

              {/* Category Name Input Field */}
              <View style={styles.fieldsColumnWrapper}>
                <View style={styles.inputFieldBox}>
                  <TextInput
                    ref={nameInputRef}
                    style={styles.fieldInputText}
                    placeholder="Enter category name..."
                    placeholderTextColor="rgba(255,255,255,0.25)"
                    value={categoryName}
                    onChangeText={setCategoryName}
                    maxLength={20}
                  />
                </View>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                style={[
                  styles.modalSaveButton,
                  {
                    backgroundColor: activeColor,
                    opacity: categoryName.trim() ? 1 : 0.5,
                  },
                ]}
                onPress={handleSave}
                activeOpacity={0.85}
                disabled={!categoryName.trim()}
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
                  Add Category
                </Text>
              </TouchableOpacity>
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
    marginBottom: 16,
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
  sectionLabel: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 16,
    paddingHorizontal: 4,
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
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalRoot: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomSheetContainer: {
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 34 : 24,
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
  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalIconPreview: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  modalLabel: {
    color: "rgba(255,255,255,0.35)",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 2,
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
  fieldsColumnWrapper: {
    flexDirection: "column",
    marginVertical: 16,
  },
  inputFieldBox: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.07)",
  },
  fieldInputText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  modalSaveButton: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 4,
  },
  modalSaveButtonText: {
    fontSize: 15,
    fontWeight: "800",
  },
});
