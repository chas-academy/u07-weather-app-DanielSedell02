import { useState } from "react";
import Search from "./components/SearchComponent";
import useForecast from "./hooks/useForecast";
import Forecast from "./components/ForecastComponent";
import WeatherBackground from "./components/WeatherBackground";
import AnimatedSun from "./components/AnimatedSun";

const App = (): JSX.Element => {
  const { 
    term, 
    options, 
    forecast, 
    error,
    onInputChange, 
    onOptionSelect, 
    onSubmit,
    getLocationForecast 
  } = useForecast();

  const [showForecast, setShowForecast] = useState(false);

  const handleForecastSubmit = () => {
    onSubmit();
    setShowForecast(true);
  };

  const handleLocationSubmit = () => {
    getLocationForecast();
    setShowForecast(true);
  };

  const handleGoBack = () => {
    setShowForecast(false);
  };

  return (
    <main className="min-h-screen w-full">
      <WeatherBackground 
        weatherMain={forecast ? forecast.list[0].weather[0].main : "clear"} 
      />
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        {showForecast && forecast ? (
          <div className="relative">
            <Forecast data={forecast} onGoBack={handleGoBack} />
          </div>
        ) : (
          <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-8 flex flex-col items-center w-full max-w-md">
            <Search
              term={term}
              options={options}
              error={error}
              onInputChange={onInputChange}
              onOptionSelect={onOptionSelect}
              onSubmit={handleForecastSubmit}
              getLocationForecast={handleLocationSubmit}
            />
            <AnimatedSun />
          </div>
        )}
      </div>
    </main>
  );
};

export default App;
