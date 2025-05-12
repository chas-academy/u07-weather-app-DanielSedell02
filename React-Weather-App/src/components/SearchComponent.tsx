import { ChangeEvent } from "react";
import { optionType } from "../types";

type Props = {
  term: string;
  options: [];
  error: string | null;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
  getLocationForecast: () => void;
};

const SearchComponent = ({
  term,
  options,
  error,
  onInputChange,
  onOptionSelect,
  onSubmit,
  getLocationForecast,
}: Props): JSX.Element => {
  return (
    <main className="w-full min-h-2 ">
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-md p-8 mx-auto rounded-lg shadow-lg bg-white/20 backdrop-blur-sm">
          <h1 className="mb-6 text-3xl font-bold text-center text-white">Weather Forecast</h1>
          <div className="space-y-4">
            <div className="w-full">
              <input
                type="text"
                value={term}
                className="w-full px-4 py-3 text-white transition-all border rounded-lg border-white/30 bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                onChange={onInputChange}
                placeholder="Enter location"
              />
              {error && (
                <p className="mt-2 text-sm text-red-200">{error}</p>
              )}
              <ul className="mt-2 overflow-hidden bg-white rounded-lg shadow-lg">
                {options.map((option: optionType, index: number) => (
                  <li key={option.name + "-" + index}>
                    <button
                      className="w-full px-4 py-2 text-left transition-colors hover:bg-sky-700 hover:text-white"
                      onClick={() => onOptionSelect(option)}
                    >
                      {option.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                className="px-6 py-3 font-semibold text-white transition-colors rounded-lg bg-white/20 hover:bg-white/30"
                onClick={onSubmit}
              >
                Search
              </button>
              <button
                className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors rounded-lg bg-white/20 hover:bg-white/30"
                onClick={getLocationForecast}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Get Location
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchComponent;
