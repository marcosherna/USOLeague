import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "../navigations/navigations";
import XButton from "../components/XButton";

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
          paddingHorizontal: 20,
          paddingBottom: 40,
          justifyContent: "flex-end",
        }}
      >
        <View style={{ gap: 10, flexDirection: "column" }}>
          <XButton title="Register" variant="outlined" onPress={handleSignIn} />
          <XButton title="Sign in" onPress={handleSignIn} />
          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
          >
            <XButton
              variant="icon"
              icon={
                <View>
                  <Text>G</Text>
                </View>
              }
              countor="circular"
              onPress={handleSignIn}
            />

            <XButton
              variant="icon"
              icon={
                <View>
                  <Text>M</Text>
                </View>
              }
              countor="circular" 
              onPress={handleSignIn}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
