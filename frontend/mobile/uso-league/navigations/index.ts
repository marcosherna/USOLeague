import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  login: undefined;
  "main-app": undefined;
};

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "login"
>;
export type MainAppScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "main-app"
>;
