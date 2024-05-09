import { ChangeEvent, useState } from "react";
import { optionType } from "../types";

type Props = {
  term: string;
  options: [];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
};

const SearchComponent = ({
  term,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
}: Props): JSX.Element => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    long: number;
  } | null>(null);

  //GeoLocation

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <main className="flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 h-screen w-full">
      <section className="w-full max-w-[90%] p-4 flex flex-col items-center justify-center bg-white bg-opacity-40">
        <h1 className="text-3xl mb-4">Weather Forecast</h1>
        <div className="w-full max-w-[400px]">
          <input
            type="text"
            value={term}
            className="w-full px-3 py-2 rounded-md border border-white focus:outline-none mb-2"
            onChange={onInputChange}
            placeholder="Enter location"
          />
          <ul className="bg-white mt-1 rounded-md w-full">
            {options.map((option: optionType, index: number) => (
              <li key={option.name + "-" + index}>
                <button
                  className="text-left text-sm w-full hover:bg-sky-700 hover:text-white px-3 py-1 cursor-pointer"
                  onClick={() => onOptionSelect(option)}
                >
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap justify-center w-full max-w-[400px]">
          <button
            className="px-4 py-2 rounded-md border-2 border-white mt-2 mr-2"
            onClick={onSubmit}
          >
            Search
          </button>
          <button
            className="px-4 py-2 rounded-md border-2 border-white mt-2"
            onClick={getLocation}
          >
            Get Location
          </button>
        </div>
        {coordinates && (
          <div className="mt-4">
            <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.long}</p>
            <p> Temp {}</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default SearchComponent;
