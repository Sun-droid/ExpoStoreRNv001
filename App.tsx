import React from "react";
import { Page1 } from "./source/pages/page1/page1";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackScreens } from "./source/helpers/types";
//import SimpleScreen from "./src/Screens/SimpleScreen";
//import TabsBottom from "./source/components/navigation/tabs/TabsBottom";
import { CreateNewProduct } from "./source/pages/page2/CreateNewProduct";
export default function App() {
  const Stack = createNativeStackNavigator<StackScreens>();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Page1">
        <Stack.Screen
          name="Items Shop"
          component={Page1}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="CreateNewProduct"
          component={CreateNewProduct}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
