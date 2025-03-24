'use client'
import React from 'react'
import { useState, useRef  } from "react";
export default function page() {
  const [cameraAllowed, setCameraAllowed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const videoRef = useRef(null);

  // Function to request camera access
  const handleCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraAllowed(true);
      setErrorMessage("");
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      setErrorMessage("Camera access denied. Please allow access.");
      console.error("Error accessing camera:", error);
    }
  };
  return (
    <>
   <div className="flex flex-col items-center justify-center h-screen">
      {/* Camera Icon */}
      {!cameraAllowed && (
        <div className="flex flex-col items-center">
          <img src='/images/camera.png'
            onClick={handleCameraAccess}
            className="p-4  text-white rounded-lg flex items-center gap-2 cursor-pointer transition"
          >
          </img>
            <span>ALLOW A.I. TO ACCESS YOUR CAMERA</span>
          <p className="text-sm text-gray-500 mt-2">ALLOW A.I. TO SCAN YOUR FACE</p>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      )}

      {/* Camera Feed */}
      {cameraAllowed && (
        <video ref={videoRef} autoPlay playsInline className="w-80 h-60 border rounded-lg mt-4" />
      )}
      
    </div>
    
    </>
  )
}
