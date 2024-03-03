import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert, Modal, FlatList, TouchableOpacity } from 'react-native';
// using for Android - SafeAreaView within 'react-native' only works for iOS
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { Ionicons } from '@expo/vector-icons';
import { styles } from './App.style';

const DATA = [
  {
    'id': '1',
    title: 'Mediation',
    completed: false,
  },
  {
    'id': '2',
    title: 'Coding',
    completed: false,
  },
  {
    'id': '3',
    title: 'Journaling',
    completed: false,
  }
]

// functional component
export default function App() {
  const [items, setItems] = useState(DATA);
  const [text, setText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  //function to add new one
  const addNewToDo = () => {
    let newTodo = {
      id: items.length + 1,
      title: text,
      completed: false,
    }

    setItems([...items, newTodo]); // wrapping into new array for immutability
    setText(""); // clear the input field
    setIsModalVisible(false); // close the modal
  }

  const markItemCompleted = (item) => {
    const itemIdx = items.findIndex(currItem => currItem.id === item.id);
    if(itemIdx !== -1){
      const updatedItems = [...items];
      updatedItems[itemIdx] = {...items[itemIdx], completed: true};
      setItems(updatedItems);
    }
  }

  const TodoItem = (props) => (
    <TouchableOpacity style={styles.item} onPress={() => markItemCompleted(props.item)}>
      <Text style={props.item.completed ? styles.itemTextCompleted : styles.itemText}>{props.item.title}</Text>
    </TouchableOpacity>
  )

  return (
    // SafeAreaView is a wrapper for the view - to have the content go under the status bar
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <View style={styles.icon}>
          <Ionicons name="add" size={24} color="#652E00"/>
        </View>
      </TouchableOpacity>
      <Modal visible={isModalVisible} transparent={true} onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TextInput style={styles.input} onChangeText={setText} value={text}/>
          <Button title='Add Todo' onPress={addNewToDo}/>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
      <FlatList
      style={styles.list}
        data={items}
        renderItem={({item}) => <TodoItem item={item}/>}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
