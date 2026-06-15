import { TCategory } from "@/types/categoryTypes";
import { TTransaction } from "@/types/transactionType";
import { renderIcon } from "@/utils/renderIcon";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

type TFormattedTransaction = {
  id: string;
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

export default function TransactionsList({
  transactions,
}: {
  transactions: TTransaction[];
}) {
  const TRANSACTION_DATA = useMemo<TTransactionSection[]>(() => {
    const grouped = transactions?.reduce(
      (acc: Record<string, any>, item: TTransaction) => {
        const date = item.date as any;

        if (!acc[date]) {
          acc[date] = {
            date,
            data: [],
          };
        }

        acc[date].data.push({
          id: item._id,
          user: item.user.name,
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

  return (
    <View style={styles.container}>
      {TRANSACTION_DATA?.map((section) => (
        <View key={section?.date} style={styles.sectionWrapper}>
          <Text style={styles.sectionHeader}>{section?.date}</Text>

          {/* TRANSACTION ITEMS */}
          {section.data.map((item, itemIdx: Number) => {
            const isExpense = item.type === "expense";

            return (
              <View key={item.id}>
                <View style={styles.itemContainer}>
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
                      {item?.note}
                    </Text>
                    <Text style={styles.subTitle}>{item.category?.name}</Text>
                  </View>

                  {/* RIGHT: Amount & Time */}
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
                </View>

                {Number(itemIdx) < section?.data?.length - 1 && (
                  <View style={styles.itemDivider} />
                )}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 10,
  },
  sectionWrapper: {
    marginBottom: 24,
  },
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
  textContainer: {
    flex: 1,
    paddingHorizontal: 14,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  subTitle: {
    color: "#D1D5DB",
    fontSize: 12,
    fontWeight: "500",
    opacity: 0.4,
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: -0.3,
    marginBottom: 3,
  },
  timeText: {
    color: "#D1D5DB",
    fontSize: 11,
    fontWeight: "500",
    opacity: 0.3,
  },
  itemDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    marginLeft: 60,
  },
});
