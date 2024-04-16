import { ChangeEvent, useState } from "react";

const App = (): JSX.Element => {
  //http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
  const [term, setTerm] = useState<string>("");

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
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
        <div className="flex items-center">
          <input
            type="text"
            value={term}
            className="flex-1 px-3 py-2 rounded-l-md border border-white focus:outline-none"
            onChange={onInputChange}
          />
          <button className="px-4 py-2 rounded-r-md border-2 border-white ml-2">
            Search
          </button>
        </div>
      </section>
    </main>
  );
};

export default App;
