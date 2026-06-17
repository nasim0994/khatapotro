import { useGetAllCategoryQuery } from "@/redux/features/categoryApi";
import { useAppSelector } from "@/redux/hooks";
import { TCategory } from "@/types/categoryTypes";
import { renderIcon } from "@/utils/renderIcon";
import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CategorySliderProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export default function CategorySlider({
  selectedCategory,
  setSelectedCategory,
}: CategorySliderProps) {
  const isAllSelected = selectedCategory === null;
  const { loggedUser } = useAppSelector((state) => state.auth);
  const { data } = useGetAllCategoryQuery({ user: loggedUser?._id });
  const categories = data?.data || [];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setSelectedCategory(null)}
          style={styles.touchableWrapper}
        >
          <LinearGradient
            colors={
              isAllSelected
                ? ["#2F80ED", "#0056C6"]
                : ["rgba(255, 255, 255, 0.04)", "rgba(255, 255, 255, 0.02)"]
            }
            style={[
              styles.sliderItem,
              !isAllSelected && styles.unselectedBorder,
            ]}
          >
            <View style={styles.iconWrapper}>
              {renderIcon({
                family: "Feather",
                name: "grid",
                size: 15,
                color: isAllSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.5)",
              })}
            </View>
            <Text
              style={[
                styles.categoryName,
                {
                  color: isAllSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                },
              ]}
            >
              All
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {categories?.map((category: TCategory) => {
          const isSelected = selectedCategory === category?._id;

          return (
            <TouchableOpacity
              key={category._id}
              activeOpacity={0.7}
              onPress={() => setSelectedCategory(category?._id)}
              style={styles.touchableWrapper}
            >
              <LinearGradient
                colors={
                  isSelected
                    ? ["#2F80ED", "#0056C6"]
                    : ["rgba(255, 255, 255, 0.04)", "rgba(255, 255, 255, 0.02)"]
                }
                style={[
                  styles.sliderItem,
                  !isSelected && styles.unselectedBorder,
                ]}
              >
                <View style={styles.iconWrapper}>
                  {renderIcon({
                    family: category.icon?.family,
                    name: category.icon?.name,
                    size: 15,
                    color: isSelected
                      ? "#FFFFFF"
                      : category.icon?.color || "rgba(255, 255, 255, 0.5)",
                  })}
                </View>

                <Text
                  style={[
                    styles.categoryName,
                    {
                      color: isSelected
                        ? "#FFFFFF"
                        : "rgba(255, 255, 255, 0.75)",
                    },
                  ]}
                >
                  {category.name}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 4,
  },
  scrollContainer: {
    paddingHorizontal: 4,
    alignItems: "center",
    gap: 8,
  },
  touchableWrapper: {
    borderRadius: 99,
    overflow: "hidden",
  },
  sliderItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 99,
  },
  unselectedBorder: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  iconWrapper: {
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryName: {
    fontSize: 13,
    letterSpacing: 0.2,
    fontFamily: "Poppins-SemiBold",
  },
});
