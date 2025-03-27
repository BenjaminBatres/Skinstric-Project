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
    localStorage.removeItem("capturedImage");
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
        {/* Introduce yourself input*/}
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
                onKeyDown={handleKeyPress}
                value={name}
                onChange={handleNameChange}
              />
              {/* Show error */}
              {error && <p className="text-[#1a1b1c] text-sm">{error}</p>}
            </div>
          )}
          {/* Where are you from input */}
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
              {/* Show error */}
              {errorLocation && (
                <p className="text-[#1a1b1c] text-sm">{errorLocation}</p>
              )}{" "}
            </div>
          )}
        </div>
      </div>
      <Link
        href={"/"}
        className="absolute w-[30%] md:w-auto  bottom-16 sm:bottom-8  left-4 sm:left-8"
        id="fade-up"
      >
        <img src="/images/button-icon-back-shrunk.png" alt="" />
      </Link>
      {/* Procceed to the next input */}
      {step === 1 && (
        <>
          {name && !error && (
            <button
              onClick={() => setStep(2)}
              className="absolute bottom-16 sm:bottom-8 right-4 sm:right-8 cursor-pointer"
            >
              <img src="/images/button-icon-proceed-shrunk.png" alt="" />
            </button>
          )}
        </>
      )}
      {/* Procceed to the next page */}
      {step === 2 && (
        <>
          {location && !errorLocation && (
            <Link
              href={"/introduction/upload"}
              className="absolute bottom-16 sm:bottom-8 right-4 sm:right-8"
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
