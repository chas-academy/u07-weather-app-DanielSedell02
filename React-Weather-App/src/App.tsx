import { ChangeEvent, useState } from "react";
import { optionType } from "./types";

const App = (): JSX.Element => {
  const [term, setTerm] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);

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

  const onOptionSelect = (option: optionType) => {
    console.log(option.name);
  };

  return (
    <main
      className="flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500
    h-[100vh] w-full"
    >
      <section
        className="w-full md:max-w-[500px] p-4 flex flex-col 
      text center items-center justify-center md:px-10 lg:p-24 
      h-full lg:h-[500px] bg-white bg-opacity-40"
      >
        <h1 className="text-3xl">Weather Forecast</h1>
        <div className="relative flex items-center">
          <input
            type="text"
            value={term}
            className="flex-1 px-3 py-2 rounded-l-md border border-white focus:outline-none"
            onChange={onInputChange}
          />

          <ul className=" absolute top-9 bg-white m1-1 rounded-b-md">
            {options.map((option: optionType, index: number) => (
              <li key={option.name + "-" + index}>
                <button
                  className="text-left text-sm w-full hover:bg-sky-700 
                hover:text-white px-3 py-1 cursor-pointer"
                  onClick={() => onOptionSelect(option)}
                >
                  {option.name}
                </button>
              </li>
            ))}
          </ul>

          <button className="px-4 py-2 rounded-r-md border-2 border-white ml-2">
            Search
          </button>
        </div>
      </section>
    </main>
  );
};

export default App;
