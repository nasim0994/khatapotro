import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";

export type IconFamily =
  | "MaterialCommunityIcons"
  | "Feather"
  | "FontAwesome5"
  | "FontAwesome"
  | "Ionicons"
  | "Entypo"
  | "Octicons";

interface RenderIconProps {
  family: IconFamily | string;
  name: string;
  size?: number;
  color?: string;
}

export const renderIcon = ({
  family,
  name,
  size = 24,
  color = "#FFFFFF",
}: RenderIconProps) => {
  switch (family) {
    case "MaterialCommunityIcons":
      return (
        <MaterialCommunityIcons name={name as any} size={size} color={color} />
      );
    case "Feather":
      return <Feather name={name as any} size={size} color={color} />;
    case "FontAwesome5":
      return <FontAwesome5 name={name as any} size={size} color={color} />;
    case "FontAwesome":
      return <FontAwesome name={name as any} size={size} color={color} />;
    case "Ionicons":
      return <Ionicons name={name as any} size={size} color={color} />;
    case "Entypo":
      return <Entypo name={name as any} size={size} color={color} />;
    case "Octicons":
      return <Octicons name={name as any} size={size} color={color} />;
    default:
      return <Feather name="help-circle" size={size} color={color} />;
  }
};
