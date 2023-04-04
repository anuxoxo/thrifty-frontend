import { Image, View, Text } from 'react-native'
import React, { useEffect } from 'react'
import bidSuccess from "../../assets/images/common/bidSuccess.png"
import { useNavigation } from '@react-navigation/native'

export default function Success() {
  const navigation = useNavigation()

  useEffect(() => {
    const time = setTimeout(() => {
      navigation.goBack();
    }, 1500)

    return () => {
      clearTimeout(time)
    }
  }, [])

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Image source={bidSuccess}
        style={{
          width: "40%",
          height: "40%",
          aspectRatio: 1.2,
        }} />
      <Text style={{
        fontSize: 20,
        fontWeight: "bold"
      }}>Success!</Text>
    </View>
  )
}
