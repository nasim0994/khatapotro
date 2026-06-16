import AppBackground from "@/components/AppBackground";
import BackBtn from "@/components/BackBtn";
import ProtectedRoute from "@/components/ProtectedRoute";
import { commonStyles } from "@/constants/style";
import { AVAILABLE_ICONS } from "@/data/categories";
import { useAddCategoryMutation } from "@/redux/features/categoryApi";
import { useAppSelector } from "@/redux/hooks";
import { renderIcon } from "@/utils/renderIcon";
import { Feather } from "@expo/vector-icons";
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

type SelectedIconType = {
  family: string;
  name: string;
  color: string;
};

export default function AddCategoryScreen() {
  const { loggedUser } = useAppSelector((state: any) => state.auth);
  const router = useRouter();
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

  const [addCategory, { isLoading }] = useAddCategoryMutation();
  const handleSave = async () => {
    if (!categoryName.trim() || !selectedIcon) return;

    const data = {
      type: transactionType,
      name: categoryName.trim(),
      icon: selectedIcon,
      user: loggedUser?._id,
    };

    try {
      const res = await addCategory(data).unwrap();
      if (res?.success) {
        Toast.show({
          type: "success",
          text2: res?.message,
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
        });

        closeModal();
        router.push("/transaction/add" as any);
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
    <ProtectedRoute>
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
            {AVAILABLE_ICONS?.map((item) => (
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
                  {renderIcon({
                    family: item.family,
                    name: item.name,
                    size: 20,
                    color: item.color,
                  })}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Bottom Sheet Modal */}
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
                        {renderIcon({
                          family: selectedIcon.family,
                          name: selectedIcon.name,
                          size: 20,
                          color: selectedIcon.color,
                        })}
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

                {/* কীবোর্ড ওপেন অবস্থায় স্ক্রোলিং ঠিক রাখার জন্য */}
                <ScrollView
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
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
                    style={commonStyles.primaryButton}
                    onPress={handleSave}
                    activeOpacity={0.85}
                    disabled={!categoryName.trim() || isLoading}
                  >
                    <Text
                      style={[
                        styles.modalSaveButtonText,
                        {
                          color:
                            transactionType === "expense"
                              ? "#FFFFFF"
                              : "#06110A",
                        },
                      ]}
                    >
                      {isLoading ? "Loading..." : "Add Category"}
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </LinearGradient>
            </KeyboardAvoidingView>
          </Modal>
        </SafeAreaView>
      </AppBackground>
    </ProtectedRoute>
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
    width: "22%",
    marginHorizontal: "1.5%",
    aspectRatio: 1,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
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
    maxHeight: "80%",
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
    flex: 1,
  },
  modalSaveButton: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 4,
    marginBottom: 12,
  },
  modalSaveButtonText: {
    fontSize: 15,
    fontWeight: "800",
  },
});
