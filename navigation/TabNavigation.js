import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../components/home/HomeScreen";
import SellScreen from "../components/sell/SellScreen";
import SettingsScreen from "../components/settings/SettingsScreen";
import ThriftyLogo from "../assets/icons/ThriftyLogo.js";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerTitleAlign: "center" }}>
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
