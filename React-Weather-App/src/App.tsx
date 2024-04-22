import { ChangeEvent, useEffect, useState } from "react";
import { optionType } from "./types";
import Search from "./components/Search";

const App = (): JSX.Element => {
  const [term, setTerm] = useState<string>("");
  const [city, setCity] = useState<optionType | null>(null);
  const [options, setOptions] = useState<[]>([]);
  const [Forecast, setForecast] = useState<forecastType | null>(null);

  const getSearchOptions = (value: string) => {
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

  // for the api key to work

  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
    }
  }, [city]);

  return (
    <main
      className="flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500
    h-[100vh] w-full"
    >
      {Forecast ? (
        "we have a forecast"
      ) : (
        <Search
          term={term}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
        />
      )}
    </main>
  );
};

export default App;
