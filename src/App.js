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
    );
  }

  return (
    <>
      <header className="weather-header">
        <h1 className="weather-title">
          {isGoodWeather.condition} {isGoodWeather.temperature}°C
        </h1>
      </header>
      <main>
        <List
          filteredList={filteredList}
          isGoodWeather={isGoodWeather}
          onDeleteActivity={handleDeleteActivity}
        >
          {" "}
        </List>
        <hr />
        <Form onAddActivity={handleActivity}> </Form>
      </main>
    </>
  );
}

export default App;
