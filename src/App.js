import "./App.css";
import { Form } from "./components/Form/Form";
import { uid } from "uid";
import { List } from "./components/List/List.js";
import useLocalStorageState from "use-local-storage-state";
import { useEffect, useState } from "react";

function App() {
  //Initiierung der isGoodWeather Variablen unter Benutzung von useState -> State Initiierung
  const [isGoodWeather, setIsGoodWeather] = useState(0);

  //Initiierung + Speicherung der activities Variable in den lokal Storage.
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });

  //useEffect Function, hauptsächlich für FetchAPI. useEffect, sorgt dafür, dass die Funktion nicht dauerhaft läuft und den Browser abstürzten lässt.
  useEffect(() => {
    // Fetchen der API. Response ist ein promise und wird mittels der Funktion "json()" in ein Objekt umgewandelt.
    async function startFetching() {
      const response = await fetch(
        "https://example-apis.vercel.app/api/weather/europe"
      );
      const weather = await response.json();

      //setIsGoodWeather verändert den Wert von isGoodWeather auf das Objekt, welches in weather gespeichert ist.
      setIsGoodWeather(weather);
    }

    //Function Call
    startFetching();

    //Einrichten des Intervalls. setInterval sorgt dafür, dass startFetching alle 5 Sekunden aufgerufen wird.
    const intervalId = setInterval(startFetching, 5000);

    //Cleanup-Funktion des Intervalls. Sorgt dafür, dass die Intervall-FUnktion auf ihren ursprünglichen Wert zurückgesetzt wird.
    return () => clearInterval(intervalId);

    //Dependency-Array: Zeigt React, wie oft bzw. wann die komplette useEffect-Funktion aufgerufen wird. "[]" sorgt dafür, dass die jeweilige useEffect-Function nur einmal aufgerufen wird.
  }, []);

  //Update der State-Variablen activities anhand der Eingabefelder aus der Formkomponente. Eingabe-Werte aus der Formkomppnente werden über das Parameter "newActivity" reingereicht.
  function handleActivity(newActivity) {
    //Anreichern des neuen Objektes mit einer ID. Spread-Method wird benutzt, um das neue Objekt, um die Property "id" zu ergänzen. Danach wird die Spread-Method auf activities angewendet, um das neue Objekt dem Array of Objects anzufügen.
    const updatetActivity = [{ id: uid(), ...newActivity }, ...activities];
    //Tatsächliches Update der activities Variablen.
    setActivities(updatetActivity);
  }

  //Gefilterte Activities je nachdem, ob für gutes oder schlechtes Wetter geeignet. Filter() wird angewandt, um die Objekte aus activities zu sortieren.
  const filteredList = activities.filter((activity) => {
    //Abgleich, der List Items mit dem Wetter. Also Vergleich zweier booleanschen Werte. "acitvity.isForGoodWeather" wird durch Checkbox durch den Nutzer beeinflusst. "isGoodWeather.isGoodWeather" bekommen wir von der API.
    return activity.isForGoodWeather === isGoodWeather.isGoodWeather;
  });

  //Delete-Funktion für einzelne Einträge. "id" wird aus der Listkomponente hochgegeben -> "activity.id"
  function handleDeleteActivity(id) {
    //Verändern der activities Variable über Filter-Funktion. Alle Objekte, welche nicht die hereingegebene "id" besitzen bleiben erhalten.
    setActivities(
      activities.filter((activity) => {
        return activity.id !== id;
      })
    );
  }

  //Abrufen der Variablen, Kompnenten und Hereinreichend der Probs.
  return (
    <>
      <h1>
        {isGoodWeather.condition} {isGoodWeather.temperature}
      </h1>
      <List
        filteredList={filteredList}
        isGoodWeather={isGoodWeather}
        onDeleteActivity={handleDeleteActivity}
      >
        {" "}
      </List>
      <Form onAddActivity={handleActivity}> </Form>
    </>
  );
}

export default App;
