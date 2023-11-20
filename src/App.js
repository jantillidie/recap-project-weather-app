import { useState } from 'react';
import './App.css';
import { Form } from './components/Form/Form';
import { uid } from 'uid';

function App() {
  const [activities, setActivities] = useState([]);
  function handleActivity(newActivity) {
    const updatetActivity = [{ id: uid(), ...newActivity }, ...activities];
    setActivities(updatetActivity);
    console.log(updatetActivity);
  }
  return (
    <Form onAddActivity={handleActivity}></Form>
  );
}

export default App;
