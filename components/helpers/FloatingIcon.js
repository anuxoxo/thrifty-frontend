import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

const FloatingIcon = ({ customStyles, pressHandler }) => {
  return (
    <TouchableOpacity onPress={pressHandler} style={[styles.container, customStyles]}>
      <MaterialIcons name="add" size={22} color="white" />
    </TouchableOpacity>
  )
}

export default FloatingIcon

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
    backgroundColor: "#724CF9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    margin: 5,
    position: "absolute",
    bottom: 20,
    right: 20
  }
})