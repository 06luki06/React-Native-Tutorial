import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert, FlatList, TouchableOpacity } from 'react-native';
// using for Android - SafeAreaView within 'react-native' only works for iOS
import { SafeAreaView } from 'react-native-safe-area-context'; 


const DATA = [
  {
    'id': '1',
    title: 'Mediation',
    completed: false
  },
  {
    'id': '2',
    title: 'Coding',
    completed: false
  },
  {
    'id': '3',
    title: 'Journaling',
    completed: false
  }
]

// functional component
export default function App() {
  const [items, setItems] = useState(DATA);
  const [text, setText] = useState("");
  
  //function to add new one
  const addNewToDo = () => {
    let newTodo = {
      id: items.length + 1,
      title: text,
      completed: false
    }

    setItems([...items, newTodo]); // wrapping into new array for immutability
    setText(""); // clear the input field
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
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <TextInput style={styles.input} onChangeText={setText} value={text}/>
      <Button title='Add Todo' onPress={addNewToDo}/>
      <FlatList
      style={styles.list}
        data={items}
        renderItem={({item}) => <TodoItem item={item}/>}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    padding: 10,
    borderColor: 'gray',
  },
  list:{
    alignSelf: 'stretch',
  },
  item:{
    backgroundColor: '#6DB6DD',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  itemText:{
    color: '#FFFF'
  },
  itemTextCompleted:{
    color: '#FFFF',
    textDecorationLine: 'line-through'
  }
});
