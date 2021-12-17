import React, {useState, useEffect, useCallback, ReactNode} from 'react';
import {Alert, StyleSheet, View, Text } from 'react-native';
import App from "../../index";
//import ProductAdd from '../../SQLiteExpoDBComponents/components/ProductAdd';
import { DatabaseConnectionProvider } from '../../SQLiteExpoDBData/data/connection';

export const ProductAddLinker = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Product</Text>
      <View style={styles.productsContainer}>
       <DatabaseConnectionProvider>
//            <ProductAdd />
       </DatabaseConnectionProvider>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 16, color: 'black' },
});