import { useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import TaskCard from '../components/TaskCard';


export default function AddTaskScreen() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [quote, setQuote] = useState("Loading today's motivation...");

useEffect(() => {
// 1. Guard check: Do not execute query if user is not yet loaded
const user = auth.currentUser;
if (!user) return;
const tasksQuery = query(
collection(db, 'tasks'),
where('ownerId', '==', user.uid)
);
const unsubscribe = onSnapshot(
tasksQuery,
(snapshot) => {
const loadedTasks = snapshot.docs.map((docItem) => ({
id: docItem.id,
...docItem.data(),
}));
setTasks(loadedTasks);
},
(error) => {
console.error('Firestore listener error:', error.message);
}
);
return () => unsubscribe();
}, []);

useEffect(() => {
const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
const loadedTasks = snapshot.docs.map((docItem) => ({
id: docItem.id,
...docItem.data(),
}));
setTasks(loadedTasks);
});
return unsubscribe;
}, []);
  
useEffect(() => {

fetch('https://api.quotable.io/random')
.then((response) => response.json())
.then((data) => setQuote(data.content))

.catch(() => setQuote('Believe in yourself and get it done!'));

}, []);

async function handleAddTask() {
  if (taskText.trim() === '') {
    setErrorMessage('Please type a task before adding it.');
    return;
  }

  const user = auth.currentUser;
  if (!user) {
    setErrorMessage('User session not found. Please log in again.');
    return;
  }

  try {
    await addDoc(collection(db, 'tasks'), {
      title: taskText.trim(),
      done: false,
      ownerId: user.uid,
    });
    setTaskText('');
    setErrorMessage('');
  } catch (error) {
    setErrorMessage(error.message);
  }
}

async function handleToggleTask(id, currentDone) {
await updateDoc(doc(db, 'tasks', id), { done: !currentDone });
}
async function handleDeleteTask(id) {
await deleteDoc(doc(db, 'tasks', id));
}

  

  return (
    <View style={styles.container}>
          <Text style={styles.quote}>💬 {quote}</Text>
          <Button
title="New Quote"
onPress={() => {

fetch('https://api.quotable.io/random')
.then((response) => response.json())
.then((data) => setQuote(data.content));

}}
/>
      <Text style={styles.heading}>Add a Task</Text>

      <TextInput
        style={styles.input}
        placeholder="What do you need to do?"
        value={taskText}
        onChangeText={setTaskText}
      />

      {errorMessage !== '' && (
        <Text style={styles.error}>{errorMessage}</Text>
      )}

      <Button title="Press me :3" onPress={handleAddTask} />

      <Text>You have {tasks.length} task(s)</Text>

      {tasks.length > 0 && tasks.every((task) => task.done) && (
        <Text style={styles.celebration}>🎉 All done! Great work!</Text>
      )}

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
<TaskCard
title={item.title}
done={item.done}
onToggle={() => handleToggleTask(item.id, item.done)}
onDelete={() => handleDeleteTask(item.id)}

/>
)}
        ListEmptyComponent={
          <Text style={styles.empty}>No tasks yet — add one above! 👆</Text>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.list}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D8DEE9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  list: {
    marginTop: 16,
  },
  empty: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 24,
  },
  separator: {
    height: 8,
  },
  error: {
    color: '#B23A48',
    marginBottom: 10,
  },
  celebration: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E8A7A',
    textAlign: 'center',
    marginVertical: 12,
  },
  quote: { fontStyle: 'italic', color: '#6B7280', marginBottom: 16, textAlign: 'center'

},
});