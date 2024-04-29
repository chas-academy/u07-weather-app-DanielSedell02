import { useState, useEffect, ChangeEvent } from "react";

import { optionType, forecastType } from "../types";

const useForecast = () => {
  const [term, setTerm] = useState<string>("");
  const [city, setCity] = useState<optionType | null>(null);
  const [options, setOptions] = useState<[]>([]);
  const [forecast, setForecast] = useState<forecastType | null>(null);

  const getSearchOptions = (value: string) => {
    // for the api key to work

    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setOptions(data))

      // Handle the response data

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);
    //if not empty calls a function to fetch search options based on the input value
    if (value === "") return;

    getSearchOptions(value);
  };

  const getForecast = (city: optionType) => {
    // for the api key to work

    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const foreCastData = {
          ...data.city,
          // limiting hours of forecast
          list: data.list.slice(0, 32),
        };
        setForecast(foreCastData);
      })

      // Handle the response data

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const onSubmit = () => {
    if (!city) return;

    getForecast(city);
  };

  //-----
  //updates the city state with a selected option
  const onOptionSelect = (option: optionType) => {
    setCity(option);
  };
  //useEffect
  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
    }
  }, [city]);

  return {
    term,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
  };
};

export default useForecast;
