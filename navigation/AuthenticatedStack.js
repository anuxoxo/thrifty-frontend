import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigation from "./TabNavigation";
import AddProduct from "../components/sell/AddProduct";

const Stack = createNativeStackNavigator();

export default function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Main" component={TabNavigation} />
      <Stack.Screen
        options={{ title: 'Add Product' }}
        name="AddProduct"
        component={AddProduct} />
    </Stack.Navigator>
  );
}