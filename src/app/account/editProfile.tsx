import AppBackground from "@/components/AppBackground";
import BackBtn from "@/components/BackBtn";
import ProtectedRoute from "@/components/ProtectedRoute";
import { commonStyles } from "@/constants/style";
import {
  useGetUserByIdQuery,
  useUpdateUserProfileMutation,
} from "@/redux/features/userApi";
import { useAppSelector } from "@/redux/hooks";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
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

export default function EditProfile() {
  const router = useRouter();
  const { loggedUser } = useAppSelector((state) => state.auth);
  const id = loggedUser?._id;
  const { data, isLoading: userLoading } = useGetUserByIdQuery(id, {
    skip: !id,
  });
  const user = data?.data;

  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other" | "">("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (user) {
      setName(user?.name || "");
      setPhone(user?.phone || "");
      setGender(user?.gender || "");
    }
  }, [user]);

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      Alert.alert("Validation Error", "Please enter your name.");
      return;
    }

    try {
      const id = loggedUser?._id;
      if (!id) return;

      const data = {
        name: name.trim(),
        gender,
        phone: phone.trim(),
      };

      const res = await updateUserProfile({
        id,
        data,
      }).unwrap();
      if (res?.success) {
        Toast.show({
          type: "success",
          text2: "profile updated successfully!",
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
        });

        router.back();
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

  if (userLoading) {
    return (
      <View style={commonStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#2F80ED" />
      </View>
    );
  }

  return (
    <ProtectedRoute>
      <AppBackground>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <View style={styles.header}>
              <BackBtn />
              <Text style={styles.headerTitle}>Edit Profile</Text>
              <View style={{ width: 40 }} />
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}
            >
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <View style={styles.inputBox}>
                  <Feather
                    name="user"
                    size={18}
                    color="rgba(255,255,255,0.3)"
                    style={{ marginRight: 12 }}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your name"
                    placeholderTextColor="rgba(255,255,255,0.3)"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={styles.inputBox}>
                  <Feather
                    name="phone"
                    size={18}
                    color="rgba(255,255,255,0.3)"
                    style={{ marginRight: 12 }}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter phone number"
                    placeholderTextColor="rgba(255,255,255,0.3)"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Gender</Text>
                <View style={styles.genderContainer}>
                  {(["male", "female"] as const).map((item) => {
                    const isSelected = gender === item;
                    return (
                      <TouchableOpacity
                        key={item}
                        style={[
                          styles.genderButton,
                          isSelected && styles.activeGenderButton,
                        ]}
                        activeOpacity={0.7}
                        onPress={() => setGender(item)}
                      >
                        <Text
                          style={[
                            styles.genderText,
                            isSelected && styles.activeGenderText,
                          ]}
                        >
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                activeOpacity={0.8}
                onPress={handleUpdateProfile}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitButtonText}>Save Changes</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </AppBackground>
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

  avatarSection: { alignItems: "center", marginVertical: 24 },
  avatarWrapper: { width: 88, height: 88, position: "relative" },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#2F80ED",
  },
  fallbackAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.04)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2F80ED",
    width: 28,
    height: 28,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#121F38",
  },

  inputWrapper: { marginBottom: 20 },
  inputLabel: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF33",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  textInput: { flex: 1, color: "#FFFFFF", fontSize: 15, fontWeight: "500" },

  genderContainer: { flexDirection: "row", gap: 10 },
  genderButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.02)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  activeGenderButton: {
    backgroundColor: "rgba(47, 128, 237, 0.15)",
    borderColor: "#2F80ED",
  },
  genderText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 14,
    fontWeight: "600",
  },
  activeGenderText: { color: "#2F80ED" },

  submitButton: {
    width: "100%",
    height: 54,
    backgroundColor: "#2F80ED",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  submitButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
