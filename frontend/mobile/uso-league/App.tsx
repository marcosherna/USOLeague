import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  DefaultTheme,
  DarkTheme,
  Theme as NavigationTheme,
} from "@react-navigation/native";
import { StatusBar } from "react-native";

import LoginScreen from "./screens/LoginScreen";
import TabNavigator from "./navigations/TabNavigator";
import { RootStackParamList } from "./navigations";

import { ThemeProvider } from "./providers/themeProvider";
import { useTheme } from "./hooks/useTheme";

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppContext() {
  const { theme } = useTheme();

  const navTheme: NavigationTheme = {
    dark: theme.isDark,
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.outline,
      notification: theme.colors.accent,
    },
    fonts: theme.isDark ? DarkTheme.fonts : DefaultTheme.fonts,
  };

  return (
    <>
      <StatusBar
        animated
        barStyle={theme.isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.surface}
      />

      <NavigationContainer theme={navTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="main-app" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContext />
    </ThemeProvider>
  );
}
