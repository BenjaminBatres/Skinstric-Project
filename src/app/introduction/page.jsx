"use client";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

const IntroPage = () => {
  const [step, setStep] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  const locationOptions = [
    "New York, USA",
    "Los Angeles, USA",
    "London, UK",
    "Tokyo, Japan",
  ];

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    setFilteredOptions(
      locationOptions.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setFilteredOptions([]);
  };

  const goToNextStep = () => {
    if (step === 1 && name.trim() !== "") {
      setStep(2);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      goToNextStep();
    }
  };

  useEffect(() => {
    AOS.init({ easing: "ease" });
  });

  return (
    <>
      <h3
        className="pl-4 sm:pl-8 pt-4 uppercase font-black text-[12px] sm:text-[16px]"
        data-aos="fade-in"
        data-aos-delay="800"
      >
        To start anaysis
      </h3>
      <div
        className="flex justify-center items-center"
        data-aos="fade-in"
        data-aos-delay="800"
      >
        <img src="/images/rombuses (1).png" alt="" />
        <div className="absolute text-center -mt-5">
          {step === 1 ? (
            <>
              <h3 className="text-zinc-400 uppercase mb-2 text-xs">
                {isFocused ? "Introduce yourself" : "click to type"}
              </h3>
              <input
                className="size-10/15"
                type="text"
                placeholder="Introduce Yourself"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyPress}
                value={name}
                onChange={handleNameChange}
              />
            </>
          ) : (
            <>
              <h3 className="text-zinc-400 uppercase mb-2 text-xs">
                {isFocused ? "Where are you from?" : "click to type"}
              </h3>
              <input
                className="w-50 sm:w-70 md:w-80 lg:w-125"
                type="text"
                placeholder="Where are you from?"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={location}
                onChange={handleChange}
              />
              {filteredOptions.length > 0 && (
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "5px 0 0",
                    position: "absolute",
                    width: "100%",
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    maxHeight: "150px",
                    overflowY: "auto",
                    zIndex: 1000,
                  }}
                >
                  {filteredOptions.map((option) => (
                    <li
                      key={option}
                      onClick={() => handleSelect(option)}
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
      <Link
        href={"/"}
        className="absolute w-20 md:w-auto  bottom-16 sm:bottom-8  left-4 sm:left-8 back__btn"
      >
        <img src="/images/button-icon-back-shrunk.png" alt="" />
      </Link>
      <Link
        href={"/introduction/upload"}
        style={{
          opacity: location ? 1 : 0,
          transition: "opacity 300ms ease-in-out",
        }}
        className="absolute w-25 md:w-auto bottom-16 sm:bottom-8 right-4 sm:right-8"
      >
        <img src="/images/button-icon-proceed-shrunk.png" alt="" />
      </Link>
    </>
  );
};

export default IntroPage;
