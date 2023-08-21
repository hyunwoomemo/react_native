import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { theme } from './color';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

const STORAGE_KEY = '@toDos'

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState('')
  const [toDos, setToDos] = useState({})
  useEffect(() => {
    loadToDos();
    loadLocation();
  }, [])
  const travel = async () => {
    try {
      setWorking(false)
      await AsyncStorage.setItem('location', 'travel')
    } catch (err) {
      console.error(err)
    }
  };
  const work = async () => {
    try {
      setWorking(true)
      await AsyncStorage.setItem('location', 'work')
    } catch (err) {
      console.error(err)
    }
  };
  const onChangeText = (payload) => setText(payload);

  const saveToDos = async (toSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    } catch (err) {
      console.error(err)
    }
  }
  const loadToDos = async () => {
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY)
      if (s) {
        setToDos(JSON.parse(s))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const loadLocation = async () => {
    try {
      const location = await AsyncStorage.getItem('location');
      location === 'work' ? setWorking(true) : setWorking(false)
    } catch (err) {
      console.error(err);
    }
  }

  const addTodo = async () => {
    if (text === '') {
      return
    }
    // save to do
    // const newToDos = Object.assign({}, toDos, {[Date.now()]: {text, work: working}})
    const newToDos = { ...toDos, [Date.now()]: { text, working } }
    setToDos(newToDos)
    await saveToDos(newToDos)
    setText("")
  }

  const deleteToDo = (key) => {
    Alert.alert(
      'Delete To Do?',
      'Are you sure?',
      [
        { text: 'Cancel' },
        {
          text: "I'm sure",
          style: 'destructive',
          onPress: () => {
            const newToDos = { ...toDos };
            delete newToDos[key];
            setToDos(newToDos);
            saveToDos(newToDos)
        } }
      ])
  }

  const doneToDo = (key) => {
    const newToDos = { ...toDos };
    newToDos[key].done = !newToDos[key].done;
    setToDos(newToDos);
    saveToDos(newToDos);
    console.log(newToDos)
  }

  const editToDo = (key) => {
    const newToDos = { ...toDos }
    newToDos[key].edit = !newToDos[key].edit;
    setEditText(newToDos[key].text)
    setToDos(newToDos);
    saveToDos(newToDos)
  }

  const editDone = async (key) => {
    const done = toDos[key].done
    const newToDos = { ...toDos, [key]: { text: editText, working, done} }
    setToDos(newToDos);
    await saveToDos(newToDos)
    console.log(newToDos)
  }

  const onChangeEditText = (payload) => setEditText(payload)

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{ ...styles.btnText, color: working ? 'white' : theme.grey }}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{ ...styles.btnText, color: !working ? 'white' : theme.grey }}>Travel</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onSubmitEditing={addTodo}
        returnKeyType='done'
        onChangeText={onChangeText}
        style={styles.input}
        value={text}
        placeholder={working ? 'Add a To Do' : 'Where do you want to go?'} />
      <ScrollView>
        {Object.keys(toDos).map(key =>
          toDos[key].working === working ?
            toDos[key].edit ? 
            <View style={styles.toDo} key={key}>
                <TextInput
                  onChangeText={onChangeEditText}
                  autoFocus={true}
                  onBlur={() => editDone(key)}
                  value={editText}
                  style={styles.editInput}
                  returnKeyType='done'
                ></TextInput>
          </View>
             :
            <View style={styles.toDo} key={key}>
              <Text onPress={() => editToDo(key)} style={{...styles.toDoText, textDecorationLine: toDos[key].done ? 'line-through' : 'none', color: toDos[key].done ? theme.grey : 'white'}}>{toDos[key].text}</Text>
              <TouchableOpacity onPress={() => doneToDo(key)}>
                <AntDesign name={toDos[key].done ? "checksquare" : "checksquareo"} size={18} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <Fontisto name="trash" size={18} color={theme.grey} />
              </TouchableOpacity>
            </View>
            : null
        )
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20
  },
  header: {
    justifyContent: 'space-between',
    marginTop: 100,
    flexDirection: 'row'
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
    color: 'white'
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 20,
    borderRadius: 30,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    alignItems: 'center'
  },
  toDoText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    marginRight: 'auto'
  },
  deleteBtn: {
    fontSize: 16,
    color: "tomato",
  },
  editInput: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    marginRight: 'auto'
  }
});
