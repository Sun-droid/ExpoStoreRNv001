import React, {useRef, useState, useEffect} from "react";
import { Status, Type, Product, UnknownItem } from "./db/models/";
import {canCreateProduct, canUpdateProduct} from "./db/models/";
import type { ProductDetailsScreenNavigationProps } from "../../navigators";
import type { PickerItem, TextInputRef } from "./components";
import { useServices } from "../../contexts";
import {
  Button,
  Alert,
  StyleSheet,
  TextNative,
  TextInputNative,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import {
  InputContainer,
  InputRow,
  Screen,
  Text,
  TextInput,
  Picker,
  ButtonContainer,
  ActivityIndicator,
} from "./components";


type Props = ProductDetailsScreenNavigationProps;

const formatStatusItems = (statuses: Status[]): PickerItem[] =>
  statuses.map<PickerItem>((t) => ({
    label: t.name,
    value: t.id,
  }));

const formatTypeItems = (types: Type[]): PickerItem[] =>
  types.map<PickerItem>((t) => ({
    label: t.name,
    value: t.id,
  }));

export enum ProductDetailsScreenTitle {
  Default = 'Product Detail',
  New = 'Create Product',
}

export const ProductDetailsScreen = ({navigation, route}: Props) => {
  const {statusService, typeService, productService} = useServices();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [statusItems, setStatusItems] = useState<PickerItem[]>([]);
  const [typeItems, setTypeItems] = useState<PickerItem[]>([]);
  const [product, setProduct] = useState<UnknownItem | Product>({
    status: '',
    type: '',
  });

  const refs = {
    name: useRef<TextInputRef>(null),
    price: useRef<TextInputRef>(null),
  };

  const createProduct = async (productToCreate: UnknownItem) => {
    setLoading(true);
    try {
      const createdProduct = await productService.create(productToCreate);
      setProduct(createdProduct);
      navigation.setOptions({title: ProductDetailScreenTitle.Default});
      Alert.alert('Success', 'Product created successfully.');
    } catch (e) {
      Alert.alert('Error', 'Product could not be created.');
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productToUpdate: Product) => {
    setLoading(true);
    try {
      const updatedProduct = await productService.update(productToUpdate);
      setProduct(updatedProduct);
      Alert.alert('Success', 'Product updated successfully.');
    } catch (e) {
      Alert.alert('Error', 'Product could not be updated.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = () => {
    if (canUpdateProduct(product as Product)) {
      updateProduct(product as Product);
    } else if (canCreateProduct(product)) {
      createProduct(product);
    } else {
      Alert.alert('Error', 'All fields are required.');
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const statuses = await statusService.list();
        const types = await typeService.list();
        setStatusItems(formatStatusItems(statuses));
        setTypeItems(formatTypeItems(types));

        if (route.params?.productId) {
          const initialProduct = await productService.get(route.params?.productId);
          setProduct(initialProduct);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [route.params, statusService, typeService, productService]);

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

  return (
    <Screen scroll>
      <InputContainer>
        {(product as Product).id && (
          <InputRow>
            <Text variant="label">ID</Text>
            <TextInput
              placeholder="Ex.: 1"
              defaultValue={String((product as Product).id)}
              onChangeText={(newId) =>
                setProduct((oldProduct) => ({...oldProduct, id: Number(newId)}))
              }
              returnKeyType="next"
              keyboardType="numeric"
              blurOnSubmit={false}
              onSubmitEditing={() => refs.name.current?.focus()}
              editable={false}
            />
          </InputRow>
        )}
        <InputRow>
          <Text variant="label">Name</Text>
          <TextInput
            componentRef={refs.name}
            placeholder="Ex.: Paprika"
            defaultValue={product.name}
            onChangeText={(newName) =>
              setProduct((oldProduct) => ({...oldProduct, name: newName}))
            }
            returnKeyType="next"
            maxLength={255}
            autoCompleteType="name"
            blurOnSubmit={false}
            onSubmitEditing={() => refs.price.current?.focus()}
          />
        </InputRow>
        <InputRow>
          <Text variant="label">Price</Text>
          <TextInput
            componentRef={refs.price}
            defaultValue={product.price}
            onChangeText={(newPrice) =>
              setProduct((oldProduct) => ({...oldProduct, price: newPrice}))
            }
            returnKeyType="done"
            maxLength={255}
            autoCompleteType="price"
            secureTextEntry
          />
        </InputRow>
        <InputRow>
          <Text variant="label">Type</Text>
          <Picker
            value={product.type}
            items={typeItems}
            onValueChange={(newType) =>
              setProduct((oldProduct) => ({...oldProduct, type: newType}))
            }
          />
        </InputRow>
        <InputRow last>
          <Text variant="label">Status</Text>
          <Picker
            value={product.status}
            items={statusItems}
            onValueChange={(newStatus) =>
              setProduct((oldProduct) => ({...oldProduct, status: newStatus}))
            }
          />
        </InputRow>
      </InputContainer>
      <ButtonContainer>
        <Button title="Save" onPress={handleSaveProduct} />
      </ButtonContainer>
    </Screen>
  );
};
