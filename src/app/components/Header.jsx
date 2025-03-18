"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Header() {
  useEffect(() => {
    AOS.init();
  });
  return (
    <>
      <header
        className="max-w-[1920px] w-[100%] sm:p-8 pl-4 h-[64px] flex justify-between items-center"
        id="header"
        data-aos="fade-in"
        data-aos-duration="1000"
        data-aos-delay="50"
      >
        <div className="flex">
          <Link href={"/"}>
            <span className="font-bold text-sm uppercase block ">
              Skinstric
            </span>
          </Link>
          <Image
            className="pl-3"
            src={"/images/location.png"}
            width={75}
            height={0}
            alt="intro"
            draggable="false"
          ></Image>
        </div>
      </header>
    </>
  );
}
