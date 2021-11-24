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
} from "react-native";
import { StackScreens } from "../helpers/types";
import { NavigationContainer } from "@react-navigation/native";
import { ListDisplayMain } from "../Lists/ListDisplayMain";
import { AddProduct } from "./components/AddProduct";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styled from 'styled-components'


export const Page1: React.FC<
  NativeStackScreenProps<StackScreens, "Page1">
> = (props) => {
  const [enteredValue, setEnteredValue] = React.useState("");
//   const Stack = createNativeStackNavigator<StackScreens>();

  return (
    <View style={styles.container}>
        <View>
            <ListDisplayMain/>
        </View>
      <TouchableOpacity
              style={styles.button}
              onPress={() => props.navigation.navigate("CreateNewProduct")}
            >
              <Text style={styles.buttonText}>Click to go to Simple Page</Text>
      </TouchableOpacity>
      <View>
        <Text>Hello</Text>
{/*         <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                name="List Main"
                component={ListDisplayMain}
                />
            </Stack.Navigator>
        </NavigationContainer> */}
      </View>
      <AddProduct/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
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


