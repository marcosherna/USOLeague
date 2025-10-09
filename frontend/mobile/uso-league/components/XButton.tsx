import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { useTheme } from "../hooks/useTheme";

type ButtonVariant = "contained" | "outlined" | "icon";
type ButtonCountor = "rounded" | "circular";

interface XButtonProps {
  title?: string;
  variant?: ButtonVariant;
  width?: string | number;
  onPress: () => void;
  icon?: ReactNode;
  countor?: ButtonCountor;
}

export default function XButton({
  onPress,
  title,
  variant = "contained",
  width = "auto",
  countor = "rounded",
  icon,
}: XButtonProps) {
  const { theme } = useTheme();
  const isIcon = variant === "icon";
  const isCircular = countor === "circular";

  return (
    <Pressable
      style={({ pressed }) => {
        // Estilos base según el tipo de botón
        const baseStyle: ViewStyle = isIcon
          ? {
              backgroundColor: "transparent",
              borderWidth: 2,
              borderColor: theme.colors.primary,
            }
          : variant === "contained"
          ? {
              backgroundColor: theme.colors.primary,
              padding: theme.spacing.md,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 3,
            }
          : {
              backgroundColor: "transparent",
              padding: theme.spacing.md,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 2,
              borderColor: theme.colors.primary,
            };
 
        const pressedStyle: ViewStyle = pressed
          ? isIcon
            ? { backgroundColor: `${theme.colors.primary}33`, transform: [{ scale: 0.98 }] }
            : variant === "contained"
            ? { backgroundColor: theme.colors.onPrimary, transform: [{ scale: 0.98 }] }
            : { backgroundColor: `${theme.colors.primary}22`, transform: [{ scale: 0.98 }] }
          : {};

        // Tamaño de icono
        const sizeStyle = isIcon
          ? { width: 48, height: 48, padding: 0, borderRadius: isCircular ? 24 : 8 }
          : { width };

        return { ...baseStyle, ...pressedStyle, ...sizeStyle } as ViewStyle;
      }}
      onPress={onPress}
    >
      {isIcon && icon ? (
        icon
      ) : (
        <Text
          style={{
            color:
              variant === "contained"
                ? theme.colors.onPrimary
                : theme.colors.primary,
            fontSize: theme.typography.body.fontSize,
            fontWeight: theme.typography.body.fontWeight as any,
            fontFamily: theme.typography.fontFamily,
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
