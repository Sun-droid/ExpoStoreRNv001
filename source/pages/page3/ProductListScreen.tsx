import React, {useState, useEffect, useCallback, ReactNode} from 'react';
import {Alert, StyleSheet, View, Text, TouchableOpacity, } from 'react-native';
import {useServices} from '../../contexts';
import {
  Screen,
  Text as TextComp,
  FlatList,
  FlatListItem,
  ActivityIndicator,
  Spacer,
} from '../../components/components';
// import ProductList from '../../SQLiteExpoDBComponents/components/ProductAdd';
import ProductList from '../../SQLiteExpoDBComponents/components/ProductList';
import { DatabaseConnectionProvider } from '../../SQLiteExpoDBData/data/connection';

/* import type {Product} from '../../models';
import type {ListRenderItem} from '../../components';
import type {ProductListScreenNavigationProps} from '../../navigators'; */

// import { createConnection, getRepository, Connection } from 'typeorm/browser';

/* import { Product } from "./TypeORMDB";
import { Type } from "./TypeORMDB";
import { Post } from "./TypeORMDB"; */


const ProductName = ({
  name,
}: {
  name: string;
}) => {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

type Props = ProductListScreenNavigationProps;

export const ProductListScreen = (props: Props) => {


const [defaultConnection, setconnection] = useState<Connection | null>(null);


/*
  const [products, setProducts] = useState<Product[]>([]);
  const setupConnection = useCallback(async () => {
    try {
      const connection = await createConnection({
        type: 'react-native',
        database: 'test',
        location: 'default',
        logging: ['error', 'query', 'schema'],
        synchronize: true,
        entities: [Product, Type, Post],
      });
      setconnection(connection);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);


  const getProducts = useCallback(async () => {
    const productRepository = getRepository(Product);
    let result = await productRepository.find();
    if (result.length === 0) {
      const newProduct = new Product();
      newProduct.name = 'Name Here';
      await productRepository.save(newProduct);
      result = await productRepository.find();
    }
    setProducts(result);
  }, []);

  useEffect(() => {
    if (!defaultConnection) {
      setupConnection();
    } else {
      getProducts();
    }
  }, []);

*/


/* <Text style={styles.title}>List of Products</Text>
        <View style={{ height: 30, backgroundColor: '#EA835A' , flexDirection:"row",
            justifyContent: 'space-around', alignItems: 'center' }}>
            <Text >Name</Text>
            <Text >Type</Text>
            <Text >Price</Text>
        </View> */



  return (
    <View style={styles.container}>
        <View style={styles.productsContainer}>
         <DatabaseConnectionProvider>
                 <ProductList />
         </DatabaseConnectionProvider>
        </View>
    </View>
  );

      /* {products.map((product) => (
        <ProductName key={product.id.toString()} />
      ))} */







 /*  const {productService} = useServices();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [products, setProducts] = useState<Product[]>([]);

  const goToProductDetail = (id: Product['id']) =>
    props.navigation.navigate('ProductDetail', {productId: id}); */







/*   const deleteProduct = (id: Product['id']) => {
    (async () => {
      setLoading(true);
      try {
        await productService.delete(id);
        const fetchedProducts = await productService.list();
        setProducts(fetchedProducts);
        Alert.alert('Success', 'Product deleted successfully.');
      } catch (e) {
        Alert.alert('Error', 'Product could not be deleted.');
      } finally {
        setLoading(false);
      }
    })();
  }; */





/*   const _renderItem: ListRenderItem<Product> = (info) => (
    <FlatListItem
      key={info.item.id}
      id={info.item.id}
      text={info.item.email}
      onPress={goToProductDetail}
      onDelete={deleteProduct}
    />
  );

  const _renderItemSeparatorComponent = () => <Spacer vertical={1} />;
   */






/*   useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const fetchedProducts = await productService.list();
        setProducts(fetchedProducts);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [productService]);

  if (loading) {
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen>
        <Text>{error}</Text>
      </Screen>
    );
  }

  if (!products.length) {
    return (
      <Screen>
        <Text>Wow, such empty. Try to create a product and return here!</Text>
      </Screen>
    );
  } */



  /*

  return (
    <Screen>
        <Text>Hello</Text>
      <FlatList
        data={products}
        renderItem={_renderItem}
        ItemSeparatorComponent={_renderItemSeparatorComponent}
      />
    </Screen>
  ); */

   /* <TouchableOpacity
                onPress={() => props.navigation.navigate("CreateNewProduct")}
              >
                <Text style={styles.buttonText}>Test</Text>
          </ TouchableOpacity> */


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: { fontSize: 16, color: 'black' },

  productsContainer: {
      flex: 1,
    },
});