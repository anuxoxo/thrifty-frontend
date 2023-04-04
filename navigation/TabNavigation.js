import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../components/home/HomeScreen";
import SellScreen from "../components/sell/SellScreen";
import ThriftyLogo from "../assets/icons/ThriftyLogo.js";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Modal,
  Image,
  Pressable,
} from "react-native";
import { Foundation, Ionicons, Entypo, FontAwesome5 } from "@expo/vector-icons";
import OrdersScreen from "../components/user/OrdersScreen";
import { Authcontext } from "../store/authContext";
import SubText from "../components/common/SubText";

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
  const [modalVisible, setModalVisible] = React.useState(false);

  const data = [
    { id: 1, label: "My profile", color: "#0E0E0E" },
    { id: 2, label: "Logout", color: "#FF0E0E", functionCall: logout },
  ];

  return (
    <>
      <DialogModal
        visible={modalVisible}
        data={data}
        onClose={() => {
          setModalVisible(false);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={styles.user}
      >
        {user?.picture ? (
          <View style={{ width: 26, borderRadius: 120, overflow: "hidden" }}>
            <Image
              style={{ width: 26, aspectRatio: 1 }}
              source={{ uri: user?.picture }}
            />
          </View>
        ) : (
          <FontAwesome5 name="user-circle" size={24} color="#1E1E1E" />
        )}
      </TouchableOpacity>
    </>
  );
};

// User Actions Popup Dialog Box with Dark Blurry background
const DialogModal = ({ visible, data, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable onPress={onClose} style={styles.centeredView}>
        <View style={styles.modalView}>
          <FlatList
            data={data}
            style={{ width: "100%" }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  item.functionCall && item.functionCall();
                  onClose();
                }}
              >
                <SubText
                  text={item.label}
                  family="Poppins"
                  color={item?.color}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  user: {
    marginRight: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#efefef",
    height: 50,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
  },
  icon: {
    marginRight: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10,
  },
  modalView: {
    width: "100%",
    height: "auto",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalItem: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
  },
});
