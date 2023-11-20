export function Form({ onAddActivity }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onAddActivity(data);
    console.log(data);
    event.target.reset();
    event.target.elements.name.focus();
  }
  return (
    <><h1>Add new Activity:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name"></input>
        <label htmlFor="checkbox-weather">Good-weather activity:</label>
        <input type="checkbox" id="checkbox-weather" name="checkbox-weather"></input>
        <button id="submit-button">Submit</button>
      </form>
    </>
  )
}
