import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {useServices} from '../../contexts';
import {
  Screen,
  Text,
  FlatList,
  FlatListItem,
  ActivityIndicator,
  Spacer,
} from '../../components/components';

import type {Product} from '../../models';
import type {ListRenderItem} from '../../components';
import type {ProductListScreenNavigationProps} from '../../navigators';






type Props = ProductListScreenNavigationProps;

export const ProductListScreen = (props: Props) => {
  const {productService} = useServices();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [products, setProducts] = useState<Product[]>([]);

  const goToProductDetail = (id: Product['id']) =>
    props.navigation.navigate('ProductDetail', {productId: id});

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

  const _renderItem: ListRenderItem<Product> = (info) => (
    <FlatListItem
      key={info.item.id}
      id={info.item.id}
      text={info.item.email}
      onPress={goToProductDetail}
      onDelete={deleteProduct}
    />
  );

  const _renderItemSeparatorComponent = () => <Spacer vertical={1} />;

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

  return (
    <Screen>
        <Text>Hello</Text>
      <FlatList
        data={products}
        renderItem={_renderItem}
        ItemSeparatorComponent={_renderItemSeparatorComponent}
      />
    </Screen>
  );
};
