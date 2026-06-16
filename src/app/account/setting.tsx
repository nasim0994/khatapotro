import AppBackground from "@/components/AppBackground";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  useDeletePermanentUserMutation,
  useUpdateUserPasswordMutation,
} from "@/redux/features/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userLogout } from "@/redux/slices/authSlice";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
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

export default function Setting() {
  const router = useRouter();
  const { loggedUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState("");

  const [updateUserPassword, { isLoading }] = useUpdateUserPasswordMutation();
  const handleChangePassword = async () => {
    if (!currentPassword || !password || !confirmPassword) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Validation Error", "New passwords do not match.");
      return;
    }

    try {
      const id = loggedUser?._id;
      if (!id) return;

      const data = {
        oldPassword: currentPassword,
        newPassword: password,
      };

      const res = await updateUserPassword({
        id,
        data,
      }).unwrap();
      if (res?.success) {
        Toast.show({
          type: "success",
          text2: "password updated successfully!",
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
        });

        dispatch(userLogout());
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

  const [deletePermanentUser, { isLoading: deleteLoading }] =
    useDeletePermanentUserMutation();
  const handleDeleteAccount = async () => {
    if (deleteConfirmationText !== "DELETE") return;

    try {
      const id = loggedUser?._id;
      if (!id) return;

      const res = await deletePermanentUser(id).unwrap();
      if (res?.success) {
        Toast.show({
          type: "success",
          text2: "Your account has been deleted permanently",
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
        });

        dispatch(userLogout());
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
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <Feather name="arrow-left" size={22} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Settings</Text>
              <View style={{ width: 40 }} />
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}
            >
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Change Password</Text>

                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Current Password</Text>
                  <View style={styles.inputBox}>
                    <Feather
                      name="lock"
                      size={16}
                      color="rgba(255,255,255,0.3)"
                      style={{ marginRight: 12 }}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter current password"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      secureTextEntry
                      value={currentPassword}
                      onChangeText={setCurrentPassword}
                    />
                  </View>
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>New Password</Text>
                  <View style={styles.inputBox}>
                    <Feather
                      name="lock"
                      size={16}
                      color="rgba(255,255,255,0.3)"
                      style={{ marginRight: 12 }}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter new password"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      secureTextEntry
                      value={password}
                      onChangeText={setPassword}
                    />
                  </View>
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Confirm New Password</Text>
                  <View style={styles.inputBox}>
                    <Feather
                      name="lock"
                      size={16}
                      color="rgba(255,255,255,0.3)"
                      style={{ marginRight: 12 }}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Confirm new password"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      secureTextEntry
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.submitButton}
                  activeOpacity={0.8}
                  onPress={handleChangePassword}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.submitButtonText}>Update Password</Text>
                  )}
                </TouchableOpacity>
              </View>

              <View
                style={[
                  styles.sectionCard,
                  { borderColor: "rgba(235, 87, 87, 0.15)" },
                ]}
              >
                <Text style={[styles.sectionTitle, { color: "#EB5757" }]}>
                  Danger Zone
                </Text>
                <Text style={styles.dangerDescription}>
                  Permanently delete your account and all of your data. This
                  action cannot be undone.
                </Text>

                <TouchableOpacity
                  style={styles.deleteZoneButton}
                  activeOpacity={0.8}
                  onPress={() => setIsDeleteModalVisible(true)}
                >
                  <Feather
                    name="trash-2"
                    size={16}
                    color="#EB5757"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.deleteZoneButtonText}>
                    Delete Account
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </AppBackground>

      <Modal
        visible={isDeleteModalVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => {
          setIsDeleteModalVisible(false);
          setDeleteConfirmationText("");
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.alertIconBox}>
              <Feather name="alert-triangle" size={28} color="#EB5757" />
            </View>

            <Text style={styles.modalHeaderTitle}>Delete Account?</Text>
            <Text style={styles.modalDescription}>
              This will permanently delete your profile, transactions, and
              settings. Please type{" "}
              <Text style={styles.boldMatchText}>DELETE</Text> to confirm.
            </Text>

            <View style={styles.modalInputBox}>
              <TextInput
                style={styles.modalTextInput}
                placeholder="Type DELETE"
                placeholderTextColor="rgba(255,255,255,0.2)"
                autoCapitalize="characters"
                value={deleteConfirmationText}
                onChangeText={setDeleteConfirmationText}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                activeOpacity={0.7}
                onPress={() => {
                  setIsDeleteModalVisible(false);
                  setDeleteConfirmationText("");
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.confirmDeleteButton,
                  deleteConfirmationText !== "DELETE" &&
                    styles.disabledDeleteButton,
                ]}
                activeOpacity={0.8}
                disabled={deleteConfirmationText !== "DELETE" || deleteLoading}
                onPress={handleDeleteAccount}
              >
                {deleteLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.confirmDeleteButtonText}>Delete</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 40 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.03)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  headerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },

  sectionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 20,
  },

  inputWrapper: { marginBottom: 16 },
  inputLabel: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF33",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  textInput: { flex: 1, color: "#FFFFFF", fontSize: 14, fontWeight: "500" },

  submitButton: {
    width: "100%",
    height: 48,
    backgroundColor: "#2F80ED",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },

  dangerDescription: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
    marginBottom: 20,
  },
  deleteZoneButton: {
    width: "100%",
    height: 48,
    backgroundColor: "rgba(235, 87, 87, 0.1)",
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(235, 87, 87, 0.2)",
  },
  deleteZoneButtonText: { color: "#EB5757", fontSize: 14, fontWeight: "700" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#121F38",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  alertIconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "rgba(235, 87, 87, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  modalHeaderTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  modalDescription: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 20,
  },
  boldMatchText: { color: "#EB5757", fontWeight: "700" },
  modalInputBox: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginBottom: 20,
  },
  modalTextInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 1,
  },
  modalActions: { flexDirection: "row", gap: 12 },
  cancelButton: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.04)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  cancelButtonText: { color: "#D1D5DB", fontSize: 14, fontWeight: "600" },
  confirmDeleteButton: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#EB5757",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledDeleteButton: { opacity: 0.4 },
  confirmDeleteButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
