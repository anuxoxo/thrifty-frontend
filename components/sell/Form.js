import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Text,
  Pressable,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";

import { categories } from "../../utils/data";
import CheckboxText from "../helpers/CheckboxText";

export default function Form() {
  const [name, onChangeName] = useState("");
  const [location, onChangeLocation] = useState("");
  const [number, onChangeNumber] = useState("");

  const [selectedCategory, setSelectedCategory] = useState([]);

  const dimension = useWindowDimensions();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="Name"
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeLocation}
        value={location}
        placeholder="Location"
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Price"
        keyboardType="numeric"
        inputMode="numeric"
      />
      <Text style={styles.title}>Select Category</Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CheckboxText
            item={item}
            label={item.label}
            setItem={setSelectedCategory}
            defaultIsChecked={false}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <Pressable style={[styles.btnContainer, { width: dimension.width - 50 }]}>
        <Text style={{ color: "white", alignSelf: "center" }}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 5,
    color: "grey",
    fontSize: 16,
  },
  checkbox: {
    marginRight: 16,
    alignSelf: "center",
  },
  title: {
    color: "grey",
    fontSize: 14,
    padding: 20,
    fontWeight: "bold",
  },
  btnContainer: {
    flex: 1,
    alignSelf: "center",
    position: "absolute",
    bottom: 30,
    backgroundColor: "#8065F8",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
});
