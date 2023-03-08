import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigation from "./TabNavigation";
import AddProduct from "../components/sell/AddProduct";
import ProductScreen from "../components/Asset/ProductScreen";

const Stack = createNativeStackNavigator();

export default function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Main"
        component={TabNavigation}
      />
      <Stack.Screen
        options={{ title: "Add Product" }}
        name="AddProduct"
        component={AddProduct}
      />
      <Stack.Screen
        options={{ title: "Product Page" }}
        name="ProductScreen"
        component={ProductScreen}
      />
    </Stack.Navigator>
  );
}
