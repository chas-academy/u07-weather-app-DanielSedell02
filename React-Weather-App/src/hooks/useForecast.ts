import { useState, useEffect, ChangeEvent } from "react";

import { optionType } from "../types";

const useForecast = () => {
  const [term, setTerm] = useState<string>("");
  const [city, setCity] = useState<optionType | null>(null);
  const [options, setOptions] = useState<[]>([]);
  const [forecast, setForecast] = useState<null>(null);

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

    if (value === "") return;

    getSearchOptions(value);
  };

  const getForecast = (city: optionType) => {
    // for the api key to work

    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setForecast(data))

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

  const onOptionSelect = (option: optionType) => {
    setCity(option);
  };

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
  };
};

export default useForecast;
