import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import AppConfig from "./configs";
import { Weather } from "./weather";
import WeatherInfo from "./WeatherInfo";

const App: React.FC = () => {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState<Weather | null>(null);

  const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  const suffix = `&units=imperial&appid=${AppConfig.API_KEY}`;

  const has = (value: any): value is boolean => !!value;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    getWeather(city);
  };

  const getWeather = async (city: string) => {
    const response = await fetch(baseUrl + city + suffix);
    if (response.status === 200) {
      const jsonWeather = await response.json();
      const cityTemp: Weather = jsonWeather.main;
      cityTemp.city = jsonWeather.name;
      setWeather(cityTemp);
      console.log(jsonWeather);
    } else {
      setWeather(null);
    }
  };

  const [msgFromChild, setMsgFromChild] = useState("");
  const getMsgFromChild = (msg: string) => setMsgFromChild(msg);

  useEffect(() => {
    getWeather(city);
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter City" onChange={handleChange} />
        <button type="submit">Get weather</button>
        <h2>City: {city}</h2>
      </form>
      {msgFromChild}
      {has(weather) ? (
        <WeatherInfo weather={weather} parentChannel={getMsgFromChild} />
      ) : (
        <h2>No Weather available!</h2>
      )}
    </>
  );
};

export default App;
