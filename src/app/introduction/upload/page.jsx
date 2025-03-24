"use client";

import Header from "@/app/components/Header";
import Link from "next/link";
import { useState, useRef } from "react";

export default function page() {
  const [base64Image, setBase64Image] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isProcceed, setIsProcceed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraAllowed, setCameraAllowed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const videoRef = useRef(null);

  // Convert image to Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setBase64Image(reader.result); // Set Base64 string
      };

      reader.onerror = (error) => {
        console.error("Error converting to Base64:", error);
      };
    }
  };

  // Send Base64 string to API
  const handleUpload = async () => {
    if (!base64Image) {
      setResponseMessage("*Please select an image first.*");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await fetch(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Image }), // Send image as Base64 string
        }
      );

      const data = await response.json();
      localStorage.setItem("apiResult", JSON.stringify(data));

      setResponseMessage(`Uploaded Complete!`);
      if (data) {
        setIsProcceed(true);
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

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
      <Header />
      <h3
        className="pl-4 sm:pl-8 pt-4 uppercase font-black text-[12px] sm:text-[16px]"
        data-aos="fade-in"
        data-aos-delay="800"
      >
        To start anaysis
      </h3>
      <div
        className="flex flex-col justify-around mt-0 items-center gap-0 sm:gap-4 sm:flex-row sm:mt-30"
        data-aos="fade-in"
        data-aos-delay="800"
      >
        {!cameraAllowed && (
        <div className="flex flex-col items-center">
          <img src='/images/camera.png'
            onClick={handleCameraAccess}
            className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[400px] md:h-[400px] xl:max-w-[500px]  object-cover text-white rounded-lg flex items-center  cursor-pointer transition"
          >
          </img>
            <span>ALLOW A.I. TO ACCESS YOUR CAMERA</span>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      )}
        <label htmlFor="file-upload" className="cursor-pointer">
          <img
            src={base64Image || "/images/gallery.png"}
            className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[400px] md:h-[400px] xl:max-w-[500px] rounded-[30%] object-cover"
            alt="Gallery"
          />
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <div className="flex justify-center flex-col items-center mt-6 sm:mt-12">
        <div className="mb-[8px]">
          {/* Show Loading Spinner if isLoading is true inside responseMessage */}
          {isLoading ? (
            <div className="flex items-center">
              <div className="spinner-border animate-spin h-6 w-6 border-4 border-t-transparent border-[#1a1b1c] rounded-full mr-2"></div>
              <span>Uploading...</span>
            </div>
          ) : (
            <span>{responseMessage}</span>
          )}
        </div>
        <button
          data-aos="fade-in"
          data-aos-delay="800"
          onClick={handleUpload}
          className="px-4 py-2 bg-[#1a1b1c] text-white rounded-lg hover:opacity-80 transition duration-300 cursor-pointer"
        >
          Upload Image
        </button>
      </div>

      <Link
        href={"/introduction"}
        className="absolute left-8 bottom-8 cursor-pointer"
      >
        <img
          src="/images/button-icon-back-shrunk.png"
          className="w-[90px] sm:w-auto"
          alt=""
        />
      </Link>
      <Link
        href={"/analysis"}
        style={{
          visibility: isProcceed ? "visible" : "hidden",
          transition: "visibility 300ms ease-in-out",
        }}
        className="absolute bottom-8 right-8"
      >
        <img
          src="/images/button-icon-proceed-shrunk.png"
          className="w-[110px] h-auto sm:w-auto"
          alt=""
        />
      </Link>
    </>
  );
}
