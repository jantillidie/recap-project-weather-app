import { useState } from "react";
import "./App.css";
import { Form } from "./components/Form/Form";
import { uid } from "uid";
import { List } from "./components/List/List.js";

function App() {
  const [activities, setActivities] = useState([]);

  function handleActivity(newActivity) {
    const updatetActivity = [{ id: uid(), ...newActivity }, ...activities];
    setActivities(updatetActivity);
  }
  return (
    <>
      <List activities={activities}> </List>
      <Form onAddActivity={handleActivity}> </Form>;
    </>
  );
}

export default App;
