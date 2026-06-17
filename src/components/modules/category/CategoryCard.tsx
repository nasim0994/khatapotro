import { TCategory } from "@/types/categoryTypes";
import { renderIcon } from "@/utils/renderIcon";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CategoryActionModal from "./CategoryActionModal";

interface CategoryCardProps {
  category: TCategory;
  handleCategoryPress?: (category: TCategory) => void;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function CategoryCard({
  category,
  handleCategoryPress,
  setSelectedCategory,
}: CategoryCardProps) {
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);

  const handleCategoryLongPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsActionModalVisible(true);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleCategoryPress && handleCategoryPress(category)}
        activeOpacity={0.85}
        onLongPress={() => handleCategoryLongPress(category?._id)}
        delayLongPress={350}
      >
        <View style={styles.iconContainer}>
          {renderIcon({
            family: category?.icon?.family,
            name: category?.icon?.name,
            size: 20,
            color: category?.icon?.color,
          })}
        </View>
        <Text style={styles.categoryName} numberOfLines={1}>
          {category?.name}
        </Text>
      </TouchableOpacity>

      <CategoryActionModal
        category={category}
        isActionModalVisible={isActionModalVisible}
        setIsActionModalVisible={setIsActionModalVisible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "22.5%",
    marginHorizontal: "1.25%",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  categoryName: {
    color: "#D1D5DB",
    fontSize: 10,
    fontFamily: "Poppins-Medium",
    textAlign: "center",
    paddingHorizontal: 2,
  },
});
