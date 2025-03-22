"use client";
import React, { useState } from "react";

export default function page() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
     <h3>Delete Page</h3>
     <div className="relative flex items-center justify-center h-screen ">
      {/* Button that triggers the animation */}
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Hover Me
      </button>

      {/* Sliding Image */}
      <div
        className={`absolute top-1/2 right-0 -translate-y-1/2 transition-transform duration-500 ease-in-out ${
          isHovered ? "-translate-x-[30px]" : "translate-x-full"
        }`}
        style={{ maxWidth: "none" }} // Prevents image from affecting width
      >
        <img src="/images/rombuses.png" className="w-[300px]" alt="Decorative" />
      </div>
    </div>



    </>
  );
}
