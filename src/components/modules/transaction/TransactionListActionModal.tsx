import { useDeleteTransactionMutation } from "@/redux/features/transactionApi";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Alert,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { TFormattedTransaction } from "../dashboard/TransactionsList";

export default function TransactionListActionModal({
  menuVisible,
  setMenuVisible,
  selectedItem,
  setSelectedItem,
}: {
  menuVisible: boolean;
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: TFormattedTransaction | null;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<TFormattedTransaction | null>
  >;
}) {
  const router = useRouter();
  const closeMenu = () => {
    setMenuVisible(false);
    setSelectedItem(null);
  };

  const [deleteTransaction] = useDeleteTransactionMutation();
  const handleDelete = async (transaction: { _id: string; note: string }) => {
    Alert.alert(
      "Delete Transaction",
      `Are you sure you want to delete "${transaction?.note}"?`,
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
              const id = transaction?._id;
              const res = await deleteTransaction(id).unwrap();
              if (res?.success) {
                Toast.show({
                  type: "success",
                  text2: res?.message,
                  position: "top",
                  visibilityTime: 3000,
                  autoHide: true,
                });

                closeMenu();
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
      animationType="slide"
      transparent
      visible={menuVisible}
      onRequestClose={closeMenu}
    >
      <View style={styles.modalRoot}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeMenu}
        />

        <LinearGradient
          colors={["#121F38", "#0D1117"]}
          style={styles.bottomSheetContainer}
        >
          <View style={styles.sheetHandle} />

          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Manage Transaction</Text>
            <Text style={styles.sheetSubtitle}>
              {selectedItem?.note
                ? `"${selectedItem.note}"`
                : selectedItem?.category?.name}{" "}
              — ${selectedItem?.amount}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.7}
            onPress={() => {
              if (!selectedItem?._id) return;
              closeMenu();
              router.push({
                pathname: `/transaction/edit/${selectedItem?._id}` as any,
              });
            }}
          >
            <View
              style={[
                styles.actionIconBox,
                { backgroundColor: "rgba(47, 128, 237, 0.1)" },
              ]}
            >
              <Feather name="edit-2" size={18} color="#2F80ED" />
            </View>
            <Text style={styles.actionText}>Edit Details</Text>
          </TouchableOpacity>

          <View style={styles.sheetDivider} />

          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.7}
            onPress={() => {
              if (selectedItem)
                handleDelete({
                  _id: selectedItem?._id,
                  note: selectedItem?.note || "",
                });
            }}
          >
            <View
              style={[
                styles.actionIconBox,
                { backgroundColor: "rgba(235, 87, 87, 0.1)" },
              ]}
            >
              <Feather name="trash-2" size={18} color="#EB5757" />
            </View>
            <Text style={[styles.actionText, { color: "#EB5757" }]}>
              Delete Transaction
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: { justifyContent: "flex-end", flex: 1 },
  modalOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomSheetContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 40 : 26,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  sheetHandle: {
    width: 40,
    height: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignSelf: "center",
    marginBottom: 20,
  },
  sheetHeader: { marginBottom: 22, alignItems: "center" },
  sheetTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  sheetSubtitle: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  actionIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  actionText: { color: "#FFFFFF", fontSize: 15, fontWeight: "600" },
  sheetDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.04)",
    marginVertical: 2,
  },
});
