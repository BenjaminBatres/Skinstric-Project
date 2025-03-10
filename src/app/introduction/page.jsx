'use client'
import Link from 'next/link'
import React, { useState } from 'react'

const IntroPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
    <Link href={"/"}>
      Back to Home
    </Link>
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      {/* Hovering over this button moves the box */}
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Hover Me
      </button>

      {/* This box moves when the button is hovered */}
      <div
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "blue",
          transition: "transform 700ms ease-in-out",
          transform: isHovered ? "translateX(150px)" : "translateX(0)",
        }}
      ></div>
    </div>
    
    </>
  )
}

export default IntroPage