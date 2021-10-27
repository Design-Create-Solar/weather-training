import "./Weather.css";
import React, { useState } from "react";

const Weather = () => {
  const key = "df475f8d84a4db025ed27d5dc1c38d06";
  const [location, setLocation] = useState(null);
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInput = (e) => {
    setLocation(e.target.value);
  };
  const handleSubmit = () => {
    setSuccess(null);
    if (!location.match(/^[a-zA-Z]+$/g))
      return setErr(
        "Invalid location, make sure it's just the city/country using only alphabetical characters (i.e. London)!"
      );

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`
    )
      .then((response) => {
        if (!response.ok) return setErr("Invalid location.");
        return response.json();
      })
      .then((data) => {
        if (!data) return;
        let { coord, weather, main, name, sys } = data;
        const info = {
          name: name,
          country: sys.country,
          lat: coord.lat,
          lon: coord.lon,
          weather: weather[0].description,
          temp: parseFloat(main.temp - 273.15).toFixed(2),
          humidity: main.humidity,
        };

        setSuccess(info);
        setErr(null);
      });
  };

  return (
    <div className="container">
      <h1>Choose a location.</h1>
      <input onChange={(e) => handleInput(e)} className="input"></input>
      <div onClick={() => handleSubmit()} className="submit">
        Submit
      </div>
      {err && (
        <div className="err">
          <p>{err}</p>
        </div>
      )}
      {success && (
        <div className="success">
          <p>
            {success.name}, {success.country}
          </p>
          <p>
            Looks like {success.weather}! ({success.temp}℃)
          </p>
          <p>
            Location: ({success.lat},{success.lon})
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
