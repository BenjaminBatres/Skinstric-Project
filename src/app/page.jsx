import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex h-[55vh] justify-center xl:justify-between items-center relative">
        <img
          src={"/images/Rectangle 2779.png"}
          className="w-70 hidden xl:block"
          alt="left-rectangle"
        />
        <img
          src={"/images/Rectangle 2778.png"}
          className="w-50 xl:hidden"
          alt="left-rectangle"
        />
        <span className="absolute left-8">
          <Link href={""} className="cursor-not-allowed hidden xl:block">
            <img
              className=""
              draggable="false"
              src={"/images/button-icon-text-shrunk (1).png"}
              alt="left-button-icon"
            />
          </Link>
        </span>
        <img
          className="w-55 absolute xl:w-auto xl:relative z-10 "
          src={"/images/Sophisticated skincare.png"}
          alt="title"
          draggable="false"
        />

        <button className="mt-40 absolute cursor-pointer uppercase font-bold text-xs flex items-center xl:hidden z-100">
          <span className="pr-1">Enter experience</span>
          <span>
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
          src={"/images/Rectangle 2779.png"}
          className="w-50 relative xl:hidden"
          alt="right-rectangle"
        />
        <img
          src={"/images/Rectangle 2778.png"}
          className="hidden xl:block right-0"
          alt="right-rectangle"
        />

        <span className="absolute right-8 hidden xl:block">
          <Link href={"/"}>
            <img
              src={"/images/button-icon-text-shrunk.png"}
              alt="right-button"
              draggable="false"
            />
          </Link>
        </span>
      </div>

      <div>
        <p className="pl-8 w-75 uppercase mt-18 text-sm md:text-sm md:w-90">
          Skinstric developed an A.I. that creates a highly-personalised routine
          tailored to what your skin needs.
        </p>
      </div>
    </>
  );
}
