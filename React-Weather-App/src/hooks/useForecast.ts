import { useState, useEffect, ChangeEvent } from "react";

import { optionType, forecastType } from "../types";

const useForecast = () => {
  const [term, setTerm] = useState<string>("");
  const [city, setCity] = useState<optionType | null>(null);
  const [options, setOptions] = useState<[]>([]);
  const [forecast, setForecast] = useState<forecastType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getSearchOptions = (value: string) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setOptions(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch location data");
      });
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);
    setError(null);
    if (value === "") return;
    getSearchOptions(value);
  };

  const getForecast = (lat: number, lon: number) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const foreCastData = {
          ...data.city,
          list: data.list.slice(0, 32),
        };
        setForecast(foreCastData);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching forecast:", error);
        setError("Failed to fetch weather data");
      });
  };

  const onSubmit = () => {
    if (!city) return;
    getForecast(city.lat, city.lon);
  };

  const getLocationForecast = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getForecast(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        setError("Failed to get your location. Please check your location permissions.");
      }
    );
  };

  const onOptionSelect = (option: optionType) => {
    setCity(option);
    setError(null);
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
    error,
    onInputChange,
    onOptionSelect,
    onSubmit,
    getLocationForecast,
  };
};

export default useForecast;
