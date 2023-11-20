import "./App.css";
import { Form } from "./components/Form/Form";
import { uid } from "uid";
import { List } from "./components/List/List.js";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const isGoodWeather = true;
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });

  function handleActivity(newActivity) {
    const updatetActivity = [{ id: uid(), ...newActivity }, ...activities];
    setActivities(updatetActivity);
  }

  const filteredList = activities.filter((activity) => {
    return activity.isForGoodWeather === isGoodWeather;
  })

  return (
    <>
      <List filteredList={filteredList} isGoodWeather={isGoodWeather}> </List>
      <Form onAddActivity={handleActivity}> </Form>
    </>
  );
}

export default App;
