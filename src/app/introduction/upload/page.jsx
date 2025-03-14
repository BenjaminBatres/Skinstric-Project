'use client'

import React from "react";

export default function page() {
  return (
    <>
      <h3
        className="pl-4 sm:pl-8 pt-4 uppercase font-black text-[12px] sm:text-[16px]"
        data-aos="fade-in"
        data-aos-delay="800"
      >
        To start anaysis
      </h3>

      <div className="ml-14 mt-8 md:mt-24  md:flex  md:ml-0  md:justify-around content-center">
        <img src="/images/camera.png" className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] xl:w-auto xl:h-auto" alt="" />
        <img src="/images/gallery.png" className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] xl:w-auto xl:h-auto" alt="" />
      </div>

      <button
        onClick={() => window.history.back()}
        className="absolute w-20 md:w-auto bottom-16 sm:bottom-8  left-4 sm:left-8 back__btn cursor-pointer"
      >
        <img src="/images/button-icon-back-shrunk.png" alt="" />
      </button>
    </>
  );
}
