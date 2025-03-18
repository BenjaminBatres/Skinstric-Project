"use client";

import Header from "@/app/components/Header";
import Link from "next/link";
import { useState } from "react";

export default function page() {
  const [base64Image, setBase64Image] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isProcceed, setIsProcceed] = useState(false);

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
      setResponseMessage(`Uploaded Complete!`);
      if (data) {
        setIsProcceed(true);
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
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
        className="flex flex-col justify-around mt-20 items-center gap-4 sm:flex-row sm:mt-30"
        data-aos="fade-in"
        data-aos-delay="800"
      >
        <img
          src="/images/camera.png"
          className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[400px] md:h-[400px] xl:max-w-[500px]"
          alt="Camera"
        />
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

      {/* Response Message */}

      <div className="absolute top-[85%] left-[25%] sm:top-[87%] sm:left-[44.5%]">
        {responseMessage}
      </div>

      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-[#1a1b1c] text-white rounded-lg hover:opacity-80 transition duration-300 cursor-pointer absolute left-[30%] top-[75%] sm:left-[45%] sm:top-[92%]"
      >
        Upload Image
      </button>

      <button
        onClick={() => window.history.back()}
        className="absolute left-8 bottom-8 cursor-pointer"
      >
        <img
          src="/images/button-icon-back-shrunk.png"
          className="w-[90px] sm:w-auto"
          alt=""
        />
      </button>
      <Link
        href={"/analysis"}
        style={{
          opacity: isProcceed ? "1" : "0",
          transition: "opacity 300ms ease-in-out",
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
