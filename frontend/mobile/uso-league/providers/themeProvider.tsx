import React from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme, Theme } from "../theme";
import { ThemeContext, ThemeMode } from "../contexts/themeContext";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = React.useState<ThemeMode>("system");
  const [theme, setTheme] = React.useState<Theme>(lightTheme);

  const applyTheme = async (newMode: ThemeMode) => {
    setModeState(newMode);
    const isDark =
      newMode === "dark" || (newMode === "system" && systemScheme === "dark");

    setTheme(isDark ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode: applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
