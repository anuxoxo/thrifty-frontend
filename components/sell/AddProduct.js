import { StyleSheet, SafeAreaView } from 'react-native'

import ImagePicker from '../helpers/ImagePicker'
import Form from './Form'

const AddProduct = () => {
  return (
    <SafeAreaView style={styles.outerContainer}>
      <ImagePicker />
      <Form />
    </SafeAreaView>
  )
}

export default AddProduct

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1
  },
})