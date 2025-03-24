"use client"; 

import { Camera, Diamond } from "lucide-react";
import { useRouter } from "next/navigation"; 
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Page() { 
  const router = useRouter();
  const videoRef = useRef(null);
  const [state, setState] = useState({
    hasPermission: null,
    videoStream: null,
    toast: null,
    countdown: 3,
    isCapturing: false,
    flashActive: false,
    isLoading: false,
  });

  useEffect(() => {
    if (state.countdown === 0 && state.isCapturing) {
      handleCaptureImage();
    }
  }, [state.countdown, state.isCapturing]);

  const handleCameraError = (error) => {
    console.error("Camera error:", error);
    const messages = {
      NotReadableError: "Camera is already in use by another application.",
      NotAllowedError: "Camera access was denied.",
      OverconstrainedError: "No camera device meets the specified constraints.",
      default: "An unknown error occurred while accessing the camera.",
    };
    alert(messages[error.name] || messages.default);
  };

  useEffect(() => {
    const handlePermissionChange = async () => {
      if (state.hasPermission === false) {
        router.push("/");
      } else if (state.hasPermission === true) {
        if (typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setState((prev) => ({ ...prev, videoStream: stream }));
            if (videoRef.current) videoRef.current.srcObject = stream;
          } catch (error) {
            console.error("Camera access error:", error);
          }
        } else {
          alert("Camera API is not supported in this browser.");
        }
      }
    };
    handlePermissionChange();
  }, [state.hasPermission, router]);

  const renderCameraInterface = () => (
    <div className="relative w-full h-screen">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover transform scale-x-[-1]"
      />

      <button
        className="absolute right-6 top-1/2 flex items-center justify-center w-16 h-16 bg-white text-green-500 rounded-full shadow-lg"
        onClick={startCountdown}
      >
        <Camera size={24} />
      </button>

      {state.isCapturing && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-green-500">
          {state.countdown}
        </div>
      )}

      {state.flashActive && (
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-50 animate-flash" />
      )}

      <div className="absolute flex flex-col bottom-24 md:bottom-0 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-white flex flex-col text-center">
          <p>To get better results make sure to have</p>
          <div className="flex w-full mt-5 uppercase mb-10 text-xs md:text-sm">
            {["Neutral Expression", "Frontal Pose", "Adequate Lighting"].map(
              (text) => (
                <div key={text} className="flex mr-4">
                  <Diamond size={18} className="mt-[2px]" />
                  <p className="px-2">{text}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const startCountdown = useCallback(() => {
    setState((prev) => ({ ...prev, isCapturing: true, countdown: 3 }));
    const interval = setInterval(() => {
      setState((prev) => {
        if (prev.countdown === 1) {
          clearInterval(interval);
          return { ...prev, countdown: 0 };
        }
        return { ...prev, countdown: prev.countdown - 1 };
      });
    }, 1000);
  }, []);

  const renderPermissionRequest = () => (
    <div className="text-center">
      <h1 className="text-2xl font-semibold">Allow Camera Access</h1>
      <p className="mt-4 text-sm">Please allow the camera to scan your face.</p>
      <div className="flex gap-4 mt-6 justify-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => setState((prev) => ({ ...prev, hasPermission: true }))}
        >
          Allow
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
          onClick={() =>
            setState((prev) => ({ ...prev, hasPermission: false }))
          }
        >
          Deny
        </button>
      </div>
    </div>
  );

  

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
        {state.hasPermission === null && renderPermissionRequest()}
        {state.hasPermission === true && renderCameraInterface()}
        {state.hasPermission === false && (
          <div className="text-center">
            <h1 className="text-xl font-semibold">Permission Denied</h1>
            <p className="mt-4 text-sm">You have denied camera access.</p>
          </div>
        )}

        {state.isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-20">
            <div className="text-white text-3xl">Processing...</div>
          </div>
        )}

        
      </div>
  );
}
