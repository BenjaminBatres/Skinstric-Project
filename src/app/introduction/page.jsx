"use client";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

const IntroPage = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

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
          <h3 className="text-zinc-400 uppercase mb-2 text-xs">
            {isFocused ? "Introduce yourself" : "click to type"}
          </h3>
          <input
            className="size-10/15"
            type="text"
            placeholder="Introduce Yourself"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      </div>
      <Link
        href={"/"}
        className="absolute bottom-16 sm:bottom-8  left-4 sm:left-8 back__btn"
      >
        <img src="/images/button-icon-back-shrunk.png" alt="" />
      </Link>
      <Link
        href={"/analysis"}
        style={{
          opacity: inputValue ? 1 : 0,
          transition: "opacity 300ms ease-in-out",
        }}
        className="absolute bottom-16 sm:bottom-8 right-4 sm:right-8"
      >
        <img src="/images/button-icon-proceed-shrunk.png" alt="" />
      </Link>
    </>
  );
};

export default IntroPage;
