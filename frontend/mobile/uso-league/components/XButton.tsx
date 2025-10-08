import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

type ButtonVariant = "contained" | "outlined" | "icon";
type ButtonCountor = "rounded" | "circular";

interface XButtonProps {
  title?: string;
  variant?: ButtonVariant;
  width?: string | number; // opcional para contenido normal
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
  const isIcon = variant === "icon";
  const isCircular = countor === "circular";

  return (
    <Pressable
      style={({ pressed }) => {
        const baseStyle = isIcon
          ? styles.buttonIcon
          : variant === "contained"
          ? styles.buttonContained
          : styles.buttonOutlined;
        const pressedStyle = pressed
          ? isIcon
            ? styles.buttonOutlinedPressed
            : variant === "contained"
            ? styles.buttonContainedPressed
            : styles.buttonOutlinedPressed
          : {};

        const sizeStyle = isIcon
          ? {
              width: 48,
              height: 48,
              padding: 0,
              borderRadius: isCircular ? 24 : 8,
            }
          : { width };

        return {
          ...baseStyle,
          ...pressedStyle,
          ...sizeStyle,
          justifyContent: "center",
          alignItems: "center",
        } as ViewStyle;
      }}
      onPress={onPress}
    >
      {isIcon && icon ? (
        icon
      ) : (
        <Text
          style={[
            styles.baseText,
            (variant === "outlined" || isIcon) && styles.outlinedText,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  buttonContained: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonContainedPressed: {
    backgroundColor: "#1976D2",
    transform: [{ scale: 0.98 }],
  },
  buttonOutlined: {
    backgroundColor: "transparent",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#2196F3",
  },
  buttonOutlinedPressed: {
    backgroundColor: "rgba(33, 150, 243, 0.1)",
    transform: [{ scale: 0.98 }],
  },
  buttonIcon: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#2196F3",
  },
  outlinedText: {
    color: "#2196F3",
  },
});
