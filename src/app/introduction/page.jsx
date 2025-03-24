"use client";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Header from "../components/Header";

const IntroPage = () => {
  const [step, setStep] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(""); // Error message state
  const [errorLocation, setErrorLocation] = useState(""); // Error message state
  const [location, setLocation] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  const locationOptions = [
    "New York, USA",
    "Los Angeles, USA",
    "London, UK",
    "Tokyo, Japan",
    "San Antonio, USA",
  ];

  const validateName = (input) => {
    const nameRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
    if (input.length < 3) {
      setError("*Name must be at least 3 characters.*");
      return false;
    }
    if (!nameRegex.test(input)) {
      setError("Name can only contain letters and spaces.");
      return false;
    }
    setError(""); // Clear error if valid
    return true;
  };

  const validateLocation = (input) => {
    const locationRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
    if (input.length < 3) {
      setErrorLocation("*Location must be at least 3 characters.*");
      return false;
    }
    if (!locationRegex.test(input)) {
      setErrorLocation("Location can only contain letters and spaces.");
      return false;
    }
    setErrorLocation(""); // Clear error if valid
    return true;
  };

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);
    validateName(inputValue); // Validate input on change
  };

  const handleLocationChange = (e) => {
    const inputValue = e.target.value;
    setLocation(inputValue);
    validateLocation(inputValue); // Validate input on change
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
      <Header />
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
          {step === 1 && (
            <div>
              <h3 className="text-zinc-400 uppercase mb-2 text-xs">
                {isFocused ? "Introduce yourself" : "click to type"}
              </h3>
              <input
                className="w-2/3 h-6 sm:h-9 md:h-13 lg:h-15"
                type="text"
                placeholder="Introduce Yourself"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                // onKeyDown={handleKeyPress}
                value={name}
                onChange={handleNameChange}
              />
              {error && <p className="text-[#1a1b1c] text-sm">{error}</p>}
            </div>
          )}
          {step === 2 && (
            <div>
              <h3 className="text-zinc-400 uppercase mb-2 text-xs">
                {isFocused ? "Where are you from?" : "click to type"}
              </h3>
              <input
                className="w-[80%] h-6 sm:h-9 md:h-13 lg:h-15"
                type="text"
                placeholder="Where are you from?"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={location}
                onChange={handleLocationChange}
              />
              {errorLocation && (
                <p className="text-red-500 text-sm">{errorLocation}</p>
              )}{" "}
              {/* Show error */}
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
            </div>
          )}
        </div>
      </div>
      <Link
        href={"/"}
        className="absolute w-[30%] md:w-auto  bottom-16 sm:bottom-8  left-4 sm:left-8 back__btn"
      >
        <img src="/images/button-icon-back-shrunk.png" alt="" />
      </Link>
      {step === 1 && (
        <div>
          {name && !error && (
            <button
              onClick={() => setStep(2)}
              className="absolute bottom-8 right-8  cursor-pointer"
            >
              <img src="/images/button-icon-proceed-shrunk.png" alt="" />
            </button>
          )}
        </div>
      )}
      {step === 2 && (
        <>
          {location && !errorLocation &&(
              <Link
                href={"/introduction/upload"}
                className="absolute w-[40%] md:w-auto bottom-16 sm:bottom-8 right-[0px] sm:right-8"
              >
                <img src="/images/button-icon-proceed-shrunk.png" alt="" />
              </Link>
            )}
        </>
      )}
    </>
  );
};

export default IntroPage;
