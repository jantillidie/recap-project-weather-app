import "./App.css";
import { Form } from "./components/Form/Form";
import { uid } from "uid";
import { List } from "./components/List/List.js";
import useLocalStorageState from "use-local-storage-state";
import { useEffect, useState } from "react";

function App() {
  const [isGoodWeather, setIsGoodWeather] = useState(0);
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });

  useEffect(() => {
    async function startFetching() {
      const response = await fetch(
        "https://example-apis.vercel.app/api/weather/europe"
      );
      const weather = await response.json();
      setIsGoodWeather(weather);
      console.log(weather);
    }

    startFetching();


    const intervalId = setInterval(startFetching, 5000);

    return () => clearInterval(intervalId);

  }, []);

  function handleActivity(newActivity) {
    const updatetActivity = [{ id: uid(), ...newActivity }, ...activities];
    setActivities(updatetActivity);
  }

  const filteredList = activities.filter((activity) => {
    return activity.isForGoodWeather === isGoodWeather.isGoodWeather;
  });

  function handleDeleteActivity(id) {
    setActivities(
      activities.filter((activity) => {
        return activity.id !== id;
      })
    )
  }


  return (
    <>
      <h1>
        {isGoodWeather.condition} {isGoodWeather.temperature}
      </h1>
      <List filteredList={filteredList} isGoodWeather={isGoodWeather} onDeleteActivity={handleDeleteActivity}>
        {" "}
      </List>
      <Form onAddActivity={handleActivity}> </Form>
    </>
  );
}

export default App;
