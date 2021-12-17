import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';

import { useDatabaseConnection } from '../../SQLiteExpoDBData/data/connection';

import Product from './Product';

import Icon from 'react-native-vector-icons/FontAwesome';
import { FAB, DataTable } from 'react-native-paper';
import Modal from "react-native-modal";
import DropDownPicker from 'react-native-dropdown-picker';
import { Divider } from 'react-native-elements';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { StackScreens } from "../helpers/types";


interface ProductItem {
  id: number;
  name: string;
  type: string;
  price: int;
  is_toggled: boolean;
}
const ProductList: React.FC<
    NativeStackScreenProps<StackScreens, "ProductList">> = (props) => {
  const { productsRepository } = useDatabaseConnection();

  //const goToCreateItem = () => props.navigation.navigate('Create New Product');
  const [isModalVisible, setIsModalVisible] = useState(false);
  let isFilled : boolean = false;
  const [deleteItem, setDeleteItem] = useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  const [newProduct, setNewProduct] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductType, setNewProductType] = useState('');
  const [products, setProducts] = useState<ProductItem[]>([]);

  const handleCreateProduct = useCallback(async () => {
      if (isFilled){
          try {
              const product = await productsRepository.create({
                    name: newProduct, type: newProductType, price: newProductPrice,
                  });
    /*             product.name;
                product.type;
                product.price; */
                setProducts(current => [...current, product]);
                setNewProduct('');
          } catch (error) {
            console.log( error );
          }
      }
  }, [newProduct, newProductType, newProductPrice, productsRepository]);



  if ( newProduct && newProductType && newProductPrice) {
        isFilled = true;
        console.log ("yes" + isFilled);
  }
  else{
        console.log ("no");
        console.log ("no" + isFilled);

            const displayDelete = () =>
              Alert.alert(
              "Wish to Delete?",
              "Cancel to return",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress:  () => console.log("OK Pressed") }
              ]
            );
  };
  /*   const product = await productsRepository.create({ text: newProduct });

    setProducts(current => [...current, product]);

    setNewProduct(''); */


  const handleToggleProduct = useCallback(
    async (id: number) => {
      await productsRepository.toggle(id);

      setProducts(current =>
        current.map(product => {
          return product.id === id
            ? { ...product, is_toggled: !product.is_toggled }
            : product;
        }),
      );
    },
    [productsRepository],
  );

  const handleDeleteProduct = useCallback(
    async (id: number) => {
      await productsRepository.delete(id);

      setProducts(current => current.filter(product => product.id !== id));
    },
    [productsRepository],
  );






  const handleDisplayProduct = () => {

    const param = useCallback(
        async (id: number) => {
          console.log(id);
          let a = id;
          Alert.alert(a.toString());
//           props.navigation.navigate("ProductUpdate" , {number: id});
        },
        [productsRepository],
      );
    //       setProducts(current => current.filter(product => product.id !== id));
  };









  useEffect(() => {
    productsRepository.getAll().then(setProducts);
  }, [productsRepository]);


  /* const [textInputName, setTextInputName] = useState('');
  const [textInputPrice, setTextInputPrice] = useState('');
  const [open, setOpen] = useState(false);

<Product text={product.name} isToggled={product.is_toggled} />
            <Product text={product.type} isToggled={product.is_toggled} />
            <Product text={product.price} isToggled={product.is_toggled} />

    <DropDownPicker
                        defaultNull
                        open={open}
                        value={newProductType}
                        setOpen={setOpen}
                        placeholder="Product Type"
                        items={[
                            {label: 'Item 1', value: 'item1'},
                            {label: 'Item 2', value: 'item2'},
                        ]}
                        dropDownStyle={{backgroundColor: 'red'}}
                        containerStyle={{height: 40}}
                        onChangeItem={setNewProductType}

                    />



                    */
  //const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  //const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Integrated', value: 'Integrated'},
    {label: 'Peripheral', value: 'Peripheral'}
  ]);

  const clearText = ()=>{
  /*
     this._e.setNativeProps({ text: ' ' });

      setTimeout(() => {
        this._e.setNativeProps({ text: '' });
       },3);

ref={e => this._e= e}

        () => {(name) => this.onChangeText(name), (value) => setTextInputName(value)}
        onChangeText={() => {setNewProductPrice(), (price) => this.onChangeText(price), (value) => setTextInputPrice(value)}}
        onChangeItem={() => {setNewProductType(), item => {console.log(item.label, item.value); item => setValue(item.value);}}}
  */
  }


  const checkTextInput = () => {
      if (!textInputName.trim()) {
        alert('Enter Name');
        return;
      }
      if (!textInputPrice.trim()) {
        alert('Enter Price');
        return;
      }
      alert('Success');
    };




  const displayDelete = () =>
       Alert.alert(
       "Wish to Delete?",
       "Cancel to return",
       [
         {
           text: "Cancel",
           onPress: () => console.log("Cancel Pressed"),
           style: "cancel"
         },
         { text: "OK", onPress:  () => {setDeleteItem, console.log("OK Pressed")} }
       ]
     );

  const checkValid = () => {
            if (isFilled) {
                handleCreateProduct()
                handleModal()
            }
            else {
               Alert.alert("Missing data");
            };
      };




