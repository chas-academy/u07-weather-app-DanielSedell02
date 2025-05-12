import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Search from "./components/SearchComponent";
import useForecast from "./hooks/useForecast";
import Forecast from "./components/ForecastComponent";
import WeatherBackground from "./components/WeatherBackground";

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
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <main className="min-h-screen w-full">
              <WeatherBackground 
                weatherMain={forecast ? forecast.list[0].weather[0].main : "clear"} 
              />
              <div className="container mx-auto px-4 py-8">
                {showForecast && forecast ? (
                  <Forecast data={forecast} onGoBack={handleGoBack} />
                ) : (
                  <Search
                    term={term}
                    options={options}
                    error={error}
                    onInputChange={onInputChange}
                    onOptionSelect={onOptionSelect}
                    onSubmit={handleForecastSubmit}
                    getLocationForecast={handleLocationSubmit}
                  />
                )}
              </div>
            </main>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
