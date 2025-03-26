"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import BottomPara from "./components/BottomPara";
import Header from "./components/Header";
export default function Home() {
  function displayIconBtns() {
    document.body.classList += " modal--open moving-element";
  }

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.classList.remove("modal--open");
    AOS.init({
      easing: "ease",
    });
    localStorage.removeItem("capturedImage")
  }, []);

  return (
    <>
      <Header />
      <button
        className="btn text-sm absolute top-3 right-8 z-1000"
        data-aos="fade-in"
        data-aos-duration="1000"
        data-aos-delay="50"
      >
        Enter Code
      </button>
      <section
        className="flex h-[55vh] sm:h-[80vh] justify-center xl:justify-between items-center relative"
        id="logo__title--section"
      >
        <div
          style={{
            transition: "transform 900ms ease-in-out",
            transform: isHovered ? "translateX(-310px)" : "translateX(0)",
          }}
        >
          <img
            src={"/images/Rectangle 2779.png"}
            className="w-70 hidden xl:block"
            data-aos="fade-in"
            data-aos-delay="350"
            alt="left-rectangle"
          />
        </div>

        <img
          src={"/images/Rectangle 2778.png"}
          className="w-50 sm:w-70 xl:hidden"
          data-aos="fade-in"
          data-aos-delay="350"
          alt="left-rectangle"
        />
        <span className="absolute left-8">
          <div
            style={{
              transition: "transform 900ms ease-in-out",
              transform: isHovered ? "translateX(-180px)" : "translateX(0)",
            }}
          >
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
          </div>
        </span>

        <h1
          className="absolute text-center tracking-[-.07em] leading-[0.945] xl:relative"
          data-aos="fade-up"
          data-aos-delay="350"
          data-aos-duration="1000"
        >
          <span
            style={{
              display: "inline-block",
              transition: "transform  800ms ease-in-out",
              transform: isHovered ? "translateX(-80%)" : "translateX(0)",
            }}
          >
            Sophisticated
          </span>{" "}
          <br />
          <span
            style={{
              display: "inline-block",
              transition: "transform 900ms ease-in-out",
              transform: isHovered ? "translateX(-165%)" : "translateX(0px)",
            }}
          >
            skincare
          </span>
        </h1>

        <button
          onClick={displayIconBtns}
          className="mt-40 sm:mt-50 absolute cursor-pointer uppercase font-bold text-[9px] flex items-center xl:hidden z-100"
        >
          <span className="pr-1" data-aos="fade-in" data-aos-delay="350">
            Enter experience
          </span>
          <span data-aos="fade-in" data-aos-delay="350">
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
          <Link
              href="/introduction"
              className="relative inline-block transition-transform duration-300"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                className="z-1000 transition-transform duration-300"
                draggable="false"
                src="/images/button-icon-text-shrunk.png"
                alt="left-button-icon"
                style={{
                  padding: "10px 20px",
                  transform: isHovered ? "translateX(-50px)" : "translateX(0)",
                  opacity: isHovered ? "0" : "1",
                }}
              />
            </Link>
        </span>
        <div
          style={{
            position: "absolute",
            right: "33px",
            zIndex: -1,
            transition: "transform 600ms ease-in-out",
            opacity: isHovered ? "1" : "0",
            transform: isHovered ? "translateX(-50px)" : "translateX(0)",
          }}
        >
          <img src="/images/button-icon-text-expanded.png" alt="" />
        </div>
      </section>
      {/* MOBILE SCREEN */}
      <div className="modal">
        <div className="modal__half modal__leftArrow">
          {/* left side mobile screen */}
          <div
            style={{
              transition: "transform 0.3s ease-in-out",
              transform: isHovered ? "translateX(-200px)" : "translateX(0)",
            }}
          >
            <img src="/images/Rectangle 2779.png" alt="" />
          </div>
          <span className="absolute right-[25%] top-[46%] w-25 sm:w-auto cursor-not-allowed opacity-40">
            <div
              style={{
                transition: "transform 0.3s ease-in-out",
                transform: isHovered ? "translateX(-200px)" : "translateX(0)",
              }}
            >
              <img
                src={"/images/button-icon-text-shrunk (1).png"}
                alt="right-button"
                draggable="false"
              />
            </div>
          </span>
        </div>
        <div className="modal__half modal__rightArrow">
          <img src="/images/Rectangle 2778.png" className="relative" alt="" />
          <span className="absolute left-[25%] top-[46%] w-25 sm:w-auto">
            <Link
              href="/introduction"
              className="relative inline-block transition-transform duration-300"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                className="z-1000 transition-transform duration-300"
                draggable="false"
                src="/images/button-icon-text-shrunk.png"
                alt="left-button-icon"
                style={{
                  transform: isHovered ? "translateX(-50px)" : "translateX(0)",
                  opacity: isHovered ? "0" : "1",
                }}
              />
            </Link>
          </span>
          <Link href={"/introduction"}>
            <div
              className="top-[44%] w-[45%] sm:w-auto sm:top-[43%] right-[30%] sm:right-[55px]"
              style={{
                position: "absolute",
                zIndex: -1,
                transition: "transform 600ms ease-in-out",
                opacity: isHovered ? "1" : "0",
                transform: isHovered ? "translate(-40px)" : "translate(0)",
              }}
            >
              <img
                src="/images/button-icon-text-expanded.png"
                className="button-icon-text-expanded"
                alt=""
              />
            </div>
          </Link>
        </div>
      </div>

      <BottomPara />
    </>
  );
}
