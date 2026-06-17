import { TCategory } from "@/types/categoryTypes";
import { TTransaction } from "@/types/transactionType";
import { renderIcon } from "@/utils/renderIcon";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TransactionListActionModal from "../transaction/TransactionListActionModal";

export type TFormattedTransaction = {
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
  onRefresh?: () => Promise<void>;
}

export default function TransactionsList({
  transactions,
  onRefresh,
}: TransactionsListProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] =
    useState<TFormattedTransaction | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const [isAtTop, setIsAtTop] = useState(true);

  const handleRefresh = useCallback(async () => {
    if (!onRefresh || refreshing) return;

    try {
      setRefreshing(true);
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh, refreshing]);

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

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={(event) => {
        const y = event.nativeEvent.contentOffset.y;
        setIsAtTop(y <= 0);
      }}
      refreshControl={
        <RefreshControl
          enabled={isAtTop}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor="#2F80ED"
          colors={["#2F80ED"]}
          progressBackgroundColor="rgba(22, 27, 38, 0.95)"
        />
      }
    >
      {TRANSACTION_DATA?.map((section) => (
        <View key={section?.date} style={styles.sectionWrapper}>
          <Text style={styles.sectionHeader}>{section?.date}</Text>

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

                  <View style={styles.textContainer}>
                    <Text style={styles.mainTitle} numberOfLines={1}>
                      {item?.note || "No description"}
                    </Text>
                    <Text style={styles.subTitle}>{item.category?.name}</Text>
                  </View>

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

      <TransactionListActionModal
        menuVisible={menuVisible}
        setMenuVisible={setMenuVisible}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", paddingTop: 14, paddingBottom: 100 },
  sectionWrapper: { marginBottom: 24 },
  sectionHeader: {
    color: "#D1D5DB",
    fontSize: 11,
    fontFamily: "Poppins-SemiBold",
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
    fontFamily: "Poppins-Medium",
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  subTitle: {
    color: "#D1D5DB",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    opacity: 0.4,
  },
  rightContainer: { alignItems: "flex-end" },
  amountText: {
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
    letterSpacing: -0.3,
    marginBottom: 3,
  },
  itemDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    marginLeft: 60,
  },
});
