import React from "react";
import { Weather } from "./weather";

const WeatherInfo: React.FC<{
  weather: Weather;
  parentChannel: (msg: string) => void;
}> = (props) => {
  const { city, humidity, pressure, temp, temp_max, temp_min } = props.weather;

  return (
    <div>
      <button onClick={() => props.parentChannel("hello from child")}>
        say hello
      </button>
      <h2>City: {city}</h2>
      <h2>Temperature: {temp}</h2>
      <h2>Max Temperature: {temp_max}</h2>
      <h2>Min Temperature: {temp_min}</h2>
      <h2>Humidity: {humidity}</h2>
      <h2>Pressure: {pressure}</h2>
    </div>
  );
};

export default WeatherInfo;
