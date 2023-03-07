import React from "react";
import { Button, Settings, View } from "react-native";
import HomeScreen from "../components/home/HomeScreen";
import SellScreen from "../components/sell/SellScreen";
import { Entypo, Ionicons } from "@expo/vector-icons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "../components/settings/SettingsScreen";

import TabNavigation from "./TabNavigation";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Main" component={TabNavigation} />
    </Stack.Navigator>
  );
}