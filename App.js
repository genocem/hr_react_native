import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import LoginScreen from './components/authentification/loginScreen';
import Register from './components/authentification/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Routes from './components/navigation/Routes';
import { AuthProvider } from './components/authentification/AuthContext';
const Stack = createStackNavigator();

export default function App() {

return( 
<AuthProvider>
       <Routes/>
    </AuthProvider>

 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
