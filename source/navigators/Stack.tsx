import { createStackNavigator } from '@react-navigation/stack';
import type { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: {productId: string} | undefined;
  ProductList: undefined;
};

export type HomeScreenNavigationProps = StackScreenProps<
  RootStackParamList,
  'Home'
>;

export type ProductDetailsScreenNavigationProps = StackScreenProps<
  RootStackParamList,
  'ProductDetail'
>;

export type ProductListScreenNavigationProps = StackScreenProps<
  RootStackParamList,
  'ProductList'
>;

export const Stack = createStackNavigator<RootStackParamList>();
