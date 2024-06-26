import Search from "./components/SearchComponent";
import useForecast from "./hooks/useForecast";
import Forecast from "./components/ForecastComponent";

const App = (): JSX.Element => {
  const { term, options, forecast, onInputChange, onOptionSelect, onSubmit } =
    useForecast();
  return (
    <main
      className="flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500
    h-auto w-full"
    >
      {forecast ? (
        <Forecast data={forecast} />
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
