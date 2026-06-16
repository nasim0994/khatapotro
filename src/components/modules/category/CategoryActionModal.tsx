import { useDeleteCategoryMutation } from "@/redux/features/categoryApi";
import { TCategory } from "@/types/categoryTypes";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function CategoryActionModal({
  isActionModalVisible,
  setIsActionModalVisible,
  category,
}: {
  category: TCategory;
  isActionModalVisible: boolean;
  setIsActionModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [deleteCategory] = useDeleteCategoryMutation();
  const handleDelete = async (category: { _id: string; name: string }) => {
    Alert.alert(
      "Delete Category",
      `Are you sure you want to delete "${category?.name}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const id = category?._id;
              const res = await deleteCategory(id).unwrap();
              if (res?.success) {
                Toast.show({
                  type: "success",
                  text2: res?.message,
                  position: "top",
                  visibilityTime: 3000,
                  autoHide: true,
                });

                setIsActionModalVisible(false);
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
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <Modal
      visible={isActionModalVisible}
      transparent={true}
      animationType="slide"
      statusBarTranslucent
      onRequestClose={() => setIsActionModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setIsActionModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.notchBar} />

              <Text style={styles.modalTitle}>
                Category:{" "}
                <Text style={{ color: "#2F80ED" }}>{category?.name}</Text>
              </Text>

              <View style={styles.actionButtonsWrapper}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.editButton]}
                  activeOpacity={0.7}
                  onPress={() => {
                    setIsActionModalVisible(false);
                    router.push(`/category/edit/${category?._id}` as any);
                  }}
                >
                  <Feather name="edit-2" size={18} color="#2F80ED" />
                  <Text style={[styles.actionText, { color: "#2F80ED" }]}>
                    Edit Category
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  activeOpacity={0.7}
                  onPress={() => {
                    handleDelete({ _id: category?._id, name: category?.name });
                  }}
                >
                  <Feather name="trash-2" size={18} color="#EB5757" />
                  <Text style={[styles.actionText, { color: "#EB5757" }]}>
                    Delete Category
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#121F38",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
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
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    opacity: 0.8,
  },
  actionButtonsWrapper: {
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    gap: 10,
  },
  editButton: {
    backgroundColor: "rgba(47, 128, 237, 0.1)",
    borderColor: "rgba(47, 128, 237, 0.2)",
  },
  deleteButton: {
    backgroundColor: "rgba(235, 87, 87, 0.1)",
    borderColor: "rgba(235, 87, 87, 0.2)",
  },
  actionText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
