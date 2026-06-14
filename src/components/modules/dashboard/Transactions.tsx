import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

const TRANSACTION_DATA = [
  {
    date: "14-06-2026",
    data: [
      {
        id: "t1",
        user: "Rakib",
        type: "expense",
        category: "Food",
        date: "14-06-2026",
        amount: 250,
        note: "Lunch with team",
        time: "1:15 PM",
      },
      {
        id: "t2",
        user: "Rakib",
        type: "income",
        category: "Freelance",
        date: "14-06-2026",
        amount: 5000,
        note: "UI Design Project Milestone",
        time: "11:00 AM",
      },
      {
        id: "t3",
        user: "Rakib",
        type: "expense",
        category: "Transport",
        date: "14-06-2026",
        amount: 120,
        note: "Uber ride to office",
        time: "9:30 AM",
      },
    ],
  },
  {
    date: "13-06-2026",
    data: [
      {
        id: "t4",
        user: "Rakib",
        type: "expense",
        category: "Utilities",
        date: "13-06-2026",
        amount: 1500,
        note: "Internet bill payment",
        time: "6:45 PM",
      },
      {
        id: "t5",
        user: "Rakib",
        type: "expense",
        category: "Shopping",
        date: "13-06-2026",
        amount: 850,
        note: "T-shirt from local brand",
        time: "4:20 PM",
      },
      {
        id: "t6",
        user: "Rakib",
        type: "expense",
        category: "Utilities",
        date: "13-06-2026",
        amount: 1500,
        note: "Internet bill payment",
        time: "6:45 PM",
      },
      {
        id: "t7",
        user: "Rakib",
        type: "expense",
        category: "Shopping",
        date: "13-06-2026",
        amount: 850,
        note: "T-shirt from local brand",
        time: "4:20 PM",
      },
    ],
  },
];

export default function Transactions() {
  return (
    <View style={styles.container}>
      {TRANSACTION_DATA.map((section) => (
        <View key={section.date} style={styles.sectionWrapper}>
          <Text style={styles.sectionHeader}>{section.date}</Text>

          {/* TRANSACTION ITEMS */}
          {section.data.map((item, itemIdx) => {
            const isExpense = item.type === "expense";

            return (
              <View key={item.id}>
                <View style={styles.itemContainer}>
                  <View style={styles.iconBox}>
                    <Feather
                      name="activity"
                      size={18}
                      color={isExpense ? "#FFA1A1" : "#34C759"}
                    />
                  </View>

                  {/* MIDDLE: Title & Subtitle */}
                  <View style={styles.textContainer}>
                    <Text style={styles.mainTitle} numberOfLines={1}>
                      {item.note.toUpperCase()}
                    </Text>
                    <Text style={styles.subTitle}>{item.category}</Text>
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

                {itemIdx < section.data.length - 1 && (
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
