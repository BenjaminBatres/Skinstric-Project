import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <>
      <header className="max-w-[1920px] w-[100%] p-4 h-[64px] flex justify-between items-center">
        <div className="flex">
          <Link href={"/"}>
            <span className="font-bold text-sm uppercase block ">Skinstric</span>
          </Link>
          <Image
            className="pl-3 hidden sm:block"
            src={"/images/location.png"}
            width={75}
            height={0}
            alt="intro"
            draggable='false'
          ></Image>
        </div>
        <button className="btn text-sm">Enter Code</button>
      </header>
    </>
  );
}
