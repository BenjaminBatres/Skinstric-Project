import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-between items-center h-[80vh]">
        <img src={"/images/Rectangle 2779.png"} alt="left-rectangle" />
        <span className="absolute left-8">
          <Link href={"/"}>
            <img
              src={"/images/button-icon-text-shrunk (1).png"}
              alt="left-button-icon"
            />
          </Link>
        </span>
        <img
          src={"/images/Sophisticated skincare.png"}
          width={680}
          height={240}
          alt="title"
        />

        <img src={"/images/Rectangle 2778.png"} alt="right-rectangle" />
        <span className="absolute right-8">
          <Link href={"/"}>
            <img
              src={"/images/button-icon-text-shrunk.png"}
              alt="right-button"
            />
          </Link>
        </span>
      </div>

      <div>
        <p className="pl-8 w-95 uppercase text-smx">
          Skinstric developed an A.I. that creates a highly-personalised routine
          tailored to what your skin needs.
        </p>
      </div>
    </>
  );
}
