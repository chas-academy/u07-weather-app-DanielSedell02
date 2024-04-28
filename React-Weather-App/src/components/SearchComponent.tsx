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
    <main className="flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 h-[100vh] w-full">
      <section className="w-full md:max-w-[500px] p-4 flex flex-col text center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-40">
        <h1 className="text-3xl">Weather Forecast</h1>
        <div className="relative flex items-center">
          <input
            type="text"
            value={term}
            className="flex-1 px-3 py-2 rounded-l-md border border-white focus:outline-none"
            onChange={onInputChange}
          />
          <ul className="absolute top-9 bg-white m1-1 rounded-b-md">
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
          <button
            className="px-4 py-2 rounded-r-md border-2 border-white ml-2"
            onClick={onSubmit}
          >
            Search
          </button>
          <button
            className="px-4 py-2 rounded-md border-2 border-white ml-2"
            onClick={getLocation}
          >
            Get Location
          </button>
        </div>
        {coordinates && (
          <div className="mt-4">
            <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.long}</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default SearchComponent;
