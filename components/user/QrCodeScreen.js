import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';

import SvgQRCode from 'react-native-qrcode-svg';

export default function QrCodeScreen() {
  const params = useRoute().params;
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <SvgQRCode
        size={width / 2}
        value={`Order ID : ${params._id}\nProduct Name : ${params.product.name}\nAmount : Rs. ${params.bidAmount}\nOrder Status: Delivered`}
      />
      <Text style={{
        padding: 50,
        fontWeight: "bold",
        textAlign: "center",
        width: "87%",
        fontSize: 17
      }}>
        Ask the Buyer to scan the above QR code to complete the delivery!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 200
  }
})