import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Button, Alert, Keyboard, Text, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import { TextInput, Appbar, List } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const HomeScreen = () =>  {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    firebase.database().ref('movies/').on('value', snapshot => {
      const data = snapshot.val();
      const movies = data ? Object.keys(data).map(key => ({ key, ...data[key] })) : [];
      setItems(movies);
    });
  }, []);

  const saveItem = () => {
    if (name && rating) {
    firebase.database().ref('movies/').push(
      { 'name': name, 'rating': rating, 'comment': comment},
      () => {
        setName('');
        setRating('');
        setComment('');
        Keyboard.dismiss();
      }
    );
    }
    else {
      Alert.alert('Error', 'Name and rating fields must not be empty!')
    }
  }

  const deleteItem = (key) => {
    console.log('deleteItem', key, items.find(item => item.key === key));
    firebase.database().ref('movies/' + key).remove();
  };

  return (
    <View style={styles.container}>
      <Appbar>
        <Appbar.Content title={"Arraynge"} />
      </Appbar>
      <TextInput
        style={styles.nameInput}
        label={"Name"} 
        onChangeText={(name) => setName(name)}
        value={name}
      />

      <TextInput 
        label={"Numeric rating"}
        keyboardType='numeric' 
        style={styles.numberInput}
        onChangeText={(rating) => setRating(rating)}
        value={rating}
      />

      <TextInput 
        placeholder='Comment (optional)' 
        style={styles.commentInput}
        onChangeText={(comment) => setComment(comment)}
        value={comment}
        />

      <Button 
        onPress={saveItem} 
        title="Save" 
        color="teal"
      />

      <Text style={styles.listHeader}> Your list </Text>

      <FlatList
        style={{marginLeft: "5%"}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => 
        <View style={styles.listcontainer}>
          <TouchableOpacity onLongPress={() => deleteItem(item.key)}>
            <Text style={{fontSize: 18}}>Name: {item.name}</Text>
            <Text style={{fontSize: 18}}>Rating: {item.rating}</Text>
            <Text style={{fontSize: 18}}>Comment: {item.comment}</Text>
          <TouchableOpacity
            onPress={() => deleteItem(item.key)}
          >
          <FontAwesome5
            style={{ color: "red", textAlign: "center" }}
            name="trash"
            size={18}
          />
          </TouchableOpacity>
        </TouchableOpacity>
        </View>
        }
        data={items} 
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  nameInput: {
    marginTop: 30, 
    fontSize: 18, 
    width: 200, 
    borderColor: 'gray', 
    borderWidth: 1
  },
  numberInput: {
    marginTop: 5,
    marginBottom: 5, 
    fontSize: 18, 
    width: 200, 
    borderColor: 'gray', 
    borderWidth: 1
  },
  commentInput: {
    marginTop: 5,
    marginBottom: 5, 
    fontSize: 18, 
    width: 200, 
    borderColor: 'gray', 
    borderWidth: 1
  },
  listHeader: {
    marginBottom: 10, 
    fontWeight: "bold", 
    marginTop: 30, 
    fontSize: 20
  },
});