/*         <TouchableOpacity style = {{margin: 60}}
           onPress={() => props.navigation.navigate("CreateNewProduct", {
                       text: "product.id",
                     })
                   }><Text>C</Text>
       </TouchableOpacity> */




      console.log(products);
  return (
    <View style={styles.container}>
      <View style={styles.productsContainer}>
      <View style={{backgroundColor: '#90AFC5'}}>
       <DataTable>
             <DataTable.Header>
               <DataTable.Title>
                  <Text style={styles.textStyle}>
                    Name
                  </Text></DataTable.Title>
               <DataTable.Title>
               <Text style={styles.textStyle}>
                    Type
               </Text>
               </DataTable.Title>
               <DataTable.Title numeric>
               <Text style={styles.textStyle}>
                    Price
               </Text>
               </DataTable.Title>
             </DataTable.Header>

        </DataTable>
        </View>
       <ScrollView>



        {products.map(product => (
          <TouchableOpacity
            key={String(product.id)}
//            onPress={() => handleToggleProduct(product.id)}
            onPress={() => props.navigation.navigate("ProductUpdateScreen", {
                        text: product.id,
                      })
                    }
           /*  onPress={() => {
             Alert.alert(
                   "Wish to Delete?",
                   "Cancel to return",
                   [
                     {
                       text: "Cancel",
                       onPress: () => console.log("Cancel Pressed"),
                       style: "cancel"
                     },
                     { text: "OK", onPress:  () => {handleDeleteProduct(product.id), console.log("OK Pressed")} }
                   ]
                 );
             }} */




//             onLongPress={() => handleDeleteProduct(product.id)}
          >
              <DataTable>
                 <DataTable.Row>
                     <DataTable.Cell>{product.name}</DataTable.Cell>
                     <DataTable.Cell>{product.type}</DataTable.Cell>
                     <DataTable.Cell numeric>${product.price}</DataTable.Cell>
                 </DataTable.Row>
              </DataTable>
          </TouchableOpacity>
        ))}
       </ScrollView>

         <FAB
           style={styles.fab}
           small
           icon="plus"
           onPress={handleModal}
         />
        <View>
          <Modal isVisible={isModalVisible}>
            <View style={{ flex: 1 }}>
               <Icon onPress={() => {handleModal(), clearText()}}  name="circle" size={50} color="#2FD6E7" style={{transform: [{rotateY: '180deg'} , {rotateX: '180deg'}]}}/>
               <View style={styles.newProductContainer}>
                  <Text style = {styles.textStyleForm}> New Product Form </Text>
                  <View
                     style={{
                       flex: 1, height: 1,
                       borderBottomColor: 'white',
                       borderBottomWidth: 1,
                       margin:50,
                     }}
                   />
                   <TextInput
                     style={styles.textEdit}
                     placeholder="Name"
                     placeholderTextColor= "grey"
                     style={styles.newProductInput}
                     value={newProduct}
                     onChangeText={setNewProduct}
                   />
                   <DropDownPicker
                      defaultNull
                      placeholder="Product Type"
                      open={open}
                      value={newProductType}
                      items={items}
                      setOpen={setOpen}
                      setValue={setNewProductType}
                      setItems={setItems}
                  />
                  <View
                      style={{
                        flex: 1,
                        margin:10,
                      }}
                  />
                  <TextInput
                      placeholder="Price"
                      placeholderTextColor= "grey"
                      style={styles.newProductInput}
                      value={newProductPrice}
                      onChangeText={setNewProductPrice}
                      keyboardType="numeric"
                  />
                  <Pressable style={[ isFilled ? styles.button : styles.inactiveStyle ]} onPress={checkValid} >
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textStyle}>Save</Text>
                        <Icon style={{ marginLeft: 26,}} name="download" size={30} color='#fff'/>
                      </View>
                 </Pressable>
                  <View
                     style={{
                       flex: 1, height: 1,
                       borderBottomColor: 'white',
                       borderBottomWidth: 1,
                       margin:50,
                     }}
                  />
               </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#F4EBDB'
  },

  newProductContainer: {
    marginTop: 80,
    marginBottom: 40,
  },

  newProductInput: {
    height: 48,
    marginBottom: 20,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#aaa',
    paddingHorizontal: 16,
    fontSize: 20,
  },

  productsContainer: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#2FD6E7"
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 22,
    paddingHorizontal: 22,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#2FD6E7',
    marginTop: 25,
    },
  textStyle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  textStyleForm: {
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 0.85,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 0,
    color: '#FFF',
  },
  textEdit: {
    height: 40,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1
  },
  activeStyle:{
    marginTop:18,
    width:180,
    backgroundColor:'#05acfa',
    alignItems: 'center',
    padding: 10
  },
  inactiveStyle:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 22,
    paddingHorizontal: 22,
    borderRadius: 4,
    elevation: 3,
    backgroundColor:'grey',
    marginTop: 25,
  }
});
