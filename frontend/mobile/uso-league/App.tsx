import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "./screens/LoginScreen";
import TabNavigator from "./navigations/TabNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="main-app" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
