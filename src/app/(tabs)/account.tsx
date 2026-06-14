import AppBackground from "@/components/AppBackground";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountScreen() {
  const user = {
    name: "John Doe",
    userId: "@johndoe2026",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    balance: "$12,450.00",
    income: "$4,500.00",
    expense: "$1,250.00",
  };

  return (
    <AppBackground>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profile Section */}
          <View style={styles.profileContainer}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              {/* এডিট বাটনটি প্রোফাইল ছবির ঠিক কোণায় সুন্দর করে প্লেস করা হয়েছে */}
              <TouchableOpacity
                style={styles.avatarEditBtn}
                activeOpacity={0.85}
                onPress={() => console.log("Edit Avatar")}
              >
                <Feather name="camera" size={14} color="#000000" />
              </TouchableOpacity>
            </View>

            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userId}>{user.userId}</Text>

            {/* Profile Edit Button */}
            <TouchableOpacity
              style={styles.editProfileBtn}
              activeOpacity={0.8}
              onPress={() => console.log("Edit Profile Clicked")}
            >
              <Feather
                name="edit-3"
                size={14}
                color="#FFFFFF"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.editProfileBtnText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Financial Summary Card */}
          <LinearGradient
            colors={["#121F38", "#0D1117"]}
            style={styles.statsCard}
          >
            <View style={styles.balanceSection}>
              <Text style={styles.statLabel}>Total Balance</Text>
              <Text style={styles.statValue}>{user.balance}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.rowStats}>
              <View style={styles.statSubBox}>
                <View
                  style={[
                    styles.miniIcon,
                    { backgroundColor: "rgba(52, 199, 89, 0.1)" },
                  ]}
                >
                  <Feather name="arrow-down-left" size={16} color="#34C759" />
                </View>
                <View>
                  <Text style={styles.miniLabel}>Income</Text>
                  <Text style={styles.miniValue}>{user.income}</Text>
                </View>
              </View>
              <View style={styles.statSubBox}>
                <View
                  style={[
                    styles.miniIcon,
                    { backgroundColor: "rgba(235, 87, 87, 0.1)" },
                  ]}
                >
                  <Feather name="arrow-up-right" size={16} color="#EB5757" />
                </View>
                <View>
                  <Text style={styles.miniLabel}>Expense</Text>
                  <Text style={styles.miniValue}>{user.expense}</Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Menu / Settings Options */}
          <View style={styles.menuContainer}>
            <Text style={styles.menuGroupTitle}>General</Text>

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconBox}>
                  <Ionicons name="grid-outline" size={18} color="#4FACFE" />
                </View>
                <Text style={styles.menuItemText}>Manage Categories</Text>
              </View>
              <Feather
                name="chevron-right"
                size={16}
                color="rgba(255,255,255,0.3)"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconBox}>
                  <Feather name="settings" size={18} color="#BB6BD9" />
                </View>
                <Text style={styles.menuItemText}>App Settings</Text>
              </View>
              <Feather
                name="chevron-right"
                size={16}
                color="rgba(255,255,255,0.3)"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconBox}>
                  <FontAwesome5 name="file-export" size={16} color="#F2C94C" />
                </View>
                <Text style={styles.menuItemText}>Export Data (CSV)</Text>
              </View>
              <Feather
                name="chevron-right"
                size={16}
                color="rgba(255,255,255,0.3)"
              />
            </TouchableOpacity>

            <Text style={styles.menuGroupTitle}>Account Actions</Text>

            <TouchableOpacity
              style={[styles.menuItem, styles.logoutItem]}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View
                  style={[
                    styles.menuIconBox,
                    { backgroundColor: "rgba(235, 87, 87, 0.1)" },
                  ]}
                >
                  <Feather name="log-out" size={18} color="#EB5757" />
                </View>
                <Text style={[styles.menuItemText, { color: "#EB5757" }]}>
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scrollContent: {
    paddingBottom: 40,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 24,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 14,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 999, // rounded-full
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  avatarEditBtn: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#FFFFFF",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  userName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
  },
  userId: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 16,
  },
  editProfileBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  editProfileBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  statsCard: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    marginBottom: 28,
  },
  balanceSection: {
    alignItems: "center",
    marginBottom: 12,
  },
  statLabel: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    marginHorizontal: 10,
    marginBottom: 14,
  },
  rowStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statSubBox: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 8,
  },
  miniIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  miniLabel: {
    color: "rgba(255, 255, 255, 0.35)",
    fontSize: 10,
    fontWeight: "600",
  },
  miniValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  menuContainer: {
    width: "100%",
    marginBottom: 40,
  },
  menuGroupTitle: {
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 8,
    paddingHorizontal: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.02)",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  menuItemText: {
    color: "#D1D5DB",
    fontSize: 14,
    fontWeight: "600",
  },
  logoutItem: {
    backgroundColor: "rgba(235, 87, 87, 0.03)",
    borderColor: "rgba(235, 87, 87, 0.08)",
    marginTop: 2,
  },
});
