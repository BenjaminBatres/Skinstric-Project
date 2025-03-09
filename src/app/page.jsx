"use client";
import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Home() {
  function displayIconBtns() {
    document.body.classList += " modal--open moving-element";
  }

  useEffect(() => {
    document.body.classList.remove("modal--open");
    AOS.init({
      easing: "ease",
    });
  }, []);

  return (
    <>
      <section
        className="flex h-[55vh] sm:h-[80vh] justify-center xl:justify-between items-center relative"
        id="logo__title--section"
      >
        <img
          src={"/images/Rectangle 2779.png"}
          className="w-70 hidden xl:block"
          data-aos="fade-in"
          data-aos-delay="350"
          alt="left-rectangle"
        />
        <img
          src={"/images/Rectangle 2778.png"}
          className="w-50 sm:w-70  xl:hidden"
          data-aos="fade-in"
          data-aos-delay="350"
          alt="left-rectangle"
        />
        <span className="absolute left-8">
          <Link
            href={""}
            className="cursor-not-allowed hidden xl:block opacity-40"
          >
            <img
              data-aos="fade-in"
              data-aos-delay="350"
              draggable="false"
              src={"/images/button-icon-text-shrunk (1).png"}
              alt="left-button-icon"
            />
          </Link>
        </span>
        <img
          data-aos="fade-up"
          data-aos-delay="350"
          data-aos-duration="600"
          className="w-55 sm:w-90 absolute xl:w-auto xl:relative z-10 "
          src={"/images/Sophisticated skincare.png"}
          alt="title"
          draggable="false"
        />

        <button
          onClick={displayIconBtns}
          className="mt-40 sm:mt-50 absolute cursor-pointer uppercase font-bold text-xs flex items-center xl:hidden z-100"
        >
          <span
            className="pr-1"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="350"
          >
            Enter experience
          </span>
          <span
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="350"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-play-fill inline"
              viewBox="0 0 16 16"
            >
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
            </svg>
          </span>
        </button>
        <img
          data-aos="fade-in"
          data-aos-delay="350"
          src={"/images/Rectangle 2779.png"}
          className="w-50 sm:w-70 relative xl:hidden"
          alt="right-rectangle"
        />
        <img
          data-aos="fade-in"
          data-aos-delay="350"
          src={"/images/Rectangle 2778.png"}
          className="hidden xl:block right-0"
          alt="right-rectangle"
        />

        <span className="absolute right-8 hidden xl:block">
          <Link href={"/introduction"}>
            <img
              data-aos="fade-in"
              data-aos-delay="350"
              src={"/images/button-icon-text-shrunk.png"}
              alt="right-button"
              draggable="false"
            />
          </Link>
        </span>
      </section>

      <div className="modal">
        <div className="modal__half modal__leftArrow">
          <img src="/images/Rectangle 2779.png" alt="" />
          <span className="absolute right-[25%] top-[46%] w-25 sm:w-auto cursor-pointer">
            <Link
              href={"/introduction"}
              className="cursor-not-allowed opacity-40"
            >
              <img
                src={"/images/button-icon-text-shrunk (1).png"}
                alt="right-button"
                draggable="false"
              />
            </Link>
          </span>
        </div>
        <div className="modal__half modal__rightArrow">
          <img src="/images/Rectangle 2778.png" className="relative" alt="" />
          <span className="absolute left-[25%] top-[46%] w-25 sm:w-auto">
            <Link href={"/introduction"} className="cursor-pointer">
              <img
                draggable="false"
                src={"/images/button-icon-text-shrunk.png"}
                alt="left-button-icon"
              />
            </Link>
          </span>
        </div>
      </div>

      <div className="absolute top-[75%] sm:top-[87%]">
        <p
          className="pl-8 w-75 uppercase mt-18 sm:mt-0 text-sm md:text-sm md:w-90"
          id="description"
        >
          Skinstric developed an A.I. that creates a highly-personalised routine
          tailored to what your skin needs.
        </p>
      </div>
    </>
  );
}
