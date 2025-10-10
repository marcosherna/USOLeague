import React, { useCallback, useMemo, useState } from "react";
import {
  Pressable,
  TextInput,
  View,
  Text,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from "react-native";
import { Eye, EyeClosed } from "lucide-react-native";

import { useTheme } from "../hooks/useTheme";
import { iconography } from "../theme/iconography";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import { useInput } from "../hooks/useInput";

type BorderRadius = "md" | "lg";
const BorderRadiusValues: Record<BorderRadius, number> = {
  md: 8,
  lg: 9999,
};

type KeyboardTypes = TextInput["props"]["keyboardType"];

interface XInputProps {
  input: ReturnType<typeof useInput>;
  rounded?: BorderRadius;
  placeholder?: string;
  password?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  errorStyle?: TextStyle;
  accessibilityLabel?: string;
  keyboardType?: KeyboardTypes;
}

export default function XInput({
  input,
  rounded = "md",
  placeholder,
  password = false,
  style,
  inputStyle,
  errorStyle,
  accessibilityLabel,
  keyboardType = "default",
}: XInputProps) {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [auxPassword, setAuxPassword] = useState("");

  /* Callbacks memorizados */
  const handleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleOnChangeText = useCallback(
  
    (value: string) => {
      // TODO: revisar
      if (password) {
        setAuxPassword((p) => p + value.at(-1));
        console.log(auxPassword);
        input?.onChangeText?.("*".repeat(value.length));
      } else {
        input?.onChangeText?.(value);
      }
    },
    [input, password]
  );

  /* Estilos memorizados */
  const containerStyle = useMemo<ViewStyle>(
    () => ({
      borderWidth: 2,
      backgroundColor: theme.colors.surface,
      borderColor: !input.error ? theme.colors.outline : "red",
      borderRadius: BorderRadiusValues[rounded],
      flexDirection: "row",
      alignItems: "center",
    }),
    [theme, input.error, rounded]
  );

  const textInputStyle = useMemo<TextStyle>(
    () => ({
      flex: 1,
      padding: spacing.md - 1,
      color: theme.colors.text,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.body.fontSize,
    }),
    [theme]
  );

  const errorTextStyle = useMemo<TextStyle>(
    () => ({
      fontSize: typography.small.fontSize,
      paddingLeft: spacing.sm,
      paddingTop: 3,
      color: "red",
    }),
    [theme]
  );

  const iconColor = theme.colors.secondaryText;

  /* Render */
  return (
    <View style={style}>
      <View
        style={[containerStyle, style]}
        accessibilityLabel={accessibilityLabel || placeholder}
        accessibilityRole="text"
      >
        <TextInput
          value={input.value}
          onChangeText={handleOnChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.secondaryText}
          // secureTextEntry={password && !showPassword}
          style={[styles.textInput, textInputStyle, inputStyle]}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={keyboardType}
          onBlur={input.onBlur}
        />

        {password && (
          <Pressable
            style={styles.iconContainer}
            onPress={handleShowPassword}
            accessibilityRole="button"
            accessibilityLabel={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? (
              <EyeClosed color={iconColor} size={iconography.md} />
            ) : (
              <Eye color={iconColor} size={iconography.md} />
            )}
          </Pressable>
        )}
      </View>

      {input.error ? (
        <Text style={[styles.errorText, errorTextStyle, errorStyle]}>
          {input.error}
        </Text>
      ) : null}
    </View>
  );
}

/* Estilos base con StyleSheet.create */
const styles = StyleSheet.create({
  textInput: {
    minHeight: 40,
  },
  iconContainer: {
    paddingHorizontal: spacing.sm,
    justifyContent: "center",
  },
  errorText: {
    textAlign: "left",
  },
});
