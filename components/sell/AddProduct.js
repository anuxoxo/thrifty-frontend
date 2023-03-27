import { StyleSheet, SafeAreaView } from 'react-native'
import { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Authcontext } from '../../store/authContext'
import { SellContext } from '../../store/sellContext'

import CustomImagePicker from '../helpers/CustomImagePicker'
import Form from './Form'

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const { user } = useContext(Authcontext);
  const { addProductToSell } = useContext(SellContext);
  const navigation = useNavigation();

  async function submitHandler(formData) {
    const data = { ...formData, images, sellerId: user._id };
    const result = await addProductToSell(data);
    if (result) {
      navigation.goBack();
    }
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      <CustomImagePicker images={images} setImages={setImages} />
      <Form submitHandler={submitHandler} />
    </SafeAreaView>
  )
}

export default AddProduct

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1
  },
})