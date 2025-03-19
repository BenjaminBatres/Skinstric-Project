"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
  const [activeBox, setActiveBox] = useState(1);
  const [activeRaceBox, setActiveRaceBox] = useState(1);
  const [apiResults, setAPIResults] = useState(null);

  const handleRaceSelection = (boxIndex, raceKey) => {
    setActiveRaceBox(boxIndex); // Update active state

    if (apiResults && apiResults.data.race[raceKey]) {
      updateProgress(Math.round(apiResults.data.race[raceKey] * 100)); // Update progress dynamically
    } else {
      updateProgress(0); // Default to 0% if no data found
    }
  };

  function updateProgress(percentage) {
    const progressCircle = document.getElementById("progress");
    const progressText = document.getElementById("progressText");

    const circumference = 283; // Full stroke length
    const offset = circumference - (percentage / 100) * circumference;

    progressCircle.style.strokeDashoffset = offset;
    progressText.textContent = `${percentage}%`;
  }

  useEffect(() => {
    const storedData = localStorage.getItem("apiResult");
    if (storedData) {
      setAPIResults(JSON.parse(storedData)); // Convert string back to object
    }
  }, []);
  return (
    <div className="pl-8 pr-8">
      <header
        className="max-w-[1920px] w-[100%] h-[64px] flex justify-between items-center"
        id="header"
        data-aos="fade-in"
        data-aos-delay="700"
      >
        <div className="flex">
          <Link href={"/"}>
            <span className="font-bold text-sm uppercase block ">
              Skinstric
            </span>
          </Link>
          <img
            className="pl-3"
            src={"/images/analysis.png"}
            alt="intro"
            draggable="false"
          ></img>
        </div>
      </header>
      <h3
        className="font-bold uppercase pt-8"
        data-aos="fade-in"
        data-aos-delay="1100"
      >
        A. I. analysis
      </h3>
      <h2 className="uppercase text-7xl">Demograhics</h2>
      <h3 className="uppercase ">Predicted race & age</h3>

      <main className="flex flex-auto mt-[90px] pb-[80px]">
        <div className="demographics-left">
          <ul className="font-bold">
            <li className="mb-[8px]">
              <button
                className={`flex flex-col w-[100%] items-start pl-[16px] pr-[16px] pt-[10px] pb-[10px] border-t-1 cursor-pointer transition ${
                  activeBox === 1
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4]"
                }`}
                onClick={() => setActiveBox(1)}
              >
                <span className="uppercase mb-[32px]">Black</span>
                <span className="uppercase">Race</span>
              </button>
            </li>
            <li className="mb-[8px]">
              <button
                className={`flex flex-col w-[100%] items-start pl-[16px] pr-[16px] pt-[10px] pb-[10px] border-t-1 cursor-pointer transition ${
                  activeBox === 2
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4]"
                }`}
                onClick={() => setActiveBox(2)}
              >
                <span className="uppercase mb-[32px]">20-29</span>
                <span className="uppercase">Age</span>
              </button>
            </li>
            <li>
              <button
                className={`flex flex-col w-[100%] items-start pl-[16px] pr-[16px] pt-[10px] pb-[10px] border-t-1 cursor-pointer transition ${
                  activeBox === 3
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4]"
                }`}
                onClick={() => setActiveBox(3)}
              >
                <span className="uppercase mb-[32px]">Female</span>
                <span className="uppercase">Male</span>
              </button>
            </li>
          </ul>
        </div>
        <div className="flex flex-auto flex-col pl-[16px]">
          <div className="flex flex-auto border-t-1">
            <div className="bg-[#f3f3f3] text-[#1a1b1c] flex flex-col flex-auto pt-[14px] pb-[14px] pl-[16px] pr-[16px]">
              <span className="mb-[82px] -tracking-[.02em] leading-1.25 uppercase font-bold">
                A.I. confidence
              </span>
              <div className="ai-result-diagram ai-confidence-diagram ">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  className="ai-result-diagram-svg"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#ddd"
                    strokeWidth="0.8"
                    fill="none"
                  />

                  <circle
                    id="progress"
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="black"
                    strokeWidth="0.8"
                    fill="none"
                    strokeDasharray="283"
                    strokeDashoffset="283"
                    strokeLinecap="round"
                  />
                </svg>
                <span
                  id="progressText"
                  className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] whitespace-nowrap text-5xl"
                >
                  {apiResults ? (
                    <p>
                      {JSON.stringify(
                        Math.round(apiResults.data.race["east asian"] * 100)
                      )}{" "}
                      %
                    </p>
                  ) : (
                    <p></p>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="demographics-race-confidence border-t-1">
          <div className="flex justify-between pt-[14px] pb-[14px] pl-[16px] pr-[16px] opacity-80">
            <span className="uppercase">Race</span>
            <span className="uppercase">A.I confidence</span>
          </div>
          <div>
            <button
              className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                activeRaceBox === 1
                  ? "bg-[#1a1b1c] text-[#fcfcfc]"
                  : "bg-[#f3f3f4]"
              }`}
              onClick={() => handleRaceSelection(1, "east asian")}
            >
              <span>East Asian</span>
              <div>
                {apiResults ? (
                  <p>{Math.round(apiResults.data.race["east asian"] * 100)}%</p>
                ) : (
                  <p>No stored data found.</p>
                )}
              </div>
            </button>
            <button
              className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                activeRaceBox === 2
                  ? "bg-[#1a1b1c] text-[#fcfcfc]"
                  : "bg-[#f3f3f4]"
              }`}
              onClick={() => handleRaceSelection(2, "white")}
            >
              <span>White</span>
              <div>
                {apiResults ? (
                  <p>{Math.round(apiResults.data.race.white * 100)}%</p>
                ) : (
                  <p>No stored data found.</p>
                )}
              </div>
            </button>
            <button
              className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                activeRaceBox === 3
                  ? "bg-[#1a1b1c] text-[#fcfcfc]"
                  : "bg-[#f3f3f4]"
              }`}
              onClick={() => handleRaceSelection(3, "black")}
            >
              <span>Black</span>
              <div>
                {apiResults ? (
                  <p>
                    {JSON.stringify(
                      Math.round(apiResults.data.race.black * 100)
                    )}{" "}
                    %
                  </p>
                ) : (
                  <p>No stored data found.</p>
                )}
              </div>
            </button>
            <button
              className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                activeRaceBox === 4
                  ? "bg-[#1a1b1c] text-[#fcfcfc]"
                  : "bg-[#f3f3f4]"
              }`}
              onClick={() => handleRaceSelection(4, "south asian")}
            >
              <span>South Asain</span>
              <div>
                {apiResults ? (
                  <p>
                    {JSON.stringify(
                      Math.round(apiResults.data.race["south asian"] * 100)
                    )}{" "}
                    %
                  </p>
                ) : (
                  <p>No stored data found.</p>
                )}
              </div>
            </button>
            <button
              className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                activeRaceBox === 5
                  ? "bg-[#1a1b1c] text-[#fcfcfc]"
                  : "bg-[#f3f3f4]"
              }`}
              onClick={() => handleRaceSelection(5, "latino hispanic")}
            >
              <span>Latino Hispanic</span>
              <div>
                {apiResults ? (
                  <p>
                    {JSON.stringify(
                      Math.round(apiResults.data.race["latino hispanic"] * 100)
                    )}{" "}
                    %
                  </p>
                ) : (
                  <p>No stored data found.</p>
                )}
              </div>
            </button>
            <button
              className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                activeRaceBox === 6
                  ? "bg-[#1a1b1c] text-[#fcfcfc]"
                  : "bg-[#f3f3f4]"
              }`}
              onClick={() => handleRaceSelection(6, "southeast asian")}
            >
              <span>South East Asain</span>
              <div>
                {apiResults ? (
                  <p>
                    {JSON.stringify(
                      Math.round(apiResults.data.race["southeast asian"] * 100)
                    )}{" "}
                    %
                  </p>
                ) : (
                  <p>No stored data found.</p>
                )}
              </div>
            </button>
            <button
              className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                activeRaceBox === 7
                  ? "bg-[#1a1b1c] text-[#fcfcfc]"
                  : "bg-[#f3f3f4]"
              }`}
              onClick={() => handleRaceSelection(7, "middle eastern")}
            >
              <span>Middle Eastern</span>
              <div>
                {apiResults ? (
                  <p>
                    {JSON.stringify(
                      Math.round(apiResults.data.race["middle eastern"] * 100)
                    )}{" "}
                    %
                  </p>
                ) : (
                  <p>No stored data found.</p>
                )}
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
