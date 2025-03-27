"use client";

import Header from "@/app/components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function page() {
  const [base64Image, setBase64Image] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseUploadMessage, setResponseUploadMessage] = useState("");
  const [isImage, setIsImage] = useState(false);
  const [isCapturedImage, setIsCapturedImage] = useState(false);
  const [isProcceed, setIsProcceed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const router = useRouter();

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
      setIsImage(true);
    }
  };

  // Send Base64 string to API
  const handleUpload = async () => {
    setIsLoading(true); // Start loading
    setIsImage(false);

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
  const handleProcessImage = async () => {
    if (!capturedImage) return;

    setIsCapturedImage(false);
    setIsUploading(true);

    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: capturedImage }),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const result = await response.json();
      localStorage.setItem("capturedImage", JSON.stringify(result));

      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push("/analysis");
      setResponseUploadMessage("Uploaded Complete");
    } catch (error) {
      setResponseUploadMessage(`Error: ${error.message}`);
      console.error("Error processing image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    const storedCapturedData = localStorage.getItem("capturedImage");

    if (storedCapturedData) {
      setCapturedImage(storedCapturedData);
      setIsCapturedImage(true);
    } else {
      setCapturedImage(null);
    }
  }, []);

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
        <div className="flex flex-col items-center">
          <Link href={"/scan"}>
            <img
              src={capturedImage || "/images/camera.png"}
              className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[400px] md:h-[400px] xl:max-w-[500px]  object-cover text-white rounded-[30%] flex items-center cursor-pointer transition"
            ></img>
          </Link>
          <div className="mb-[8px] mt-5">
            {isUploading ? (
              <div className="flex items-center">
                <div className="spinner-border animate-spin h-6 w-6 border-4 border-t-transparent border-[#1a1b1c] rounded-full mr-2"></div>
                <span className="text-xs sm:text-base">Uploading...</span>
              </div>
            ) : (
              <span className="text-xs sm:text-base">
                {responseUploadMessage}
              </span>
            )}
          </div>
          <button
            style={{
              visibility: isCapturedImage ? "visible" : "hidden",
              transition: "visibility 300ms ease-in-out",
            }}
            onClick={handleProcessImage}
            className="px-4 py-2 bg-[#1a1b1c] text-white text-xs sm:text-base rounded-lg hover:opacity-80 transition duration-300 cursor-pointer"
          >
            Upload Image
          </button>
        </div>

        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <img
            src={base64Image || "/images/gallery.png"}
            className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[400px] md:h-[400px] xl:max-w-[500px] rounded-[30%] object-cover mt-2 sm:mt-0"
            alt="Gallery"
          />

          <div className="mb-[8px] mt-5">
            {isLoading ? (
              <div className="flex items-center ">
                <div className="spinner-border animate-spin h-6 w-6 border-4 border-t-transparent border-[#1a1b1c] rounded-full mr-2"></div>
                <span className="text-xs sm:text-base">Uploading...</span>
              </div>
            ) : (
              <span className="text-xs sm:text-base mt-10">
                {responseMessage}
              </span>
            )}
          </div>
          <button
            style={{
              visibility: isImage ? "visible" : "hidden",
              transition: "visibility 300ms ease-in-out",
            }}
            onClick={handleUpload}
            className="px-4 py-2 bg-[#1a1b1c] text-white text-xs sm:text-base rounded-lg hover:opacity-80 transition duration-300 cursor-pointer "
          >
            Upload Images
          </button>
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <Link
        href={"/introduction"}
        className="absolute left-8 bottom-8 cursor-pointer"
        id="fade-up"
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
