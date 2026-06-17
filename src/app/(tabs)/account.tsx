import AppBackground from "@/components/AppBackground";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userLogout } from "@/redux/slices/authSlice";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountScreen() {
  const route = useRouter();
  const { loggedUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

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
              <Image
                source={require("@/assets/images/user.png")}
                style={styles.avatar}
              />
            </View>

            <Text style={styles.userName}>{loggedUser?.name}</Text>
            <Text style={styles.userId}>{loggedUser?.email}</Text>

            {/* Profile Edit Button */}
            <TouchableOpacity
              style={styles.editProfileBtn}
              activeOpacity={0.8}
              onPress={() => route.push("/account/editProfile")}
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

          {/* Menu / Settings Options */}
          <View style={styles.menuContainer}>
            <Text style={styles.menuGroupTitle}>General</Text>

            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => {
                route.push("/category/all" as any);
              }}
            >
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

            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => {
                route.push("/(tabs)/transactions");
              }}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconBox}>
                  <MaterialCommunityIcons
                    name="swap-horizontal"
                    size={20}
                    color="#ffa500"
                  />
                </View>
                <Text style={styles.menuItemText}>Manage Transaction</Text>
              </View>
              <Feather
                name="chevron-right"
                size={16}
                color="rgba(255,255,255,0.3)"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => {
                route.push("/(tabs)/statistics");
              }}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconBox}>
                  <Ionicons
                    name="pie-chart-outline"
                    size={20}
                    color="#BB6BD9"
                  />
                </View>
                <Text style={styles.menuItemText}>Statistics</Text>
              </View>
              <Feather
                name="chevron-right"
                size={16}
                color="rgba(255,255,255,0.3)"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => {
                route.push("/account/setting");
              }}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconBox}>
                  <Ionicons name="settings-outline" size={20} color="#EB5757" />
                </View>
                <Text style={styles.menuItemText}>Setting</Text>
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
              onPress={() => {
                Alert.alert(
                  "Logout",
                  "Are you sure you want to log out of your account?",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Logout",
                      style: "destructive",
                      onPress: () => dispatch(userLogout()),
                    },
                  ],
                  { cancelable: true },
                );
              }}
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
    fontFamily: "Poppins-SemiBold",
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
    fontFamily: "Poppins-Bold",
    marginBottom: 4,
  },
  userId: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 13,
    fontFamily: "Poppins-Medium",
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
    fontFamily: "Poppins-SemiBold",
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
    fontFamily: "Poppins-SemiBold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 26,
    fontFamily: "Poppins-SemiBold",
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
    fontFamily: "Poppins-Bold",
  },
  miniValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  menuContainer: {
    width: "100%",
    marginBottom: 40,
  },
  menuGroupTitle: {
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: 11,
    fontFamily: "Poppins-SemiBold",
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
    fontFamily: "Poppins-SemiBold",
  },
  logoutItem: {
    backgroundColor: "rgba(235, 87, 87, 0.03)",
    borderColor: "rgba(235, 87, 87, 0.08)",
    marginTop: 2,
  },
});
