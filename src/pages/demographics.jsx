import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import LeftButton from "../components/LeftButton";

const Demographics = () => {
  const [demographicData, setDemographicData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("race");
  const [selectedOptions, setSelectedOptions] = useState({
    race: null,
    age: null,
    sex: null,
  });
  const [confirmedOptions, setConfirmedOptions] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("demographicData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setDemographicData(parsed);

      const race = getRaceData(parsed)[0]?.label || null;
      const age = getAgeData(parsed)[0]?.label || null;
      const sex = getSexData(parsed)[0]?.label || null;

      setSelectedOptions({ race, age, sex });
    }
  }, []);

  const getRaceData = (data) => {
    if (!data?.race) return [];
    return Object.entries(data.race)
      .map(([key, value]) => ({
        label: key.replace(/\b\w/g, (l) => l.toUpperCase()),
        value: `${Math.round(value * 100)}%`,
      }))
      .sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
  };

  const getAgeData = (data) => {
    if (!data?.age) return [];
    return Object.entries(data.age)
      .map(([key, value]) => ({
        label: key,
        value: `${Math.round(value * 100)}%`,
      }))
      .sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
  };

  const getSexData = (data) => {
    if (!data?.gender) return [];
    return Object.entries(data.gender)
      .map(([key, value]) => ({
        label: key,
        value: `${Math.round(value * 100)}%`,
      }))
      .sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
  };

  const raceData = getRaceData(demographicData);
  const ageData = getAgeData(demographicData);
  const sexData = getSexData(demographicData);

  const getSelectedData = () => {
    switch (selectedCategory) {
      case "race": return raceData;
      case "age": return ageData;
      case "sex": return sexData;
      default: return [];
    }
  };

  const selectedData = getSelectedData();

  const handleConfirm = () => {
    setConfirmedOptions(selectedOptions);
  };

  const handleReset = () => {
    const race = raceData[0]?.label || null;
    const age = ageData[0]?.label || null;
    const sex = sexData[0]?.label || null;
    setSelectedOptions({ race, age, sex });
    setConfirmedOptions(null);
  };

  const confirmedLabel = confirmedOptions?.[selectedCategory] || null;
  const confirmedItem = confirmedLabel
    ? selectedData.find((item) => item.label === confirmedLabel)
    : null;

  const defaultItem = selectedData[0] || null;

  return (
    <div className="h-screen flex flex-col bg-white-custom px-8 relative">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white-custom px-8 h-[48px] flex items-center">
        <Header subtitleText="ANALYSIS" />
      </div>

      <div className="mt-16 font-bold font-roobert">A.I. ANALYSIS</div>
      <h1 className="text-[60px] max-md:text-[40px]">DEMOGRAPHICS</h1>
      <p className="text-[14px]">PREDICTED RACE & AGE</p>

      <div className="flex-grow overflow-y-auto max-lg:h-screen pb-32 mt-12">
        <div className="w-full flex lg:flex-row flex-col gap-4">
          {/* LEFT COLUMN */}
          <div className="lg:flex-[3] flex flex-col gap-[8px]">
            <div
              className={`max-lg:flex-row max-lg:justify-between flex flex-col h-[20%] border-t border-black p-2 font-semi-bold cursor-pointer ${
                selectedCategory === "race"
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-300"
              }`}
              onClick={() => setSelectedCategory("race")}
            >
              <span className="mb-8 font-bold uppercase">
                {confirmedOptions?.race || raceData[0]?.label.toUpperCase() || "N/A"}
              </span>
              <span className="font-bold">RACE</span>
            </div>
            <div
              className={`max-lg:flex-row max-lg:justify-between flex flex-col h-[20%] border-t border-black p-2 font-semi-bold cursor-pointer ${
                selectedCategory === "age"
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-300"
              }`}
              onClick={() => setSelectedCategory("age")}
            >
              <span className="mb-8 font-bold">
                {confirmedOptions?.age || ageData[0]?.label || "N/A"}
              </span>
              <span className="font-bold">AGE</span>
            </div>
            <div
              className={`max-lg:flex-row max-lg:justify-between flex flex-col h-[20%] border-t border-black p-2 font-semi-bold cursor-pointer ${
                selectedCategory === "sex"
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-300"
              }`}
              onClick={() => setSelectedCategory("sex")}
            >
              <span className="mb-8 font-bold uppercase">
                {confirmedOptions?.sex || sexData[0]?.label.toUpperCase() || "N/A"}
              </span>
              <span className="font-bold">SEX</span>
            </div>
          </div>

          {/* MIDDLE COLUMN */}
          <div className="lg:flex-[12] p-4 bg-gray-100 border-t border-black relative flex flex-col items-center justify-center">
            <div className="text-[32px] font-semi-bold mb-8 w-[100%]">
              {(confirmedItem || defaultItem)?.label.charAt(0).toUpperCase() + (confirmedItem || defaultItem)?.label.slice(1) || "No data"}
            </div>

            <div className="w-96 h-96 max-lg:w-64 max-lg:h-64 max-sm:w-48 max-sm:h-48">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle
                  className="text-gray-300"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  cx="18"
                  cy="18"
                  r="15.9155"
                />
                <circle
                  className="text-black"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray={`${
                    parseFloat(
                      (confirmedItem || defaultItem)?.value?.replace("%", "") || "0"
                    )
                  }, 100`}
                  transform="rotate(-90 18 18)"
                  cx="18"
                  cy="18"
                  r="15.9155"
                />
                <text
                  x="18"
                  y="20.5"
                  className="text-[4px] fill-black font-bold"
                  textAnchor="middle"
                >
                  {(confirmedItem || defaultItem)?.value || "0%"}
                </text>
              </svg>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:flex-[5] p-4 bg-gray-100 border-t border-black flex flex-col w-full">
            <div className="flex items-center justify-between py-2 font-bold">
              <span>{selectedCategory.toUpperCase()}</span>
              <span>A.I. CONFIDENCE</span>
            </div>

            {selectedData.length === 0 ? (
              <p>No {selectedCategory} data available</p>
            ) : (
              selectedData.map(({ label, value }) => (
                <div
                  key={label}
                  className={`flex items-center justify-between px-2 py-4 transition-colors duration-200 w-full cursor-pointer ${
                    selectedOptions[selectedCategory] === label
                      ? "bg-black text-white"
                      : "hover:bg-gray-300"
                  }`}
                  onClick={() =>
                    setSelectedOptions((prev) => ({
                      ...prev,
                      [selectedCategory]: label,
                    }))
                  }
                >
                  <div className="flex items-center">
                    <img
                      src="/assets/diamond-button.png"
                      alt=""
                      className="w-4 h-4"
                    />
                    <span className="px-2 capitalize">{label}</span>
                  </div>
                  <span>{value}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <footer className="flex items-center justify-center">
        <div className="fixed bottom-8 left-8 z-10">
          <LeftButton href="/analysis">BACK</LeftButton>
        </div>
        <span className="text-gray-400 mb-8">
          If A.I. estimate is wrong, select the correct one.
        </span>
        <div className="flex fixed right-8 bottom-8">
          <button
            className="mr-4 bg-white text-black border border-black font-roobert px-6 py-3 text-[12px] leading-5 uppercase font-semibold tracking-tight"
            onClick={handleReset}
          >
            RESET
          </button>
          <button
            className="bg-black text-white font-roobert px-6 py-3 text-[12px] leading-5 uppercase font-semibold tracking-tight"
            onClick={handleConfirm}
          >
            CONFIRM
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Demographics;



