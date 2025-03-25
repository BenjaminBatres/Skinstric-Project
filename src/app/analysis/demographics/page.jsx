"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
  const [activeBox, setActiveBox] = useState(1);
  const [activeRaceBox, setActiveRaceBox] = useState(1);
  const [activeAgeBox, setActiveAgeBox] = useState(1);
  const [activeSexBox, setActiveSexBox] = useState(1);
  const [apiResults, setAPIResults] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAgeOpen, setIsAgeOpen] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);

  const handleSelection = (boxIndex, category) => {
    setActiveBox(boxIndex); // Update active box state

    if (category === "race") {
      if (apiResults && apiResults.data[category]["east asian"]) {
        updateProgress(
          Math.round(apiResults.data[category]["east asian"] * 100)
        ); // Fetch and update the correct percentage
      } else {
        updateProgress(0); // Default to 0% if no data found
      }
    }
    if (category === "age") {
      if (apiResults && apiResults.data[category]["3-9"]) {
        updateProgress(Math.round(apiResults.data[category]["3-9"] * 100)); // Fetch and update the correct percentage
      } else {
        updateProgress(0); // Default to 0% if no data found
      }
    }
    if (category === "gender") {
      if (apiResults && apiResults.data[category].female) {
        updateProgress(Math.round(apiResults.data[category].female * 100)); // Fetch and update the correct percentage
      } else {
        updateProgress(0); // Default to 0% if no data found
      }
    }
  };

  const handleRaceSelection = (boxIndex, raceKey) => {
    setActiveRaceBox(boxIndex); // Update active state

    if (apiResults && apiResults.data.race[raceKey]) {
      updateProgress(Math.round(apiResults.data.race[raceKey] * 100)); // Update progress dynamically
      updateProgressRace(Math.round(apiResults.data.race[raceKey] * 100));
      updateProgressRaceModal(Math.round(apiResults.data.race[raceKey] * 100));
    } else {
      updateProgress(0); // Default to 0% if no data found
      updateProgressRace(0); // Default to 0% if no data found
      updateProgressRaceModal(0); // Default to 0% if no data found
    }
  };
  const handleAgeSelection = (boxIndex, ageKey) => {
    setActiveAgeBox(boxIndex); // Update active state

    if (apiResults && apiResults.data.age[ageKey]) {
      updateProgress(Math.round(apiResults.data.age[ageKey] * 100)); // Update progress dynamically);
      updateProgressAge(Math.round(apiResults.data.age[ageKey] * 100)); // Update progress dynamically);
      updateProgressAgeModal(Math.round(apiResults.data.age[ageKey] * 100)); // Update progress dynamically);
    } else {
      updateProgress(0); // Default to 0% if no data found
      updateProgressAge(0); // Default to 0% if no data found
      updateProgressAgeModal(0); // Default to 0% if no data found
    }
  };
  const handleGenderSelection = (boxIndex, genderKey) => {
    setActiveSexBox(boxIndex); // Update active state

    if (apiResults && apiResults.data.gender[genderKey]) {
      updateProgress(Math.round(apiResults.data.gender[genderKey] * 100)); // Update progress dynamically
      updateProgressSex(Math.round(apiResults.data.gender[genderKey] * 100)); // Update progress dynamically
      updateProgressSexModal(
        Math.round(apiResults.data.gender[genderKey] * 100)
      ); // Update progress dynamically
    } else {
      updateProgress(0); // Default to 0% if no data found
      updateProgressSex(0); // Default to 0% if no data found
      updateProgressSexModal(0); // Default to 0% if no data found
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

  function updateProgressRace(percentage) {
    const progressCircle = document.getElementById("progressRace");
    const progressText = document.getElementById("progressTextRace");

    const circumference = 283; // Full stroke length
    const offset = circumference - (percentage / 100) * circumference;

    progressCircle.style.strokeDashoffset = offset;
    progressText.textContent = `${percentage}%`;
  }

  function updateProgressAge(percentage) {
    const progressCircle = document.getElementById("progressAge");
    const progressText = document.getElementById("progressTextAge");

    const circumference = 283; // Full stroke length
    const offset = circumference - (percentage / 100) * circumference;

    progressCircle.style.strokeDashoffset = offset;
    progressText.textContent = `${percentage}%`;
  }

  function updateProgressSex(percentage) {
    const progressCircle = document.getElementById("progressSex");
    const progressText = document.getElementById("progressTextSex");

    const circumference = 283; // Full stroke length
    const offset = circumference - (percentage / 100) * circumference;

    progressCircle.style.strokeDashoffset = offset;
    progressText.textContent = `${percentage}%`;
  }

  // MOBILE MODAL

  function updateProgressRaceModal(percentage) {
    const progressCircle = document.getElementById("progressRaceModal");
    const progressText = document.getElementById("progressTextRaceModal");

    const circumference = 283; // Full stroke length
    const offset = circumference - (percentage / 100) * circumference;

    progressCircle.style.strokeDashoffset = offset;
    progressText.textContent = `${percentage}%`;
  }

  function updateProgressAgeModal(percentage) {
    const progressCircle = document.getElementById("progressAgeModal");
    const progressText = document.getElementById("progressTextAgeModal");

    const circumference = 283; // Full stroke length
    const offset = circumference - (percentage / 100) * circumference;

    progressCircle.style.strokeDashoffset = offset;
    progressText.textContent = `${percentage}%`;
  }

  function updateProgressSexModal(percentage) {
    const progressCircle = document.getElementById("progressSexModal");
    const progressText = document.getElementById("progressTextSexModal");

    const circumference = 283; // Full stroke length
    const offset = circumference - (percentage / 100) * circumference;

    progressCircle.style.strokeDashoffset = offset;
    progressText.textContent = `${percentage}%`;
  }

  useEffect(() => {
    const storedData = localStorage.getItem("apiResult");
    const storedCapturedData = localStorage.getItem("capturedImage")
    console.log(storedCapturedData)

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const onMountRace = parsedData.data.race["east asian"];
      const onMountAge = parsedData.data.age["3-9"];
      const onMountSex = parsedData.data.gender.female;
      setAPIResults(parsedData);
      updateProgress(Math.round(onMountRace * 100));
      updateProgressRace(Math.round(onMountRace * 100));
      updateProgressAge(Math.round(onMountAge * 100));
      updateProgressSex(Math.round(onMountSex * 100));
      updateProgressRaceModal(Math.round(onMountRace * 100));
      updateProgressAgeModal(Math.round(onMountAge * 100));
      updateProgressSexModal(Math.round(onMountSex * 100));
    }
  }, []);
  return (
    <div className="pl-4 pr-4 sm:pl-8 sm:pr-8">
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
        className="font-bold uppercase pt-4 sm:pt-8 text-xs"
        data-aos="fade-in"
        data-aos-delay="1100"
      >
        A. I. analysis
      </h3>
      <h2 className="demographics-title uppercase">Demograhics</h2>
      <h3 className="uppercase text-xs">Predicted race & age</h3>

      <main className="flex flex-auto mt-[20px] sm:mt-[50px] lg:mt-[90px] pb-[80px]">
        <div className="demographics-left">
          <ul className="text-bold">
            <li className="mb-[8px] relative">
              <button
                className={`flex flex-col w-[100%] items-start pl-[16px] pr-[16px] pt-[10px] pb-[10px] border-t-1 cursor-pointer transition ${
                  activeBox === 1
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                }`}
                onClick={() => handleSelection(1, "race")}
              >
                <div className="analysis-pick-line font-bold">
                  <span className="uppercase mb-[32px]">East asian</span>
                  <span className="uppercase">Race</span>
                </div>

                <div className="analysis-pick-button-diagram">
                  <div className="ai-result-diagram">
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
                        id="progressRace"
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
                      id="progressTextRace"
                      className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] whitespace-nowrap text-4xl"
                    >
                      {apiResults ? (
                        <p>
                          {JSON.stringify(
                            Math.round(apiResults.data.race["east asian"] * 100)
                          )}
                          %
                        </p>
                      ) : (
                        <p>loading...</p>
                      )}
                    </span>
                  </div>
                  <div className="ai-result-diagram--modal">
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
                        id="progressRaceModal"
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
                      id="progressTextRaceModal"
                      className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] whitespace-nowrap text-4xl"
                    >
                      {apiResults ? (
                        <p>
                          {JSON.stringify(
                            Math.round(apiResults.data.race["east asian"] * 100)
                          )}
                          %
                        </p>
                      ) : (
                        <p>loading...</p>
                      )}
                    </span>
                  </div>

                  <span className="uppercase mt-[31px] text-xs sm:text-base">
                    Edit
                  </span>
                </div>
              </button>
              {/* Race Modal */}
              <button
                className="demographic__modal--btn"
                onClick={() => setIsOpen(!isOpen)}
              ></button>
              {isOpen ? (
                <div className="h-[100%] w-[100%] left-0 top-0 overflow-y-auto fixed bg-[#f3f3f4] z-11 sm:hidden">
                  <div className="pt-[15px] pb-[18px] pl-[8px]">
                    <button
                      className="cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      <img src="/images/button-icon-back-shrunk.png" alt="" />
                    </button>
                  </div>
                  <div className="border-t-1 flex justify-between pt-[14px] pb-[14px] pl-[16px] pr-[16px] opacity-60 text-xs">
                    <span className="uppercase">Race</span>
                    <span className="uppercase">A.I confidence</span>
                  </div>
                  {activeBox === 1 && (
                    <>
                      <button
                        className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                          activeRaceBox === 1
                            ? "bg-[#1a1b1c] text-[#fcfcfc]"
                            : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                        }`}
                        onClick={() => handleRaceSelection(1, "east asian")}
                      >
                        <span>East Asian</span>
                        <div>
                          {apiResults ? (
                            <p>
                              {Math.round(
                                apiResults.data.race["east asian"] * 100
                              )}{" "}
                              %
                            </p>
                          ) : (
                            <p>loading...</p>
                          )}
                        </div>
                      </button>
                      <button
                        className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                          activeRaceBox === 2
                            ? "bg-[#1a1b1c] text-[#fcfcfc]"
                            : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                        }`}
                        onClick={() => handleRaceSelection(2, "white")}
                      >
                        <span>White</span>
                        <div>
                          {apiResults ? (
                            <p>
                              {Math.round(apiResults.data.race.white * 100)} %
                            </p>
                          ) : (
                            <p>loading...</p>
                          )}
                        </div>
                      </button>
                      <button
                        className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                          activeRaceBox === 3
                            ? "bg-[#1a1b1c] text-[#fcfcfc]"
                            : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
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
                            <p>loading...</p>
                          )}
                        </div>
                      </button>
                      <button
                        className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                          activeRaceBox === 4
                            ? "bg-[#1a1b1c] text-[#fcfcfc]"
                            : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                        }`}
                        onClick={() => handleRaceSelection(4, "south asian")}
                      >
                        <span>South Asaiin</span>
                        <div>
                          {apiResults ? (
                            <p>
                              {JSON.stringify(
                                Math.round(
                                  apiResults.data.race["south asian"] * 100
                                )
                              )}{" "}
                              %
                            </p>
                          ) : (
                            <p>loading...</p>
                          )}
                        </div>
                      </button>
                      <button
                        className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                          activeRaceBox === 5
                            ? "bg-[#1a1b1c] text-[#fcfcfc]"
                            : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                        }`}
                        onClick={() =>
                          handleRaceSelection(5, "latino hispanic")
                        }
                      >
                        <span>Latino Hispanic</span>
                        <div>
                          {apiResults ? (
                            <p>
                              {JSON.stringify(
                                Math.round(
                                  apiResults.data.race["latino hispanic"] * 100
                                )
                              )}{" "}
                              %
                            </p>
                          ) : (
                            <p>loading...</p>
                          )}
                        </div>
                      </button>
                      <button
                        className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                          activeRaceBox === 6
                            ? "bg-[#1a1b1c] text-[#fcfcfc]"
                            : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                        }`}
                        onClick={() =>
                          handleRaceSelection(6, "southeast asian")
                        }
                      >
                        <span>South East Asain</span>
                        <div>
                          {apiResults ? (
                            <p>
                              {JSON.stringify(
                                Math.round(
                                  apiResults.data.race["southeast asian"] * 100
                                )
                              )}{" "}
                              %
                            </p>
                          ) : (
                            <p>loading...</p>
                          )}
                        </div>
                      </button>
                      <button
                        className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                          activeRaceBox === 7
                            ? "bg-[#1a1b1c] text-[#fcfcfc]"
                            : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                        }`}
                        onClick={() => handleRaceSelection(7, "middle eastern")}
                      >
                        <span>Middle Eastern</span>
                        <div>
                          {apiResults ? (
                            <p>
                              {JSON.stringify(
                                Math.round(
                                  apiResults.data.race["middle eastern"] * 100
                                )
                              )}{" "}
                              %
                            </p>
                          ) : (
                            <p>loading...</p>
                          )}
                        </div>
                      </button>
                    </>
                  )}
                </div>
              ) : (
                ""
              )}
            </li>
            {/* Age data*/}
            <li className="mb-[8px] relative">
              <button
                className={`flex flex-col w-[100%] items-start pl-[16px] pr-[16px] pt-[10px] pb-[10px] border-t-1 cursor-pointer transition ${
                  activeBox === 2
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                }`}
                onClick={() => handleSelection(2, "age")}
              >
                <div className="analysis-pick-line font-bold">
                  <span className="uppercase mb-[32px]">20-29</span>
                  <span className="uppercase">Age</span>
                </div>

                <div className="analysis-pick-button-diagram">
                  <div className="ai-result-diagram">
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
                        id="progressAge"
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
                      id="progressTextAge"
                      className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] whitespace-nowrap text-4xl"
                    >
                      {apiResults ? (
                        <p>
                          {JSON.stringify(
                            Math.round(apiResults.data.age["3-9"] * 100)
                          )}{" "}
                          %
                        </p>
                      ) : (
                        <p>loading...</p>
                      )}
                    </span>
                  </div>
                  <div className="ai-result-diagram--modal">
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
                        id="progressAgeModal"
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
                      id="progressTextAgeModal"
                      className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] whitespace-nowrap text-4xl"
                    >
                      {apiResults ? (
                        <p>
                          {JSON.stringify(
                            Math.round(apiResults.data.age["3-9"] * 100)
                          )}
                          %
                        </p>
                      ) : (
                        <p>loading...</p>
                      )}
                    </span>
                  </div>
                  <span className="uppercase mt-[31px] text-xs sm:text-base">
                    Edit
                  </span>
                </div>
              </button>
              {/* Age Modal */}
              <button
                onClick={() => setIsAgeOpen(!isAgeOpen)}
                className="demographic__modal--btn"
              ></button>
              {isAgeOpen ? (
                <div className="h-[100%] w-[100%] left-0 top-0 overflow-y-auto fixed bg-[#f3f3f4] z-12 sm:hidden">
                  <div className="pt-[15px] pb-[18px] pl-[8px]">
                    <button
                      className="cursor-pointer"
                      onClick={() => setIsAgeOpen(!isAgeOpen)}
                    >
                      <img src="/images/button-icon-back-shrunk.png" alt="" />
                    </button>
                  </div>
                  <div className="border-t-1 flex justify-between pt-[14px] pb-[14px] pl-[16px] pr-[16px] opacity-60 text-xs">
                    <span className="uppercase">Race</span>
                    <span className="uppercase">A.I confidence</span>
                  </div>

                  <button
                    className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                      activeAgeBox === 1
                        ? "bg-[#1a1b1c] text-[#fcfcfc]"
                        : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                    }`}
                    onClick={() => handleAgeSelection(1, "3-9")}
                  >
                    <span>0-9</span>
                    <div>
                      {apiResults ? (
                        <p>{Math.round(apiResults.data.age["3-9"] * 100)} %</p>
                      ) : (
                        <p>loading...</p>
                      )}
                    </div>
                  </button>
                  <button
                    className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                      activeAgeBox === 2
                        ? "bg-[#1a1b1c] text-[#fcfcfc]"
                        : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                    }`}
                    onClick={() => handleAgeSelection(2, "10-19")}
                  >
                    <span>10-19</span>
                    <div>
                      {apiResults ? (
                        <p>
                          {Math.round(apiResults.data.age["10-19"] * 100)} %
                        </p>
                      ) : (
                        <p>loading...</p>
                      )}
                    </div>
                  </button>
                  <button
                    className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                      activeAgeBox === 3
                        ? "bg-[#1a1b1c] text-[#fcfcfc]"
                        : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                    }`}
                    onClick={() => handleAgeSelection(3, "20-29")}
                  >
                    <span>20-29</span>
                    <div>
                      {apiResults ? (
                        <p>
                          {JSON.stringify(
                            Math.round(apiResults.data.age["20-29"] * 100)
                          )}{" "}
                          %
                        </p>
                      ) : (
                        <p>loading...</p>
                      )}
                    </div>
                  </button>
                  <button
                    className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                      activeAgeBox === 4
                        ? "bg-[#1a1b1c] text-[#fcfcfc]"
                        : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                    }`}
                    onClick={() => handleAgeSelection(4, "30-39")}
                  >
                    <span>30-39</span>
                    <div>
                      {apiResults ? (
                        <p>
                          {JSON.stringify(
                            Math.round(apiResults.data.age["30-39"] * 100)
                          )}{" "}
                          %
                        </p>
                      ) : (
                        <p>loading...</p>
                      )}
                    </div>
                  </button>
                  <button
                    className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                      activeAgeBox === 5
                        ? "bg-[#1a1b1c] text-[#fcfcfc]"
                        : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                    }`}
                    onClick={() => handleAgeSelection(5, "40-49")}
                  >
                    <span>40-49</span>
                    <div>
                      {apiResults ? (
                        <p>
                          {JSON.stringify(
                            Math.round(apiResults.data.age["40-49"] * 100)
                          )}{" "}
                          %
                        </p>
                      ) : (
                        <p>loading...</p>
                      )}
                    </div>
                  </button>
                  <button
                    className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer  transition ${
                      activeAgeBox === 6
                        ? "bg-[#1a1b1c] text-[#fcfcfc]"
                        : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                    }`}
                    onClick={() => handleAgeSelection(6, "50-59")}
                  >
                    <span>50-59</span>
                    <div>
                      {apiResults ? (
                        <p>
                          {JSON.stringify(
                            Math.round(apiResults.data.age["50-59"] * 100)
                          )}{" "}
                          %
                        </p>
                      ) : (
                        <p>loading...</p>
                      )}
                    </div>
                  </button>
                  <button
                    className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer  transition ${
                      activeAgeBox === 7
                        ? "bg-[#1a1b1c] text-[#fcfcfc]"
                        : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                    }`}
                    onClick={() => handleAgeSelection(7, "60-69")}
                  >
                    <span>60-69</span>
                    <div>
                      {apiResults ? (
                        <p>
                          {JSON.stringify(
                            Math.round(apiResults.data.age["60-69"] * 100)
                          )}{" "}
                          %
                        </p>
                      ) : (
                        <p>loading...</p>
                      )}
                    </div>
                  </button>
                  <button
                    className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer  transition ${
                      activeAgeBox === 8
                        ? "bg-[#1a1b1c] text-[#fcfcfc]"
                        : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                    }`}
                    onClick={() => handleAgeSelection(8, "70+")}
                  >
                    <span>70+</span>
                    <div>
                      {apiResults ? (
                        <p>
                          {JSON.stringify(
                            Math.round(apiResults.data.age["70+"] * 100)
                          )}{" "}
                          %
                        </p>
                      ) : (
                        <p>loading...</p>
                      )}
                    </div>
                  </button>
                </div>
              ) : (
                ""
              )}
            </li>
            {/* Gender Data */}
            <li className="relative">
              <button
                className={`flex flex-col w-[100%] items-start pl-[16px] pr-[16px] pt-[10px] pb-[10px] border-t-1 cursor-pointer transition ${
                  activeBox === 3
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                }`}
                onClick={() => handleSelection(3, "gender")}
              >
                <div className="analysis-pick-line font-bold">
                  <span className="uppercase mb-[32px]">Female</span>
                  <span className="uppercase">Sex</span>
                </div>

                <div className="analysis-pick-button-diagram">
                  <div className="ai-result-diagram">
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
                        id="progressSex"
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
                      id="progressTextSex"
                      className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] whitespace-nowrap text-4xl"
                    >
                      {apiResults ? (
                        <p>
                          {JSON.stringify(
                            Math.round(apiResults.data.gender.female * 100)
                          )}
                          <span>%</span>
                        </p>
                      ) : (
                        <p>loading...</p>
                      )}
                    </span>
                  </div>
                  <div className="ai-result-diagram--modal">
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
                        id="progressSexModal"
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
                      id="progressTextSexModal"
                      className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] whitespace-nowrap text-4xl"
                    >
                      {apiResults ? (
                        <p>
                          {JSON.stringify(
                            Math.round(apiResults.data.gender.female * 100)
                          )}
                          <span>%</span>
                        </p>
                      ) : (
                        <p>loading...</p>
                      )}
                    </span>
                  </div>
                  <span className="uppercase mt-[31px] text-xs sm:text-base">
                    Edit
                  </span>
                </div>
              </button>
              {/* Gender Modal */}
              <button
                onClick={() => setIsGenderOpen(!isGenderOpen)}
                className="demographic__modal--btn"
              ></button>
              {isGenderOpen ? (
                <div className="h-[100%] w-[100%] left-0 top-0 overflow-y-auto fixed bg-[#f3f3f4] z-10 sm:hidden">
                  <div className="pt-[15px] pb-[18px] pl-[8px]">
                    <button
                      className="cursor-pointer"
                      onClick={() => setIsGenderOpen(false)}
                    >
                      <img src="/images/button-icon-back-shrunk.png" alt="" />
                    </button>
                  </div>

                  <div className="flex justify-between pt-[14px] pb-[14px] pl-[16px] pr-[16px] opacity-80">
                    <span className="uppercase">Sex</span>
                    <span className="uppercase">A.I confidence</span>
                  </div>
                  <div>
                    <button
                      className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                        activeSexBox === 1
                          ? "bg-[#1a1b1c] text-[#fcfcfc]"
                          : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                      }`}
                      onClick={() => handleGenderSelection(1, "female")}
                    >
                      <span>Female</span>
                      <div>
                        {apiResults ? (
                          <p>
                            {Math.round(apiResults.data.gender.female * 100)} %
                          </p>
                        ) : (
                          <p>loading...</p>
                        )}
                      </div>
                    </button>
                    <button
                      className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                        activeSexBox === 2
                          ? "bg-[#1a1b1c] text-[#fcfcfc]"
                          : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                      }`}
                      onClick={() => handleGenderSelection(2, "male")}
                    >
                      <span>Male</span>
                      <div>
                        {apiResults ? (
                          <p>
                            {Math.round(apiResults.data.gender.male * 100)} %
                          </p>
                        ) : (
                          <p>loading...</p>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </li>
          </ul>
        </div>
        {/* Race Demographic progress circle */}
        <div className="demographics-right">
          <div className="flex flex-auto border-t-1">
            <div className="bg-[#f3f3f3] text-[#1a1b1c] flex flex-col flex-auto pt-[14px] pb-[14px] pl-[16px] pr-[16px]">
              {activeBox === 1 && (
                <span className="mb-[82px] mt-4 -tracking-[.05em] leading-1.25 text-[40px]">
                  East asian
                </span>
              )}
              {activeBox === 2 && (
                <span className="mb-[82px] mt-4 -tracking-[.05em] leading-1.25 text-[40px]">
                  20-29 y.o.
                </span>
              )}
              {activeBox === 3 && (
                <span className="mb-[82px] mt-4 -tracking-[.05em] leading-1.25 text-[40px]">
                  Sex
                </span>
              )}
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
                      )}
                      %
                    </p>
                  ) : (
                    <p>loading...</p>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Race Demographic] */}
        {activeBox === 1 && (
          <div className="demographics-race-confidence border-t-1 ">
            <div className="flex justify-between pt-[14px] pb-[14px] pl-[16px] pr-[16px] opacity-80">
              <span className="uppercase">Race</span>
              <span className="uppercase">A.I confidence</span>
            </div>
            <div>
              <button
                className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                  activeRaceBox === 1
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                }`}
                onClick={() => handleRaceSelection(1, "east asian")}
              >
                <span>East Asian</span>
                <div>
                  {apiResults ? (
                    <p>
                      {Math.round(apiResults.data.race["east asian"] * 100)} %
                    </p>
                  ) : (
                    <p>loading...</p>
                  )}
                </div>
              </button>
              <button
                className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                  activeRaceBox === 2
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                }`}
                onClick={() => handleRaceSelection(2, "white")}
              >
                <span>White</span>
                <div>
                  {apiResults ? (
                    <p>{Math.round(apiResults.data.race.white * 100)} %</p>
                  ) : (
                    <p>loading...</p>
                  )}
                </div>
              </button>
              <button
                className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                  activeRaceBox === 3
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
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
                    <p>loading...</p>
                  )}
                </div>
              </button>
              <button
                className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                  activeRaceBox === 4
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
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
                    <p>loading...</p>
                  )}
                </div>
              </button>
              <button
                className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                  activeRaceBox === 5
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                }`}
                onClick={() => handleRaceSelection(5, "latino hispanic")}
              >
                <span>Latino Hispanic</span>
                <div>
                  {apiResults ? (
                    <p>
                      {JSON.stringify(
                        Math.round(
                          apiResults.data.race["latino hispanic"] * 100
                        )
                      )}{" "}
                      %
                    </p>
                  ) : (
                    <p>loading...</p>
                  )}
                </div>
              </button>
              <button
                className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                  activeRaceBox === 6
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                }`}
                onClick={() => handleRaceSelection(6, "southeast asian")}
              >
                <span>South East Asain</span>
                <div>
                  {apiResults ? (
                    <p>
                      {JSON.stringify(
                        Math.round(
                          apiResults.data.race["southeast asian"] * 100
                        )
                      )}{" "}
                      %
                    </p>
                  ) : (
                    <p>loading...</p>
                  )}
                </div>
              </button>
              <button
                className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                  activeRaceBox === 7
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
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
                    <p>loading...</p>
                  )}
                </div>
              </button>
            </div>
          </div>
        )}
        {/* Age Demographic */}
        {activeBox === 2 && (
          <div className="demographics-race-confidence border-t-1 ">
            <div className="flex justify-between pt-[14px] pb-[14px] pl-[16px] pr-[16px] opacity-80">
              <span className="uppercase">Age</span>
              <span className="uppercase">A.I confidence</span>
            </div>
            <div>
              <button
                className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                  activeAgeBox === 1
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                }`}
                onClick={() => handleAgeSelection(1, "3-9")}
              >
                <span>0-9</span>
                <div>
                  {apiResults ? (
                    <p>{Math.round(apiResults.data.age["3-9"] * 100)} %</p>
                  ) : (
                    <p>loading...</p>
                  )}
                </div>
              </button>
              <button
                className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                  activeAgeBox === 2
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                }`}
                onClick={() => handleAgeSelection(2, "10-19")}
              >
                <span>10-19</span>
                <div>
                  {apiResults ? (
                    <p>{Math.round(apiResults.data.age["10-19"] * 100)} %</p>
                  ) : (
                    <p>loading...</p>
                  )}
                </div>
              </button>
              <button
                className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                  activeAgeBox === 3
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                }`}
                onClick={() => handleAgeSelection(3, "20-29")}
              >
                <span>20-29</span>
                <div>
                  {apiResults ? (
                    <p>
                      {JSON.stringify(
                        Math.round(apiResults.data.age["20-29"] * 100)
                      )}{" "}
                      %
                    </p>
                  ) : (
                    <p>loading...</p>
                  )}
                </div>
              </button>
              <button
                className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                  activeAgeBox === 4
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                }`}
                onClick={() => handleAgeSelection(4, "30-39")}
              >
                <span>30-39</span>
                <div>
                  {apiResults ? (
                    <p>
                      {JSON.stringify(
                        Math.round(apiResults.data.age["30-39"] * 100)
                      )}{" "}
                      %
                    </p>
                  ) : (
                    <p>loading...</p>
                  )}
                </div>
              </button>
              <button
                className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                  activeAgeBox === 5
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                }`}
                onClick={() => handleAgeSelection(5, "40-49")}
              >
                <span>40-49</span>
                <div>
                  {apiResults ? (
                    <p>
                      {JSON.stringify(
                        Math.round(apiResults.data.age["40-49"] * 100)
                      )}{" "}
                      %
                    </p>
                  ) : (
                    <p>loading...</p>
                  )}
                </div>
              </button>
              <button
                className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer  transition ${
                  activeAgeBox === 6
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                }`}
                onClick={() => handleAgeSelection(6, "50-59")}
              >
                <span>50-59</span>
                <div>
                  {apiResults ? (
                    <p>
                      {JSON.stringify(
                        Math.round(apiResults.data.age["50-59"] * 100)
                      )}{" "}
                      %
                    </p>
                  ) : (
                    <p>loading...</p>
                  )}
                </div>
              </button>
              <button
                className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer  transition ${
                  activeAgeBox === 7
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                }`}
                onClick={() => handleAgeSelection(7, "60-69")}
              >
                <span>60-69</span>
                <div>
                  {apiResults ? (
                    <p>
                      {JSON.stringify(
                        Math.round(apiResults.data.age["60-69"] * 100)
                      )}{" "}
                      %
                    </p>
                  ) : (
                    <p>loading...</p>
                  )}
                </div>
              </button>
              <button
                className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer  transition ${
                  activeAgeBox === 8
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                }`}
                onClick={() => handleAgeSelection(8, "70+")}
              >
                <span>70+</span>
                <div>
                  {apiResults ? (
                    <p>
                      {JSON.stringify(
                        Math.round(apiResults.data.age["70+"] * 100)
                      )}{" "}
                      %
                    </p>
                  ) : (
                    <p>loading...</p>
                  )}
                </div>
              </button>
            </div>
          </div>
        )}
        {/* Gender demograpic*/}
        {activeBox == 3 && (
          <div className="demographics-race-confidence border-t-1">
            <div className="flex justify-between pt-[14px] pb-[14px] pl-[16px] pr-[16px] opacity-80">
              <span className="uppercase">Sex</span>
              <span className="uppercase">A.I confidence</span>
            </div>
            <div>
              <button
                className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                  activeSexBox === 1
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                }`}
                onClick={() => handleGenderSelection(1, "female")}
              >
                <span>Female</span>
                <div>
                  {apiResults ? (
                    <p>{Math.round(apiResults.data.gender.female * 100)} %</p>
                  ) : (
                    <p>loading...</p>
                  )}
                </div>
              </button>
              <button
                className={`flex justify-between pt-[12px] pb-[12px] pl-[16px] pr-[16px] w-[100%] cursor-pointer transition ${
                  activeSexBox === 2
                    ? "bg-[#1a1b1c] text-[#fcfcfc]"
                    : "bg-[#f3f3f4] hover:bg-[#e1e1e2]"
                }`}
                onClick={() => handleGenderSelection(2, "male")}
              >
                <span>Male</span>
                <div>
                  {apiResults ? (
                    <p>{Math.round(apiResults.data.gender.male * 100)} %</p>
                  ) : (
                    <p>loading...</p>
                  )}
                </div>
              </button>
            </div>
          </div>
        )}
      </main>
      <div className="bottom--demographic__box">
        <Link href={"/introduction/upload"}
          
          className="cursor-pointer"
        >
          <img
            src="/images/button-icon-back-shrunk.png"
            className="w-[90px] sm:w-auto"
            alt=""
          />
        </Link>
        <p className="text-[#A0A4AB]">
          If A.I. estimate is wrong, select the correct one.
        </p>
        <div className="right-8 bottom-[16px] text-xs">
          <button className="mr-[8px] pt-[9px] pr-[16px] pb-[10px] pl-[16px] border-1 uppercase cursor-not-allowed">
            Reset
          </button>
          <button className="pt-[9px] pr-[16px] pb-[10px] pl-[16px] bg-[#1a1b1c] text-[#f3f3f4] uppercase cursor-not-allowed">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
