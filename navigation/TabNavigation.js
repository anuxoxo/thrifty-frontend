import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../components/home/HomeScreen";
import SellScreen from "../components/sell/SellScreen";
import ThriftyLogo from "../assets/icons/ThriftyLogo.js";
import { StyleSheet, TouchableOpacity, View, FlatList, Text, Modal, Image } from "react-native";
import { Foundation, Ionicons, Entypo, FontAwesome5 } from "@expo/vector-icons";
import OrdersScreen from "../components/user/OrdersScreen";
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
  const { user, logout } = React.useContext(Authcontext);

  //hooks
  const DropdownButton = React.useRef();
  const [dropdownTop, setDropdownTop] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const [selected, setSelected] = React.useState(undefined);

  // Dropdown List Data
  const data = [
    { id: 1, label: 'My profile', color: "#0E0E0E" },
    { id: 2, label: 'Logout', color: "#FF0E0E", functionCall: logout },
  ];

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    DropdownButton?.current?.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  const onItemPress = (item) => {
    setSelected(item);
    item?.functionCall();
    setVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text style={{ color: item?.color }}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdown, { top: dropdownTop, right: 0 }]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  return (
    <TouchableOpacity onPress={openDropdown} style={styles.user} ref={DropdownButton}>
      {renderDropdown()}
      {user?.picture
        ? <Image style={{ width: 26, aspectRatio: 1 }} source={{ uri: user?.picture }} />
        : <FontAwesome5 name="user-circle" size={24} color="#1E1E1E" />
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  user: {
    marginRight: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: 200,
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    borderRadius: 8.5,
    right: 0
  },
  overlay: {
    width: 200,
    height: '100%',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    display: "flex",
    justifyContent: "flex-end"
  },
});
