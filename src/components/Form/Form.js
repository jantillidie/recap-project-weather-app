export function Form({ onAddActivity }) {
  //Funktion für Handhabung des Submit-Events
  function handleSubmit(event) {
    event.preventDefault();

    //Formatieren der Daten in Objekt
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    //Erweiterung des neuen Objektes um eine neue Property -> wichtig für main.js filteredList
    const newData = {
      isForGoodWeather: event.target.elements.checkboxWeather.checked,
      ...data,
    };

    //Das neue Objekt wird als Argument in die Funktion handleActivity() aus der Main übergeben. Diese Funktion wurde unter der Prop "onAddActivity" in die List.js hereingegben. Stichwort "State uplifting"
    onAddActivity(newData);

    //Löschend er Eingabe und fokussieren des Eingabefeldes
    event.target.reset();
    event.target.elements.name.focus();
  }
  return (
    <>
      <h1>Add new Activity:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name"></input>
        <label htmlFor="checkbox-weather">Good-weather activity:</label>
        <input
          type="checkbox"
          id="checkbox-weather"
          name="checkboxWeather"
        ></input>
        <button id="submit-button">Submit</button>
      </form>
    </>
  );
}
