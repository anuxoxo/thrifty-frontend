import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../components/home/HomeScreen";
import SellScreen from "../components/sell/SellScreen";
import ThriftyLogo from "../assets/icons/ThriftyLogo.js";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Foundation, Ionicons, Entypo, FontAwesome5 } from "@expo/vector-icons";
import OrdersScreen from "../components/user/OrdersScreen";
import { Picker } from "@react-native-picker/picker";
import { Authcontext } from "../store/authContext";

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
          } else if (route.name === "Orders") {
            return <Entypo name="box" size={24} color="black" />;
          }
        },
        tabBarActiveTintColor: "#1E1E1E",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => <UserMenu />,
        }}
      />
      <Tab.Screen
        name="Sell"
        component={SellScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => <UserMenu />,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => <UserMenu />,
        }}
      />
    </Tab.Navigator>
  );
}

function LogoTitle() {
  return <ThriftyLogo width={60} height={20} />;
}

const UserMenu = () => {
  const pickerRef = React.useRef();
  const { logout } = React.useContext(Authcontext);

  function openDropeDown() {
    pickerRef.current.focus();
  }
  return (
    <TouchableOpacity onPress={openDropeDown} style={styles.user}>
      <FontAwesome5 name="user-circle" size={24} color="#1E1E1E" />
      <Picker
        mode="dropdown"
        ref={pickerRef}
        style={{
          opacity: 0,
        }}
        onValueChange={(itemValue, itemIndex) => {
          itemValue == "logout" && logout();
        }}
      >
        <Picker.Item label="My Profile" value="profile" />
        <Picker.Item label="Logout" value="logout" onPress={logout} />
      </Picker>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  user: {
    marginRight: 10,
    marginTop: 25,
    flexDirection: "row",
  },
});
