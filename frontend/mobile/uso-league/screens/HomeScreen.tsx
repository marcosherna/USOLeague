import { View, Text } from "react-native";
import { Home } from "lucide-react-native";

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
        padding: theme.spacing.md,
        gap: 10,
      }}
    >
      <Text
        style={{
          color: theme.colors.text,
          fontSize: theme.typography.h2.fontSize,
        }}
      >
        {theme.isDark ? "Dark" : "light"}
      </Text>

      <XButton
        title="Dark"
        variant="outlined" 
        onPress={() => setMode("dark")}
      />
      <XButton title="System" onPress={() => setMode("system")} />
      <XButton title="light" onPress={() => setMode("light")} />

      <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
        <XButton   
          variant="outlined" 
          rounded="lg"
          icon={(color, size) => <Home color={color} size={size} />}
          onPress={() => {}}
        />

        <XButton 
          rounded="md"
          title="esta es una prueba"
          variant="ghost"
          icon={(color, size) => <Home color={color} size={size} style={{ margin: 0, padding: 0}} />} 
          onPress={() => {}}
        />

        <XButton 
          rounded="lg" 
          variant="ghost"
          icon={(color, size) => <Home color={color} size={size} />} 
          onPress={() => {}}
        />
      </View>
    </View>
  );
}
