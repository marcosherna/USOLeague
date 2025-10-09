import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  login: undefined;
  "main-app": undefined;
};

export type TabParamList = {
  Home: undefined;
  Tournaments: undefined;
  teams: undefined;
  Community: undefined;
  Profile: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "login"
>;
export type MainAppScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "main-app"
>;
