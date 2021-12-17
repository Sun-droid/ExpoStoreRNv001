import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Button,
} from "react-native";
import { StackScreens } from "../helpers/types";
import { NavigationContainer } from "@react-navigation/native";
import { ListDisplayMain } from "../Lists/ListDisplayMain";
import { AddProduct } from "./components/AddProduct";
import { ModalAddItems } from "./components/ModalAddItems";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styled from 'styled-components'
import { Header, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { FAB } from 'react-native-paper';
import Modal from "react-native-modal";

const list = [
  {
    name: 'ItemA',
    type: 'Integrated',
    number: '1200',
  },
  {
    name: 'ItemB',
    type: 'Integrated',
    number: '1200',
  },
];

export const Page1: React.FC<
  NativeStackScreenProps<StackScreens, "Page1">
> = (props) => {
  const [enteredValue, setEnteredValue] = React.useState("");
//   const Stack = createNativeStackNavigator<StackScreens>();
  const myIcon = <Icon name="rocket" size={30} color="#900" />;

  const goToCreateItem = () => props.navigation.navigate('Create New Product');

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);


  return (
    <View style={styles.container}>
        <View>
          <View style={{ height: 30, backgroundColor: '#EA835A' , flexDirection:"row",
                justifyContent: 'space-around', alignItems: 'center' }}>
                <Text >Name</Text>
                <Text >Type</Text>
                <Text >Price</Text>
          </View>
          <View>
              {
                list.map((item, i) => (
                 <TouchableOpacity>
                 <FlatList/>
                  <ListItem onPress={handleModal}  style={{ backgroundColor: '#ECCF90' }}  key={i} bottomDivider>
                    <ListItem.Content style={{ flex: 1 , height: 30 , flexDirection:"row",
                                                      justifyContent: 'space-around', alignItems: 'center' }}
                                                      >
                      <ListItem.Title >{item.name}</ListItem.Title>
                      <ListItem.Title>{item.type}</ListItem.Title>
                      <ListItem.Title> <Icon name="dollar" size={14} color="#6D716F" /> {item.number}</ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                </TouchableOpacity>
                ))
              }
          </View>
          <View>
              <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1 }}>
                   <Icon onPress={handleModal}  name="circle" size={50} color="#2FD6E7" style={{transform: [{rotateY: '180deg'} , {rotateX: '180deg'}]}}/>
                </View>
              </Modal>
          </View>

        </View>
            <FAB
                   style={styles.fab}
                   small
                   icon="plus"
                   onPress={goToCreateItem}
                 />
        <TouchableOpacity
              onPress={() => props.navigation.navigate("CreateNewProduct")}
            >
              <Text style={styles.buttonText}>Test</Text>
        </ TouchableOpacity>
        <View>
            <Text>Hello</Text>
            {/*          <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                name="List Main"
                component={ListDisplayMain}
                />
            </Stack.Navigator>
                </NavigationContainer> */}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  button: {
    padding: 25,
    borderRadius: 25,

    borderColor: "green",
    borderWidth: 2,
  },
  buttonText: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 5,
    padding: 2,
    width: 270,
  },
  rowData: {
      flexDirection:"row",
      alignSelf:"flex-start",
      backgroundColor: '#ecf0f1',
    },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#2FD6E7"
  },
});

/*
const StylesTable = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}


function DisplayTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Item',
          }
        ],
      },
      {
        Header: 'Type',
        columns: [
          {
            Header: 'Integrated',
          }
        ],
      },
    ],
    {
      Header: 'Price',
       columns: [
          {
            Header: '$',
          }
        ],
      },
    []
  )

  const data = React.useMemo(() => [1])

  return (
    <StylesTable>
      <Table columns={columns} data={data} />
    </StylesTable>
  )
}

export default DisplayTable;



 */


