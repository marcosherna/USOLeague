import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Trophy, User, Coffee, CirclePlus } from "lucide-react-native";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TournamentsScreen from "../screens/TournamentsScreen";
import TeamsScreen from "../screens/TeamsScreen";
import CommunityScreen from "../screens/CommunityScreen";

import { useTheme } from "../hooks/useTheme";
import { TabParamList } from ".";

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondaryText,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Tournaments"
        component={TournamentsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Trophy color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="teams"
        component={TeamsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <CirclePlus color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Coffee color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
