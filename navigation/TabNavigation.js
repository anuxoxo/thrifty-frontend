import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../components/home/HomeScreen";
import SellScreen from "../components/sell/SellScreen";
import SettingsScreen from "../components/settings/SettingsScreen";
import ThriftyLogo from "../assets/icons/ThriftyLogo.js";
import { TouchableOpacity, View } from "react-native";
import { Foundation, Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        presentation: "modal",
        headerTitleAlign: "center",
        tabBarIcon: ({ focused }) => {
          if (route.name === "Home") {
            return <Foundation name="home" size={24} color="black" />;
          } else if (route.name === "Sell") {
            return <Ionicons name="add-circle" size={24} color="black" />;
          } else if (route.name === "Settings") {
            return <Ionicons name="settings" size={24} color="black" />;
          }
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />
      <Tab.Screen
        name="Sell"
        component={SellScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}

function LogoTitle() {
  return <ThriftyLogo width={60} height={20} />;
}
