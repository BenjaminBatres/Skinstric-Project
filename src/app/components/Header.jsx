import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <>
      <header className="max-w-[3560px] w-[100%] h-[64px] pl-[32px] pt-5 flex">
        <Link href={"/"}>
          <span className="font-bold text-sm uppercase">Skinstric</span>
        </Link>
      </header>
    </>
  );
}
