import React from "react";
import { Page1 } from "./source/pages/page1/page1";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackScreens } from "./source/helpers/types";
//import SimpleScreen from "./src/Screens/SimpleScreen";
//import TabsBottom from "./source/components/navigation/tabs/TabsBottom";
//import './source/storage/seed-database';
import { CreateNewProduct } from "./source/pages/page2/CreateNewProduct";
import { ProductDetailsScreen, } from "./source/pages/page3/ProductDetailsScreen";
import { ProductListScreen } from "./source/pages/page3/ProductListScreen";
import { ProductAddLinker } from "./source/pages/page3/ProductAddLinker";
import ProductList from "./source/SQLiteExpoDBComponents/components/ProductList";
import ProductUpdate from "./source/SQLiteExpoDBComponents/components/ProductUpdate";
import 'reflect-metadata';
import { DatabaseConnectionProvider } from './source/SQLiteExpoDBData/data/connection';

export default function App() {
  const Stack = createNativeStackNavigator<StackScreens>();
  return (
  <DatabaseConnectionProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">


        <Stack.Screen
          name="ProductList"
          component={ProductList}
        />

        <Stack.Screen
          name="ProductUpdateScreen"
          component={ProductUpdate}
        />

        <Stack.Screen
          name="Product List"
          component={ProductListScreen}
        />

        <Stack.Screen
          name="Product form"
          component={ProductAddLinker}
        />


        <Stack.Screen
          name="Items Shop"
          component={Page1}
          options={{ headerShown: true}}
        />
        <Stack.Screen
          name="CreateNewProduct"
          component={CreateNewProduct}
        />


        <Stack.Screen
          name="Create New Product"
          component={ProductAddLinker}
        />


      </Stack.Navigator>
    </NavigationContainer>
    </DatabaseConnectionProvider>
  );
}
