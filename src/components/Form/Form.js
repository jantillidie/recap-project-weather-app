export function Form({ onAddActivity }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const newData = { isForGoodWeather: event.target.elements.checkboxWeather.checked, ...data };
    onAddActivity(newData);
    event.target.reset();
    event.target.elements.name.focus();
  }
  return (
    <><h1>Add new Activity:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name"></input>
        <label htmlFor="checkbox-weather">Good-weather activity:</label>
        <input type="checkbox" id="checkbox-weather" name="checkboxWeather"></input>
        <button id="submit-button">Submit</button>
      </form>
    </>
  )
}
