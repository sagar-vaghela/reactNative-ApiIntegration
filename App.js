import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';


const App = () => {
  const [data, setData] = useState([]);
  const [ isLoading, setLoading] = useState(true);


  const getUsers = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
       {isLoading ? <ActivityIndicator/> : (
        <View>
             <Text style={styles.heading}>Api-Integration Data</Text>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View style={styles.container}>
            <Text style={styles.item}>Name : {item.name}</Text>
            <Text style={styles.item}>Phone : {item.phone}</Text>
            <Text style={styles.item}>Adress : {item.address.city}</Text>
            <Text style={styles.item}>Cmpany : {item.company.name}</Text>
          </View>
          
        )}
      />
      </View>
       )}
       
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 40, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  heading: { height: 50,paddingTop: 30,padding: 16,}
});
