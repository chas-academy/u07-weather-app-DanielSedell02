import { JSX } from "react";

type WeatherBackgroundProps = {
  weatherMain: string;
};

const WeatherBackground = ({ weatherMain }: WeatherBackgroundProps): JSX.Element => {
  const getBackgroundClass = () => {
    switch (weatherMain.toLowerCase()) {
      case "rain":
        return "bg-gradient-to-b from-gray-600 to-blue-900 animate-rain";
      case "drizzle":
        return "bg-gradient-to-b from-gray-500 to-blue-800 animate-drizzle";
      case "thunderstorm":
        return "bg-gradient-to-b from-gray-800 to-blue-950 animate-thunder";
      case "snow":
        return "bg-gradient-to-b from-gray-300 to-blue-200 animate-snow";
      case "mist":
      case "fog":
        return "bg-gradient-to-b from-gray-400 to-gray-600 animate-fog";
      case "clear":
        return "bg-gradient-to-b from-blue-400 to-blue-600";
      case "clouds":
        return "bg-gradient-to-b from-gray-400 to-blue-500 animate-clouds";
      default:
        return "bg-gradient-to-b from-blue-400 to-blue-600";
    }
  };

  return (
    <div className={`fixed inset-0 -z-10 ${getBackgroundClass()}`}>
      {weatherMain.toLowerCase() === "rain" && (
        <div className="rain-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="rain-drop"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}
      {weatherMain.toLowerCase() === "snow" && (
        <div className="snow-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="snowflake"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      )}
      {weatherMain.toLowerCase() === "thunderstorm" && (
        <div className="thunder-container">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="lightning"
              style={{
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherBackground; 