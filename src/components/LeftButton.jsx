import React from "react";
import Link from "next/link";

const LeftButton = ({
  href,
  children,
  onMouseEnter,
  onMouseLeave,
  className = "",
  disabled = false,
}) => {
  if (disabled) {
    return (
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`relative flex items-center justify-center cursor-not-allowed pointer-events-none opacity-50 ${className}`}
      >
        <div className="w-[40px] h-[40px] z-10 relative">
          <img
            src="/assets/skinstric-button-left.png"
            alt="Left button"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-[14px] pl-4">{children}</span>
      </div>
    );
  }

  return (
    <Link
      href={href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative flex items-center justify-center ${className}`}
    >
      <div className="w-[40px] h-[40px] z-10 relative">
        <img
          src="/assets/skinstric-button-left.png"
          alt="Left button"
          className="w-full h-full object-contain"
        />
      </div>
      <span className="text-[14px] pl-4">{children}</span>
    </Link>
  );
};

export default LeftButton;
