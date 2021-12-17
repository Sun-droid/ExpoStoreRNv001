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
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "../helpers/types";
import { getRepository } from 'typeorm/browser';



interface ProductItem extends NativeStackScreenProps <StackScreens, "ProductUpdate">{
  id: number;
  name: string;
  type: string;
  price: int;
  is_toggled: boolean;
}

interface IProps extends NativeStackScreenProps<StackScreens, "ProductUpdateScreen">{}

const ProductUpdate: React.FC<IProps> = (props) => {
  const params = props.route.params;

  const { productsRepository } = useDatabaseConnection();

  const goToCreateItem = () => props.navigation.navigate('Create New Product');
  const [isModalVisible, setIsModalVisible] = useState(true);
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
      props.navigation.navigate("ProductList");
    },
    [productsRepository],
  );

  useEffect(() => {
    productsRepository.getAll().then(setProducts);
  }, [productsRepository]);


  //useEffect(() => {
//     productsRepository.getAll().then(setProducts);
    //productsRepository.getItem(key: params.text).then(setProducts);
  //}, [productsRepository]);




/*   const loadedProduct =  products.findOne({where: {id: params.text}});

  console.log (loadedProduct); */



/*
public async toggle(id: number): Promise<void> {
    await this.ormRepository.query(
      `
      UPDATE
        products
      SET
        is_toggled = ((is_toggled | 1) - (is_toggled & 1))
      WHERE
        id = ?;
      `,
      [id],
    );
  }
 */




























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
      /* <View style={styles.productsContainer}>
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
//             onPress={() => handleToggleProduct(product.id)}
            onPress={() => {
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
             }}
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



                  <Modal style={{margin: 60}} isVisible={isModalVisible}>

                  </Modal>



      </View> */

  const [index, setIndex] = useState(1);





console.log("L419 - this data: ", params.text);
//console.log("this rep: ", productsRepository);

 /* @PrimaryGeneratedColumn()
  id: number; */

const tst = () => productsRepository.find({
                where:
                    {id: params.text}

            });

//console.log(products);

console.log("L433 - ", tst.type);
console.log("L419 -",  tst);
console.log("L35 - Repository-id: ", params.text);

  const handleDisplayProduct = productsRepository.displayOne(params.text);

console.log("L39 - Repository Response >>> ", handleDisplayProduct);


//products = products.filter((item) => item.id == 36).map(({name, type, price}) => ({name, type, price}));



//console.log("----0000-----> ", _.filter(products, {id:37}));


const selectedId = products
.filter(e => e.id == params.text)
.map(e => {
    console.log("start");
    console.log("e", e);
    console.log("end");
    console.log("new");
    console.log("e", e.name);
    console.log("new1");
  const {name1, type1, price1} = e;
  return {name1, type1, price1};
});

console.log("out", products.filter(e => e.id == params.text).map(product => (product.id)));
//console.log("out", selectedId.map(selectedId => (selectedId.name)));


//console.log("L457 - XXX->", filtered.name1);


//console.log("---------> ", products[1]);


//const productRepository = getRepository(productsRepository);
//const loadedItem = () => productsRepository.findOne({where: {id: params.text}});

  /* const item = () => products.map[params.id];
   const loadedPost = () => postRepository.findOne({where: {id: params.text}, relations: ["name", "type", "price"]}); */






  //console.log(loadedItem.number);






//         {products.map(product => (


  return (
    <View style={styles.container}>
      <View style={styles.cBack}>
        <View style={{ flex: 1 }}>
           <View style={styles.newProductContainer}>
              <Text style = {styles.textStyleForm}>Update - Delete </Text>
              <View
                 style={{
                   flex: 1, height: 1,
                   borderBottomColor: 'white',
                   borderBottomWidth: 1,
                   margin:50,
                 }}
               />
               {products.filter(e => e.id == params.text).map(product => (
               <TextInput
                 style={styles.textEdit}
                 placeholder={product.name}
                 placeholderTextColor= "#000"
                 style={styles.newProductInput}
                 value={newProduct}
                 onChangeText={setNewProduct}
               />
               ))}
               {products.filter(e => e.id == params.text).map(product => (
               <DropDownPicker
                  defaultNull
                  placeholder={product.type}
                  open={open}
                  value={newProductType}
                  items={items}
                  setOpen={setOpen}
                  setValue={setNewProductType}
                  setItems={setItems}
              />
              ))}
              <View
                  style={{
                    flex: 1,
                    margin:10,
                  }}
              />
              {products.filter(e => e.id == params.text).map(product => (
              <TextInput
                  placeholder={String(product.price)}
                  placeholderTextColor= "#000"
                  style={styles.newProductInput}
                  value={newProductPrice}
                  onChangeText={setNewProductPrice}
                  keyboardType="numeric"
              />
              ))}
              <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                  <Pressable style={[ isFilled ? styles.button : styles.inactiveStyle ]} onPress={checkValid} >
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textStyle}>Save</Text>
                        <Icon style={{ marginLeft: 26,}} name="download" size={30} color='#fff'/>
                      </View>
                 </Pressable>
                 {products.filter(e => e.id == params.text).map(product => (
                 <Pressable style={[ styles.button ]}
                 onPress={() => {
                            Alert.alert(
                                  "Wish to Delete?",
                                  "Cancel to return",
                                  [
                                    {
                                      text: "Cancel",
                                      onPress: () => console.log("Cancel Pressed"),
                                      style: "cancel"
                                    },
                                    { text: "OK", onPress:  () => { handleDeleteProduct(product.id), console.log("OK Pressed")} }
                                  ]
                                );
                            }} >
                       <View style={{flexDirection: 'row'}}>
                         <Text style={styles.textStyle}>Delete</Text>
                         <Icon style={{ marginLeft: 26,}} name="trash" size={30} color='#fff'/>
                       </View>
                 </Pressable>
                 ))}
              </View>
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
      </View>
    </View>
  );
};
//             ))}

export default ProductUpdate;










const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingVertical: 12,
    paddingHorizontal: 12,
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
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor:'grey',
    marginTop: 25,
  },
  cBack:{
    flex: 1,
    padding: 40,
    height: 48,
    elevation: 3,
    backgroundColor: "rgba(0, 0, 0, 0.65)"
  }
});

// Newest 051220211721

/*
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
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "../helpers/types";




interface ProductItem extends NativeStackScreenProps <StackScreens, "ProductUpdateScreen">{
  id: number;
  name: string;
  type: string;
  price: int;
  is_toggled: boolean;
}


const ProductUpdate: React.FC<ProductItem> = (props) => {
    const params = props.route.params;
  return (
    <View style={styles.container}>
      <Text>Hello from Update</Text>
    </View>
  );
};

export default ProductUpdate;

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
 */
