import { useDeleteTransactionMutation } from "@/redux/features/transactionApi";
import { TCategory } from "@/types/categoryTypes";
import { TTransaction } from "@/types/transactionType";
import { renderIcon } from "@/utils/renderIcon";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
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

type TFormattedTransaction = {
  _id: string;
  user: string;
  type: "income" | "expense";
  category: TCategory;
  date: string | Date;
  amount: number;
  note?: string;
};

type TTransactionSection = {
  date: string;
  data: TFormattedTransaction[];
};

interface TransactionsListProps {
  transactions: TTransaction[];
}

export default function TransactionsList({
  transactions,
}: TransactionsListProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] =
    useState<TFormattedTransaction | null>(null);

  const TRANSACTION_DATA = useMemo<TTransactionSection[]>(() => {
    const grouped = transactions?.reduce(
      (acc: Record<string, any>, item: TTransaction) => {
        const dateKey = dayjs(item.date).format("DD MMM, YYYY");

        if (!acc[dateKey]) {
          acc[dateKey] = {
            date: dateKey,
            data: [],
          };
        }

        acc[dateKey].data.push({
          _id: item._id,
          user: item.user,
          type: item.type,
          category: item.category,
          date: item.date,
          amount: item.amount,
          note: item.note,
        });

        return acc;
      },
      {},
    );

    return Object.values(grouped);
  }, [transactions]);

  const handleLongPress = (item: TFormattedTransaction) => {
    setSelectedItem(item);
    setMenuVisible(true);
  };

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
    <View style={styles.container}>
      {TRANSACTION_DATA?.map((section) => (
        <View key={section?.date} style={styles.sectionWrapper}>
          <Text style={styles.sectionHeader}>{section?.date}</Text>

          {/* TRANSACTION ITEMS */}
          {section.data.map((item, itemIdx: number) => {
            const isExpense = item.type === "expense";

            return (
              <View key={item?._id}>
                <TouchableOpacity
                  onLongPress={() => handleLongPress(item)}
                  delayLongPress={400}
                  activeOpacity={0.6}
                  style={styles.itemContainer}
                >
                  <View style={styles.iconBox}>
                    {renderIcon({
                      family: item.category?.icon?.family,
                      name: item.category?.icon?.name,
                      size: 20,
                      color: item.category?.icon?.color,
                    })}
                  </View>

                  {/* MIDDLE: Title & Subtitle */}
                  <View style={styles.textContainer}>
                    <Text style={styles.mainTitle} numberOfLines={1}>
                      {item?.note || "No description"}
                    </Text>
                    <Text style={styles.subTitle}>{item.category?.name}</Text>
                  </View>

                  {/* RIGHT: Amount */}
                  <View style={styles.rightContainer}>
                    <Text
                      style={[
                        styles.amountText,
                        { color: isExpense ? "#FFFFFF" : "#34C759" },
                      ]}
                    >
                      {isExpense ? `-$${item.amount}` : `+$${item.amount}`}
                    </Text>
                  </View>
                </TouchableOpacity>

                {itemIdx < section?.data?.length - 1 && (
                  <View style={styles.itemDivider} />
                )}
              </View>
            );
          })}
        </View>
      ))}

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
                // if (onEdit) onEdit(selectedItem);
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", paddingTop: 10 },
  sectionWrapper: { marginBottom: 24 },
  sectionHeader: {
    color: "#D1D5DB",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    marginBottom: 8,
    opacity: 0.5,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
  },
  textContainer: { flex: 1, paddingHorizontal: 14 },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  subTitle: { color: "#D1D5DB", fontSize: 12, fontWeight: "500", opacity: 0.4 },
  rightContainer: { alignItems: "flex-end" },
  amountText: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: -0.3,
    marginBottom: 3,
  },
  itemDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    marginLeft: 60,
  },

  // 🎯 নতুন বটম শিট মডাল স্টাইলস:
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
