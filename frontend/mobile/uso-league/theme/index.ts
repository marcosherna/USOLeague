import { lightColors, darkColors } from "./colors";
import { typography } from "./typography";
import { spacing } from "./spacing";

export type Theme = {
  colors: typeof lightColors;
  typography: typeof typography;
  spacing: typeof spacing;
  isDark: boolean;
};

export const lightTheme: Theme = {
  colors: lightColors,
  typography,
  spacing,
  isDark: false,
};

export const darkTheme: Theme = {
  colors: darkColors,
  typography,
  spacing,
  isDark: true,
};
