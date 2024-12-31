import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

const AuthContext = createContext();

import { API_URL } from '../../config';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
            const response = await axios.post(
                `${API_URL}/auth/check`,  
                null,                     // No body is needed 
                {                         // Header with the token
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
          setUser(response.data.user);
        } catch (err) {
          console.error("Authentication check failed:", err);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (name, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        name,
        password,
      });

      const { token } = response.data;
      await AsyncStorage.setItem('token', token);
      setUser({ name });
      Alert.alert('Success', 'Login successful!');
    } catch (err) {
      console.error("Login failed:", err);
      Alert.alert('Error', err.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
