import AppBackground from "@/components/AppBackground";
import ProtectedRoute from "@/components/ProtectedRoute";
import { commonStyles } from "@/constants/style";
import { AVAILABLE_ICONS } from "@/data/categories";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "@/redux/features/categoryApi";
import { renderIcon } from "@/utils/renderIcon";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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

export default function EditCategory() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data, isLoading } = useGetCategoryByIdQuery(id, { skip: !id });
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const category = data?.data || {};

  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<{
    family: string;
    name: string;
    color: string;
  } | null>(null);

  useEffect(() => {
    if (category && Object.keys(category).length > 0) {
      setName(category.name || "");
      if (category.icon) {
        setSelectedIcon({
          family: category.icon.family,
          name: category.icon.name,
          color: category.icon.color,
        });
      }
    }
  }, [category]);

  const handleUpdate = async () => {
    if (!name.trim()) {
      Alert.alert("Validation Error", "Please enter a category name.");
      return;
    }
    if (!selectedIcon) {
      Alert.alert("Validation Error", "Please select an icon.");
      return;
    }

    try {
      const updatedBody = {
        name: name.trim(),
        icon: selectedIcon,
      };

      await updateCategory({ id, data: updatedBody }).unwrap();
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update category.");
    }
  };

  if (isLoading) {
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
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <Feather name="arrow-left" size={22} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Edit Category</Text>
              <View style={{ width: 40 }} />
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}
            >
              <View style={styles.previewSection}>
                <View
                  style={[
                    styles.previewIconBox,
                    {
                      backgroundColor: selectedIcon
                        ? `${selectedIcon.color}15`
                        : "rgba(255,255,255,0.03)",
                    },
                  ]}
                >
                  {selectedIcon ? (
                    renderIcon({
                      family: selectedIcon.family,
                      name: selectedIcon.name,
                      size: 32,
                      color: selectedIcon.color,
                    })
                  ) : (
                    <Feather
                      name="help-circle"
                      size={32}
                      color="rgba(255,255,255,0.2)"
                    />
                  )}
                </View>
                <Text style={styles.previewText}>
                  {name.trim() || "Category Name"}
                </Text>
              </View>

              <View>
                <Text style={styles.inputLabel}>Category Name</Text>
                <View style={styles.inputBox}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter category name"
                    placeholderTextColor="rgba(255,255,255,0.3)"
                    value={name}
                    onChangeText={setName}
                    maxLength={20}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                activeOpacity={0.8}
                onPress={handleUpdate}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitButtonText}>Save Changes</Text>
                )}
              </TouchableOpacity>

              <View style={{ marginTop: 20 }}>
                <Text style={styles.inputLabel}>Select Icon</Text>
                <View style={styles.gridContainer}>
                  {AVAILABLE_ICONS?.map((item) => {
                    const isSelected =
                      selectedIcon?.name === item.name &&
                      selectedIcon?.family === item.family;
                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles.gridItem,
                          isSelected && {
                            backgroundColor: `${item.color}20`,
                            borderColor: item.color,
                          },
                        ]}
                        activeOpacity={0.7}
                        onPress={() =>
                          setSelectedIcon({
                            family: item.family,
                            name: item.name,
                            color: item.color,
                          })
                        }
                      >
                        {renderIcon({
                          family: item.family,
                          name: item.name,
                          size: 22,
                          color: item.color,
                        })}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
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

  previewSection: { alignItems: "center", marginVertical: 24 },
  previewIconBox: {
    width: 74,
    height: 74,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    marginBottom: 12,
  },
  previewText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },

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
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  textInput: { flex: 1, color: "#FFFFFF", fontSize: 15, fontWeight: "500" },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: "-1.5%",
  },
  gridItem: {
    width: "22%",
    marginHorizontal: "1.5%",
    aspectRatio: 1,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },

  submitButton: {
    width: "100%",
    height: 54,
    backgroundColor: "#2F80ED",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
