"use client";

import React from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import LeftButton from "../components/LeftButton";
import RightButton from "../components/RightButton";

const Select = () => {
  const router = useRouter();

  const buttons = [
    { pos: "top", label: "DEMOGRAPHICS" },
    { pos: "right", label: "COSMETIC\nCONCERNS" },
    { pos: "left", label: "SKIN TYPE\n DETAILS" },
    { pos: "bottom", label: "WEATHER" },
  ];

  const handleClick = (label) => {
    if (label === "DEMOGRAPHICS") {
      router.push("/demographics");
    }
    // Add more routes as other buttons become functional
  };

  return (
    <>
      <div className="absolute top-0 left-0 right-0 px-8 bg-white-custom z-10">
        <div className="flex items-center justify-between h-[48px]">
          <Header subtitleText="ANALYSIS" />
        </div>
        <h1 className="mt-8 mb-4 font-bold font-roobert">A.I. ANALYSIS</h1>
        <p className="font-roobert">
          A.I. HAS ESTIMATED THE FOLLOWING. <br />
          FIX ESTIMATED INFORMATION IF NEEDED
        </p>
      </div>

      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
        <div className="relative w-[400px] h-[400px] rotate-45 group max-md:w-[300px] max-md:h-[300px] max-sm:w-[200px] max-sm:h-[200px]">
          {/* Dotted Diamonds */}
          <div className="pointer-events-none">
            <div className="absolute w-[600px] h-[600px] border border-dotted border-[2px] border-[#E5E7EB] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-0 group-hover:opacity-100 group-hover:delay-[400ms] transition-opacity duration-500 delay-[0ms] max-md:w-[500px] max-md:h-[500px] max-sm:w-[350px] max-sm:h-[350px]" />
            <div className="absolute w-[550px] h-[550px] border border-dotted border-[2px] border-[#D1D5DB] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-0 group-hover:opacity-100 group-hover:delay-[200ms] transition-opacity duration-500 delay-[200ms] max-md:w-[450px] max-md:h-[450px] max-sm:w-[300px] max-sm:h-[300px]" />
            <div className="absolute w-[500px] h-[500px] border border-dotted border-[2px] border-[#A0A4AB] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-0 group-hover:opacity-100 group-hover:delay-[0ms] transition-opacity duration-500 delay-[400ms] max-md:w-[400px] max-md:h-[400px] max-sm:w-[250px] max-sm:h-[250px]" />
          </div>

          {/* Buttons */}
          {buttons.map(({ pos, label }, i) => {
            const isClickable = label === "DEMOGRAPHICS";
            return (
              <button
                key={i}
                onClick={() => isClickable && handleClick(label)}
                className={`diamond-button absolute w-[200px] h-[200px] bg-gray-100 border border-white border-4 transform hover:bg-gray-300 transition-all max-md:w-[150px] max-md:h-[150px] max-sm:w-[100px] max-sm:h-[100px]
                  ${pos === "top" ? "-top-[2px] -left-[2px]" : ""}
                  ${pos === "right" ? "-top-[2px] right-[2px]" : ""}
                  ${pos === "left" ? "bottom-[2px] -left-[2px]" : ""}
                  ${pos === "bottom" ? "bottom-[2px] right-[2px]" : ""}
                  ${!isClickable ? "cursor-not-allowed" : ""}
                `}
              >
                <span className="block transform -rotate-45 font-roobert font-bold whitespace-pre-line max-sm:text-[12px]">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="absolute left-8 bottom-8">
        <LeftButton href="/analysis" className="hover:scale-105 transition-transform">
          BACK
        </LeftButton>
      </div>

      <div className="absolute right-8 bottom-8">
        <RightButton href="/demographics" className="hover:scale-105 transition-transform">
          GET SUMMARY
        </RightButton>
      </div>
    </>
  );
};

export default Select;

