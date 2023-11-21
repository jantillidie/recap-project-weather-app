import "./List.css";

export function List({ filteredList, isGoodWeather, onDeleteActivity }) {
  return (
    <section className="list-section">
      {isGoodWeather.isGoodWeather ? (
        <h2>The weather is awesome! Go outside and:</h2>
      ) : (
        <h2>Bad weather outside! Here is what you can do now.</h2>
      )}
      <ul>
        {filteredList.map((activity) => {
          return (
            <li key={activity.id}>
              {activity.name}{" "}
              <button
                className="button-delete"
                onClick={() => onDeleteActivity(activity.id)}
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
