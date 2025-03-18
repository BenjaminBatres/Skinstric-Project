"use client";
import AOS from "aos";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
  const [isLoading, setLoading] = useState(false);
  const [isProcceed, setIsProcceed] = useState(false);

  const handleOnClick = () => {
    setIsProcceed(true);
  };

  useEffect(() => {
    AOS.init({
      easing: "ease",
      duration: "500",
    });
    setTimeout(() => {
      setLoading(true);
    }, 1500);
  }, []);
  return (
    <>
      {isLoading ? (
        <>
          <header
            className="max-w-[1920px] w-[100%] sm:p-8 pl-4 h-[64px] flex justify-between items-center"
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
            className="font-bold uppercase pl-4 sm:pl-8 pt-8"
            data-aos="fade-in"
            data-aos-delay="1100"
          >
            A. I. analysis
          </h3>
          <h3
            className="uppercase opacity-50 pl-4 text-[12px] sm:text-[14px] sm:pl-8 pt-2"
            data-aos="fade-in"
            data-aos-delay="1100"
          >
            A. I. has estimated the following. <br /> Fix estimated information
            if needed.
          </h3>

          <div
            className="absolute top-[50%] left-[50%] -translate-[50%] w-[100%] mt-8 sm:mt-0 sm:w-auto md:hidden lg:block"
            data-aos="fade-up"
            data-aos-delay="1100"
          >
            <img src="/images/rombuses (2).png" alt="" />
          </div>
          <div
            className="absolute top-[50%] left-[50%] -translate-[50%] w-[80%] mt-8 sm:mt-0 sm:w-auto"
            data-aos="fade-up"
            data-aos-delay="1100"
            data-aos-duration="500"
          >
            <button onClick={handleOnClick} className="cursor-pointer">
              <img src="/images/Group 39959.png" alt="" draggable="false" />
            </button>
          </div>

          <button
            onClick={() => window.history.back()}
            className="absolute left-8 bottom-8 cursor-pointer"
          >
            <img
              src="/images/button-icon-back-shrunk.png"
              className="w-[90px] sm:w-auto"
              alt=""
            />
          </button>
          <Link
            href={"/analysis/demographics"}
            style={{
              opacity: isProcceed ? "1" : "0",
              transition: "opacity 300ms ease-in-out",
            }}
            className="absolute bottom-8 right-8"
          >
            <img
              src="/images/button-icon-summary-shrunk.png"
              className="w-[110px] h-auto sm:w-auto"
              alt=""
            />
          </Link>
        </>
      ) : (
        <div data-aos="fade-in" data-aos-duration="1000">
          <div className="absolute top-[50%] left-[50%] -translate-[50%] w-[100%] sm:w-auto">
            <img src="/images/camera (2).png" alt="" />
          </div>
          <h2 className="absolute top-[50%] left-[50%] -translate-[50%] uppercase font-bold tracking-[-.02px] text-xs sm:text-sm md:text-base">
            Preparing your analysis...
          </h2>
        </div>
      )}
    </>
  );
}
