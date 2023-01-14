import { useLayoutEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './navigation/AuthStack'
import AuthenticatedStack from './navigation/AuthenticatedStack'

import AuthContextProvider from "./store/authContext"

import { manageToken } from './utils';

function Outlet() {
  const [currentStack, setCurrentStack] = useState(<></>)

  useLayoutEffect(() => {
    manageToken().then(token => {
      if (token)
        setCurrentStack(<AuthenticatedStack />)
      else
        setCurrentStack(<AuthStack />)
    })
  }, [])

  return <>{currentStack}</>
}

export default function App() {
  return (
    <AuthContextProvider>

      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Outlet />
        </SafeAreaView>
      </NavigationContainer>

    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});
