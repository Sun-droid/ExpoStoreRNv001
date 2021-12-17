import React, {useRef, useState, useEffect} from "react";
import { Status, Type, ProductS, UknonwnItem } from "./db/models/";
import {canCreateProductS, canUpdateProductS} from "./db/models/";
import type { ItemDetailScreenNavigationProps } from '../../navigators';
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

type Props = ItemDetailScreenNavigationProps;

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

export enum ItemDetailScreenTitle {
  Default = 'ProductS Detail',
  New = 'Create ProductS',
}

export const ItemDetailScreen = ({navigation, route}: Props) => {
  const {statusService, typeService, productService} = useServices();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [statusItems, setStatusItems] = useState<PickerItem[]>([]);
  const [typeItems, setTypeItems] = useState<PickerItem[]>([]);
  const [product, setProduct] = useState<UknonwnItem | ProductS>({
    status: '',
    type: '',
  });

  const refs = {
    type: useRef<TextInputRef>(null),
    status: useRef<TextInputRef>(null),
  };

  const createProduct = async (productToCreate: UknonwnItem) => {
    setLoading(true);
  };

  const handleSaveProduct = () => {
    if (canUpdateProductS(product as ProductS)) {
      updateProduct(product as ProductS);
    } else if (canCreateProductS(product)) {
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
          const initialUser = await productService.get(route.params?.productId);
          setUser(initialUser);
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
     <View style={{ height: 30, backgroundColor: '#EA835A' , flexDirection:"row",
                    justifyContent: 'space-around', alignItems: 'center' }}>
     </View>
      <InputContainer>
        {(product as ProductS).id && (
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
              onSubmitEditing={() => refs.email.current?.focus()}
              editable={false}
            />
          </InputRow>
        )}
        <InputRow>
          <Text variant="label">Email</Text>
          <TextInput
            componentRef={refs.email}
            placeholder="Ex.: alex@contoso.com"
            defaultValue={product.email}
            onChangeText={(newEmail) =>
              setProduct((oldProduct) => ({...oldProduct, email: newEmail}))
            }
            returnKeyType="next"
            maxLength={255}
            autoCompleteType="email"
            keyboardType="email-address"
            blurOnSubmit={false}
            onSubmitEditing={() => refs.password.current?.focus()}
          />
        </InputRow>
        <InputRow>
          <Text variant="label">Password</Text>
          <TextInput
            componentRef={refs.password}
            defaultValue={product.password}
            onChangeText={(newPassword) =>
              setProduct((oldProduct) => ({...oldProduct, password: newPassword}))
            }
            returnKeyType="done"
            maxLength={255}
            autoCompleteType="password"
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
