import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import Checkbox from 'expo-checkbox';

export default function CheckboxText({ item, label, setItem, defaultIsChecked }) {

  const [isChecked, setIsChecked] = useState(defaultIsChecked)
  function handleCheck() {
    // if selected
    if (!isChecked) {
      setItem(prev => [...prev, item])
    } else {
      setItem(prev => {
        return prev.filter(p => p.value !== item.value)
      })
    }
    setIsChecked(!isChecked)
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.title}>{label}</Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={handleCheck}
          color={isChecked ? '#8065F8' : undefined}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
    marginHorizontal: 15,
    paddingHorizontal: 7,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  innerContainer: {
    flexDirection: "row",
  },
  title: {
    paddingVertical: 8,
  },
  btnContainer: {
    alignSelf: "center",
    justifyContent: "center"
  },
  checkbox: {
    marginRight: 16,
    alignSelf: "center"
  }
})