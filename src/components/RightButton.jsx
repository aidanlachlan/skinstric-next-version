import React from "react";
import Link from "next/link";

const RightButton = ({ href, children, onMouseEnter, onMouseLeave, className = "" }) => (
  <Link
    href={href}
    className={`relative flex items-center justify-end ${className}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <span className="text-[14px] pr-4">{children}</span>
    <div className="w-[40px] h-[40px] z-10 relative">
      <img src="/assets/skinstric-button-right.png" alt="Right button" />
    </div>
  </Link>
);

export default RightButton;

