import React, { useState } from "react";
import Header from "../components/Header";
import LeftButton from "../components/LeftButton";
import RightButton from "../components/RightButton";
import Link from 'next/link';

export default function Home() {
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);

  const getTranslateX = () => {
    if (isRightHovered) {
      return "-30vw"; // Adjust this value as needed
    } else if (isLeftHovered) {
      return "30vw"; // Adjust this value as needed
    } else {
      return "0vw";
    }
  };

  const getInnerSpanTranslateX = () => {
    if (isRightHovered) {
      return "-5.8vw"; // Adjust this value for the inner span
    } else if (isLeftHovered) {
      return "5.8vw"; // Adjust this value for the inner span
    } else {
      return "0vw";
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col">
      <div className="flex items-center justify-between bg-white-custom h-[48px] px-8">
        <Header subtitleText='INTRO'/>
        <button className="bg-black text-white font-roobert px-4 py-2 text-[10px] leading-4 uppercase font-semibold tracking-tight cursor-not-allowed" >
          ENTER CODE
        </button>
      </div>
      <main className="flex-1 relative overflow-hidden">
        {/* DESKTOP layout - visible above 1300px */}
        <div className="hidden xl:flex items-center justify-between px-8 h-full">
          {/* Left Button + Border */}
          <div
            className={`relative flex items-center justify-center transition-opacity duration-500 ${
              isRightHovered ? "opacity-0" : "opacity-100"
            }`}
          >
            <div
              className={`absolute w-[500px] h-[500px] border border-dotted border-[#A0A4AB] rotate-45 -left-[400px] transition-opacity duration-500 ${
                isRightHovered ? "opacity-0" : "opacity-100"
              }`}
            />
            <LeftButton
              href="/"
              className="hover:scale-105 transition-transform w-[150px] cursor-not-allowed"
              onMouseEnter={() => setIsLeftHovered(true)}
              onMouseLeave={() => setIsLeftHovered(false)}
              disabled={true}
            >
              DISCOVER A.I.
            </LeftButton>
          </div>

          {/* Center Text (slides left/right) */}
          <div
            className={`relative z-10 text-center transition-transform duration-700 ease-in-out  mx-8`}
            style={{ transform: `translateX(${getTranslateX()})` }}
          >
            <h1 className="font-[Roobert TRIAL] font-light text-[100px] leading-[100px] tracking-[-0.07em] max-w-[700px] px-4 text-center">
              <span style={{ transform: `translateX(${getTranslateX()})` }}>
                Sophisticated
              </span>
              <br />
              <span
                className={`block transition-transform duration-700 ease-in-out px-8`}
                style={{ transform: `translateX(${getInnerSpanTranslateX()})` }}
              >
                Skincare
              </span>
            </h1>
          </div>

          {/* Right Button + Border */}
          <div
            className={`relative flex items-center justify-center transition-opacity duration-500 ${
              isLeftHovered ? "opacity-0" : "opacity-100"
            }`}
          >
            <div
              className={`absolute w-[500px] h-[500px] border border-dotted border-[#A0A4AB] rotate-45 -right-[400px] transition-opacity duration-500 ${
                isLeftHovered ? "opacity-0" : "opacity-100"
              }`}
            />
            <RightButton
              href="/testing"
              className="hover:scale-105 transition-transform w-[150px] flex items-end"
              onMouseEnter={() => setIsRightHovered(true)}
              onMouseLeave={() => setIsRightHovered(false)}
            >
              TAKE TEST
            </RightButton>
          </div>
        </div>

        {/* MOBILE/TABLET LAYOUT - visible below 1300px */}
        <div className="xl:hidden flex flex-col items-center justify-center h-full relative z-10">
          {/* Diamonds */}
          <div className="absolute w-[400px] h-[400px]  border-dotted border-[2px] border-[#E5E7EB] rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 " />
          <div className="absolute w-[350px] h-[350px]  border-dotted border-[2px] border-[#D1D5DB] rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 " />
          <div className="absolute w-[300px] h-[300px]  border-dotted border-[2px] border-[#A0A4AB] rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 " />

          {/* Centered Text */}
          <div className="text-center z-10 px-6">
            <h1 className="font-[Roobert TRIAL] font-light text-[60px] leading-[48px] tracking-[-0.03em] text-center mb-8">
              Sophisticated
              <br />
              Skincare
            </h1>
            <Link href='/testing'>
              <button className="bg-black text-white font-roobert px-6 py-3 text-[12px] leading-5 uppercase font-semibold tracking-tight">
                ENTER EXPERIENCE
              </button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="pb-8">
        <div className="px-8 w-[400px] h-[72px] text-left">
          <p className="font-[Roobert TRIAL] font-normal text-[14px] leading-[24px] tracking-[0] uppercase">
            Skinstric developed an A.I. that creates a highly-personalised
            routine tailored to what your skin needs.
          </p>
        </div>
      </footer>
    </div>
  );
}
