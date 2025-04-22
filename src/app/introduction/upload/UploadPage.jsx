"use client";

import Header from "../../components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";


export default function page() {
  const [base64Image, setBase64Image] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseUploadMessage, setResponseUploadMessage] = useState("");
  const [isImage, setIsImage] = useState(false);
  const [isImageBtn, setIsImageBtn] = useState(false);
  const [isCapturedImage, setIsCapturedImage] = useState(false);
  const [isCapturedImageBtn, setIsCapturedImageBtn] = useState(false);
  const [isProcceedUploadImg, setIsProcceedUploadImg] = useState(false);
  const [isProcceedCapturedImg, setIsProcceedCapturedImg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();
  

  // Convert image to Base64
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const options = {
      maxSizeMB: 1, // limit to 1MB
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const base64 = await imageCompression.getDataUrlFromFile(compressedFile);
      setBase64Image(base64);
      setIsImage(true);
      setIsImageBtn(true);
    } catch (err) {
      console.error("Image compression error:", err);
    }
  };

  // Send Base64 string to API
  const handleUpload = async () => {
    setIsLoading(true); // Start loading
    setIsImageBtn(false);

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
        setIsProcceedUploadImg(true);
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Send Base string to the database
  const handleUploadImgSubmit = async () => {
    const res = await fetch(`https://skintric-project.vercel.app/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64Image }),
    });

    const data = await res.json();
    if (data.message === "Image uploaded successfully!") {
      router.push("/analysis");
    } else {
      toast.error(data.message);
      setTimeout(() => {
        router.push('/introduction')
      }, 3000);
    }
  };
  // Captured Image
  const handleProcessImage = async () => {
    if (!capturedImage) return;

    setIsCapturedImageBtn(false);
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
      if (result) {
        setIsProcceedCapturedImg(true);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setResponseUploadMessage("Uploaded Complete");
    } catch (error) {
      setResponseUploadMessage(`Error: ${error.message}`);
      console.error("Error processing image:", error);
    } finally {
      setIsUploading(false);
    }
  };
  // Send Captured Image to the database
  const handleCapturedImgSubmit = async () => {
    const res = await fetch(`https://skintric-project.vercel.app/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: capturedImage }),
    });

    const data = await res.json();
    if (data.message === "Image uploaded successfully!") {
      router.push("/analysis");
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    const storedCapturedData = localStorage.getItem("capturedImage");

    if (storedCapturedData) {
      setCapturedImage(storedCapturedData);
      setIsCapturedImage(true);
      setIsCapturedImageBtn(true);
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
        style={{ marginTop: isImage || isCapturedImage ? "100px" : "mt-30" }}
        data-aos="fade-in"
        data-aos-delay="800"
      >
        <div
          className="flex flex-col items-center"
          style={{ display: isImage ? "none" : "flex" }}
        >
          <Link href={"/scan"}>
            <img
              src={capturedImage || "/images/camera.png"}
              className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[400px] md:h-[400px] xl:max-w-[500px] object-cover flex items-center cursor-pointer transition"
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
              visibility: isCapturedImageBtn ? "visible" : "hidden",
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
          style={{ display: isCapturedImage ? "none" : "flex" }}
        >
          <img
            src={base64Image || "/images/gallery.png"}
            className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[400px] md:h-[400px] xl:max-w-[500px] object-cover"
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
              visibility: isImageBtn ? "visible" : "hidden",
              transition: "visibility 300ms ease-in-out",
            }}
            onClick={handleUpload}
            className="px-4 py-2 bg-[#1a1b1c] text-white text-xs sm:text-base rounded-lg hover:opacity-80 transition duration-300 cursor-pointer "
          >
            Upload Image
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
      <button
        onClick={handleUploadImgSubmit}
        style={{
          visibility: isProcceedUploadImg ? "visible" : "hidden",
          transition: "visibility 300ms ease-in-out",
        }}
        className="absolute bottom-8 right-8 cursor-pointer"
      >
        <img
          src="/images/button-icon-proceed-shrunk.png"
          className="w-[110px] h-auto sm:w-auto"
          alt=""
        />
      </button>
      <button
        onClick={handleCapturedImgSubmit}
        style={{
          visibility: isProcceedCapturedImg ? "visible" : "hidden",
          transition: "visibility 300ms ease-in-out",
        }}
        className="absolute bottom-8 right-8 cursor-pointer"
      >
        <img
          src="/images/button-icon-proceed-shrunk.png"
          className="w-[110px] h-auto sm:w-auto"
          alt=""
        />
      </button>
    </>
  );
}
