import { View, Text } from "react-native";

import XButton from "../components/XButton";
import { useTheme } from "../hooks/useTheme";

export default function HomeScreen() {
  const { theme, setMode } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: theme.colors.background,
        gap: 10,
      }}
    >
      <Text
        style={{
          color: theme.colors.text,
          fontSize: theme.typography.h2.fontSize,
        }}
      >
        {theme.isDark ? "Dark": "light" }
      </Text>

      <XButton title="Dark" onPress={() => setMode("dark")} />
      <XButton title="System" onPress={() => setMode("system")} />
      <XButton title="light" onPress={() => setMode("light")} />
    </View>
  );
}
