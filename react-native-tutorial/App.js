import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert, FlatList } from 'react-native';
// using for Android - SafeAreaView within 'react-native' only works for iOS
import { SafeAreaView } from 'react-native-safe-area-context'; 


const DATA = [
  {
    'id': '1',
    title: 'Mediation'
  },
  {
    'id': '2',
    title: 'Coding'
  },
  {
    'id': '3',
    title: 'Journaling'
  }
]

const TodoItem = (props) => (
  <View style={styles.item}>
    <Text style={styles.itemText}>{props.item.title}</Text>
  </View>
)

// functional component
export default function App() {
  return (
    // this matches with styles in line 15
    // and container in line 16
    // SafeAreaView is a wrapper for the view - to have the content go under the status bar
    <SafeAreaView style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <TextInput style={styles.input}/>
      <Button title='Start' onPress={() => Alert.alert('Simple Button pressed')}/>
      <FlatList
      style={styles.list}
        data={DATA}
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
  }
});
