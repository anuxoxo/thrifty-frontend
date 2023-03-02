import React from "react";
import { View } from "react-native";
import HomeScreen from "../components/home/HomeScreen";
import SellScreen from "../components/sell/SellScreen";
import { Entypo, Ionicons } from "@expo/vector-icons";

// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AuthenticatedStack() {
  return (
    <>
      {/* <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Thrifty" }}
        />
        <Stack.Screen name="Sell" component={SellScreen} />
      </Stack.Navigator> */}

      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Sell" component={SellScreen} />
      </Tab.Navigator>

      {/* <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
        }}
        initialRouteName="Home"
        activeColor="#ffffff"
        inactiveColor="#000000"
        barStyle={{
          backgroundColor: "#724CF9",
          width: "100%",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={24} color="white" />
            ),
          }}
        />
        <Tab.Screen
          name="Sell"
          component={SellScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add" size={24} color="white" />
            ),
          }}
        />
      </Tab.Navigator> */}
    </>
  );
}
