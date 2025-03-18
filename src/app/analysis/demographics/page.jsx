"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function page() {
  const [activeBox, setActiveBox] = useState(1);
  return (
    <div className="pl-8">
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

      <main className="flex flex-auto  mt-[90px] pb-[80px]">
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
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  fill="currentColor"
                  className="bi bi-circle ai-result-diagram-svg"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                </svg>
                <span className="absolute left-[50%] top-[50%] -translate-[50%] whitespace-nowrap text-5xl">100<span className="text-2xl">%</span></span>
              </div>
            </div>
          </div>
        </div>
          <div className="demographics-race-confidence border-t-1">
            <div className="flex justify-between pt-[14px] pb-[14px] pl-[16px] pr-[16px] opacity-80">
              <span className="uppercase">Race</span>
              <span className="uppercase">A.I confidence</span>
            </div>
            
          </div>
      </main>
    </div>
  );
}
