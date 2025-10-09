import React from "react";
import { lightTheme, Theme } from "../theme";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = React.createContext<ThemeContextType>({
  theme: lightTheme,
  mode: "system",
  setMode: () => {},
});

export { ThemeContext, ThemeMode };
