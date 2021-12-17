import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DataTable } from 'react-native-paper';




interface ProductProps {
  text: string;
  isToggled: boolean;
}

const Product: React.FC<ProductProps> = ({ text, isToggled }) => {
  return (
    <View style={styles.container}>


      <Text style={[styles.productText, isToggled && styles.toggled]}>{text}</Text>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    alignItems: 'center',
  },

  productText: {
    fontSize: 24,
  },

  toggled: {
    textDecorationLine: 'line-through',
  },
});
