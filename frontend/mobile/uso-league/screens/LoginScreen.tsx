import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigations/navigations";

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSignIn = () => {
    // TODO: navigate with replace function
    navigation.navigate("main-app");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>this is screen for login </Text>
        <Button title="Sign In" onPress={() => handleSignIn()} />
      </View>
    </SafeAreaView>
  );
}
