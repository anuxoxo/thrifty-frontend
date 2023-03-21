import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigation from "./TabNavigation";
import AddProduct from "../components/sell/AddProduct";
import ProductScreen from "../components/Asset/ProductScreen";
import CategoryScreen from "../components/Asset/CategoryScreen";
import SearchScreen from "../components/home/SearchScreen";

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
        options={{ title: "Product Page", headerShown: false }}
        name="ProductScreen"
        component={ProductScreen}
      />
      <Stack.Screen
        options={{ title: "Categories" }}
        name="CategoryScreen"
        component={CategoryScreen}
      />
      <Stack.Screen
        options={{ title: "Search" }}
        name="SearchScreen"
        component={SearchScreen}
      />
    </Stack.Navigator>
  );
}
