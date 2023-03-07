import { StyleSheet, View, TextInput } from 'react-native'
import React, { useState } from 'react'

import { categories } from "../../utils/data"

export default function InputText() {
  const [name, onChangeName] = useState("")
  const [location, onChangeLocation] = useState("")
  const [number, onChangeNumber] = useState("")
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
        inputMode='numeric'
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 5,
    color: "grey",
    fontSize: 16
  }
})