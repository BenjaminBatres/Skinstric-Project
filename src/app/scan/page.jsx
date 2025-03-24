"use client"; 

import { Camera, Diamond } from "lucide-react";
import { useRouter } from "next/navigation"; 
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Page() { 
  const router = useRouter(); // ✅ Now it works correctly
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
    const handlePermissionChange = async () => {
      if (state.hasPermission === false) {
        router.push("/"); // Redirect if denied
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

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      {state.hasPermission === null && (
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
              onClick={() => setState((prev) => ({ ...prev, hasPermission: false }))}
            >
              Deny
            </button>
          </div>
        </div>
      )}
      {state.hasPermission === false && (
        <div className="text-center">
          <h1 className="text-xl font-semibold">Permission Denied</h1>
          <p className="mt-4 text-sm">You have denied camera access.</p>
        </div>
      )}
    </div>
  );
}
