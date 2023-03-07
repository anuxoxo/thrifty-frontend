import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import ImagePicker from '../helpers/ImagePicker'

const AddProduct = () => {
  return (
    <SafeAreaView style={styles.outerContainer}>
      <ImagePicker />
    </SafeAreaView>
  )
}

export default AddProduct

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1
  },
})