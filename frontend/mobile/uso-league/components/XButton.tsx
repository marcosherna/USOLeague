import React, { ReactNode, useCallback, useMemo } from "react";
import {
  Pressable,
  Text,
  ViewStyle,
  StyleSheet,
  TextStyle,
} from "react-native";
import { useTheme } from "../hooks/useTheme";
import { Theme } from "../theme";

type ButtonVariant = "contained" | "outlined" | "ghost";
type RoundedButton = "md" | "lg";

const RoundedValues: Record<RoundedButton, number> = {
  md: 8,
  lg: 9999,
};

interface XButtonProps {
  title?: string;
  variant?: ButtonVariant;
  width?: string | number;
  rounded?: RoundedButton;
  onPress: () => void;
  icon?: (color: string, size: number) => ReactNode;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
}

/* --- Helpers para estilo --- */

const generateVariant = (
  variant: ButtonVariant,
  rounded: RoundedButton,
  theme: Theme
): ViewStyle => {
  const base: ViewStyle = {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.md,
    borderRadius: RoundedValues[rounded],
    padding: theme.spacing.md,
    flexDirection: "row",
  };

  switch (variant) {
    case "contained":
      return {
        ...base,
        backgroundColor: theme.colors.primary,
        borderWidth: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
      };
    case "outlined":
      return { ...base, paddingVertical: theme.spacing.md - 2 };
    case "ghost":
      return {
        ...base,
        borderWidth: 0,
        backgroundColor: `${theme.colors.primary}33`,
      };
    default:
      return base;
  }
};

const generateVariantIcon = (variant: ButtonVariant, theme: Theme) => {
  const style = {
    color: theme.colors.primary,
    size: theme.typography.body.fontSize,
  };

  if (variant === "contained") {
    style.color = theme.colors.onPrimary;
  }

  return style;
};

const generateStylePress = (
  pressed: boolean,
  variant: ButtonVariant,
  theme: Theme
): ViewStyle => {
  if (!pressed) return {};
  const base: ViewStyle = {
    transform: [{ scale: 0.98 }],
  };
  if (variant === "ghost") {
    return { ...base, backgroundColor: `${theme.colors.primary}60` };
  }
  return { ...base, backgroundColor: `${theme.colors.primary}33` };
};

/* --- Componente principal --- */

export default function XButton({
  onPress,
  title,
  variant = "contained",
  width = "auto",
  rounded = "md",
  icon,
  disabled = false,
  loading = false,
  style,
  textStyle,
  accessibilityLabel,
}: XButtonProps) {
  const { theme } = useTheme();

  // Memoizar estilos base
  const iconStyle = useMemo(
    () => generateVariantIcon(variant, theme),
    [variant, theme]
  );
  const baseStyle = useMemo(
    () => generateVariant(variant, rounded, theme),
    [variant, rounded, theme]
  );

  const _icon = icon?.(iconStyle.color, iconStyle.size);
  const isIconOnly = !!_icon && !title;

  const sizeStyle = useMemo<ViewStyle>(
    () =>
      isIconOnly
        ? {
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.md,
            alignSelf: "flex-start",
          }
        : ({ width: width === "auto" ? undefined : width } as ViewStyle),
    [isIconOnly, width, theme]
  );

  const textComputedStyle = useMemo<TextStyle>(
    () => ({
      color: iconStyle.color,
      fontSize: theme.typography.body.fontSize,
      fontWeight: theme.typography.body.fontWeight as TextStyle["fontWeight"],
      fontFamily: theme.typography.fontFamily,
      textAlign: "center",
    }),
    [
      iconStyle.color,
      theme.typography.body.fontSize,
      theme.typography.body.fontWeight,
      theme.typography.fontFamily,
    ]
  );

  const handlePress = useCallback(() => {
    if (!disabled && !loading) onPress();
  }, [onPress, disabled, loading]);

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={handlePress}
      style={({ pressed }) => [
        baseStyle,
        generateStylePress(pressed, variant, theme),
        sizeStyle,
        disabled && { opacity: 0.6 },
        style,
      ]}
    >
      {_icon}
      {title && (
        <Text style={[styles.textBase, textComputedStyle, textStyle]}>
          {loading ? "..." : title}
        </Text>
      )}
    </Pressable>
  );
}

/* --- Estilos estáticos --- */

const styles = StyleSheet.create({
  textBase: {
    textAlign: "center",
  },
});
