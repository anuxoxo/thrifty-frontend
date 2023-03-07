import { StyleSheet, SafeAreaView } from 'react-native'

import ImagePicker from '../helpers/ImagePicker'
import InputText from '../helpers/InputText'

const AddProduct = () => {
  return (
    <SafeAreaView style={styles.outerContainer}>
      <ImagePicker />
      <InputText />
    </SafeAreaView>
  )
}

export default AddProduct

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1
  },
})