export function List({ filteredList, isGoodWeather, onDeleteActivity }) {
  return (
    <>
      {isGoodWeather.isGoodWeather ?
        (<h1>The weather is awesome! Go outside and:</h1>)
        :
        (<h1>Bad weather outside! Here is what you can do now.</h1>)
      }
      <ul>
        {filteredList.map((activity) => {
          return <li key={activity.id}>{activity.name} <button onClick={() => onDeleteActivity(activity.id)}>X</button></li>;
        })}
      </ul>
    </>
  );
}
