import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { API_URL } from '../../config';
export default function Employees() {
  const [data, setData] = useState([]);
  

  const getAPICall = async () => {
    try {
      const response = await fetch(`${API_URL}/employees`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Fetched data:", result);
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    getAPICall();
  }, []);

  return (
    <View style={styles.container}>
      <Text>imma make it so that the database stuff are under this text</Text>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View>
              <Text>{item.id}</Text>
              <Text>{item.name}</Text>
              <Text>{item.role}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()} // Assumes `id` is unique
        />
      ) : (
        <Text>Loading...</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}