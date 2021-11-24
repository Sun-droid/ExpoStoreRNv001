import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { TableHeader } from "./TableHeader";
interface IProduct {
  text: string;
  deleted: boolean;
}

export const ListDisplayMain: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [productList, setProducts] = useState<IProduct[]>([]);
  const [error, showError] = useState<Boolean>(false);

  const handleSubmit = (): void => {
    if (value.trim())
      setProducts([...productList, { text: value, deleted: false }]);
    else showError(true);
    setValue("");
  };

  const removeItem = (index: number): void => {
    const newProductList = [...productList];
    newProductList.splice(index, 1);
    setProducts(newProductList);
  };

  const toggleDelete = (index: number): void => {
    const newProductList = [...productList];
    newProductList[index].deleted = !newProductList[index].deleted;
    setProducts(newProductList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Products :</Text>
      {productList.length === 0 && <Text>Products add</Text>}
      {productList.map((product: IProduct, index: number) => (
        <View style={styles.listItem} key={`${index}_${product.text}`}>
          <Text
            style={[
              styles.task,
              { textDecorationLine: product.deleted ? "line-through" : "none" }
            ]}
          >
            {product.text}
          </Text>
          <Button
            title={product.deleted ? "Deleted" : "Delete"}
            onPress={() => toggleDelete(index)}
          />
          <Button
            title="X"
            onPress={() => {
              removeItem(index);
            }}
            color="crimson"
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 35,
    alignItems: "center"
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  inputBox: {
    width: 200,
    borderColor: "purple",
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 8
  },
  title: {
    fontSize: 40,
    marginBottom: 40,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 0,
    color: "purple"
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10
  },

  task: {
    width: 200
  },
  error: {
    color: "red"
  }
});