import React from "react";
import Link from "next/link";

export default function Header({ subtitleText }) {
  return (
    <Link href="/">
      <div className="flex justify-center items-center gap-2 text-center">
        <h1 className="font-roobert font-bold text-[14px]">SKINSTRIC</h1>


        <h2 className="font-roobert text-skinstric-gray-light text-[12px] text-bold">
          [ {subtitleText} ]
        </h2>

      </div>
    </Link>
  );
}

