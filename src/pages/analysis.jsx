"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import LeftButton from "../components/LeftButton";

const Analysis = () => {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const router = useRouter();

  const handleCameraClick = () => {
    setShowCameraModal(true);
  };

  const handleCameraAllow = async () => {
    setShowCameraModal(false);
    sessionStorage.removeItem("demographicData");
    setIsCameraLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      router.push("/camera");
    } catch (error) {
      console.error("Camera access failed:", error);
      setIsCameraLoading(false);
    }
  };

  const handleGalleryClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    sessionStorage.removeItem("demographicData");

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(",")[1];

      setIsLoading(true);
      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image }),
        });

        const result = await response.json();
        if (result.success) {
          sessionStorage.setItem("demographicData", JSON.stringify(result.data));
          setTimeout(() => {
            setIsLoading(false);
            router.push("/select");
          }, 1000);
        } else {
          console.warn("API response was not successful:", result);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Upload failed:", error);
        setIsLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  if (isCameraLoading || isLoading) {
    const text = isCameraLoading ? "SETTING UP CAMERA..." : "PREPARING YOUR\nANALYSIS...";
    const icon = isCameraLoading
      ? "/assets/skinstric-camera-icon.png"
      : "/assets/skinstric-gallery-icon.png";

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white-custom">
        <div className="relative w-[300px] h-[300px]">
          <div className="absolute w-[400px] h-[400px] border border-dotted border-[2px] border-[#E5E7EB] rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 spin-fast" />
          <div className="absolute w-[350px] h-[350px] border border-dotted border-[2px] border-[#D1D5DB] rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 spin" />
          <div className="absolute w-[300px] h-[300px] border border-dotted border-[2px] border-[#A0A4AB] rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 spin-slow" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] text-center">
            <img
              src={icon}
              alt="Icon"
              className="w-[60px] h-[60px] mx-auto mb-2"
            />
            <div className="font-bold text-lg whitespace-pre-line">{text}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="absolute top-0 left-0 right-0 px-8 bg-white-custom z-10">
        <div className="flex items-center justify-between h-[48px]">
          <Header subtitleText="INTRO" />
        </div>
        <h1 className="mt-8 font-bold">TO START ANALYSIS</h1>
      </div>

      <div className="flex h-screen max-xl:flex-col">
        {/* Left side: CAMERA */}
        <div className="w-1/2 flex items-center justify-center relative max-xl:w-full max-xl:h-1/2">
          <div className="absolute w-[400px] h-[400px] border border-dotted border-[2px] border-[#E5E7EB] rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 spin-fast max-xl:w-[300px] max-xl:h-[300px]" />
          <div className="absolute w-[350px] h-[350px] border border-dotted border-[2px] border-[#D1D5DB] rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 spin max-xl:w-[250px] max-xl:h-[250px]" />
          <div className="absolute w-[300px] h-[300px] border border-dotted border-[2px] border-[#A0A4AB] rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 spin-slow max-xl:w-[200px] max-xl:h-[200px]" />
          <div className="relative z-10">
            <button onClick={handleCameraClick}>
              <img
                src="/assets/skinstric-camera-icon.png"
                className="w-[100px] h-[100px]"
                alt="Camera Icon"
              />
            </button>
            <div className="absolute bottom-[85px] left-[80px] xl:scale-100 scale-75 origin-bottom-left">
              <div className="flex items-start">
                <svg width="66" height="59" viewBox="0 0 66 59" fill="none" overflow="visible" className="shrink-0">
                  <line x1="0" y1="59" x2="63.8" y2="2" stroke="black" strokeWidth="1" />
                  <circle cx="66" cy="0" r="3" fill="none" stroke="#1A1B1C" strokeWidth="1" />
                </svg>
                <span className="text-[14px] font-roobert font-normal leading-[24px] tracking-normal uppercase whitespace-nowrap -mt-6 ml-2" style={{ color: '#1A1B1C' }}>
                  ALLOW A.I.<br />TO SCAN YOUR FACE
                </span>
              </div>
              {showCameraModal && (
                <div className="hidden xl:block absolute top-full mt-2 left-[74px] z-50">
                  <div className="bg-black text-white w-[352px]">
                    <div className="px-6 py-8 text-[14px] font-roobert font-normal uppercase">
                      ALLOW A.I. TO ACCESS YOUR CAMERA
                    </div>
                    <div className="flex justify-end border-t border-white">
                      <button
                        onClick={() => setShowCameraModal(false)}
                        className="px-6 py-4 text-[12px] font-roobert font-bold uppercase"
                        style={{ color: '#A0A4AB' }}
                      >
                        DENY
                      </button>
                      <button
                        onClick={handleCameraAllow}
                        className="px-6 py-4 text-[12px] font-roobert font-bold uppercase text-white"
                      >
                        ALLOW
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {showCameraModal && (
              <div className="xl:hidden absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-black text-white" style={{ width: 'min(352px, 90vw)' }}>
                  <div className="px-6 py-8 text-[14px] font-roobert font-normal uppercase">
                    ALLOW A.I. TO ACCESS YOUR CAMERA
                  </div>
                  <div className="flex justify-end border-t border-white">
                    <button
                      onClick={() => setShowCameraModal(false)}
                      className="px-6 py-4 text-[12px] font-roobert font-bold uppercase"
                      style={{ color: '#A0A4AB' }}
                    >
                      DENY
                    </button>
                    <button
                      onClick={handleCameraAllow}
                      className="px-6 py-4 text-[12px] font-roobert font-bold uppercase text-white"
                    >
                      ALLOW
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side: GALLERY */}
        <div className="w-1/2 flex items-center justify-center relative max-xl:w-full max-xl:h-1/2">
          <div className="absolute w-[400px] h-[400px] border border-dotted border-[2px] border-[#E5E7EB] rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 spin-fast max-xl:w-[300px] max-xl:h-[300px]" />
          <div className="absolute w-[350px] h-[350px] border border-dotted border-[2px] border-[#D1D5DB] rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 spin max-xl:w-[250px] max-xl:h-[250px]" />
          <div className="absolute w-[300px] h-[300px] border border-dotted border-[2px] border-[#A0A4AB] rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 spin-slow max-xl:w-[200px] max-xl:h-[200px]" />
          <div className="relative z-10">
            <button onClick={handleGalleryClick}>
              <img
                src="/assets/skinstric-gallery-icon.png"
                className="w-[100px] h-[100px]"
                alt="Gallery Icon"
              />
            </button>
            <div className="absolute top-[85px] right-[75px] xl:scale-100 scale-75 origin-top-right">
              <div className="relative">
                <svg width="66" height="59" viewBox="0 0 66 59" fill="none" overflow="visible">
                  <line x1="66" y1="0" x2="2.2" y2="57" stroke="black" strokeWidth="1" />
                  <circle cx="0" cy="59" r="3" fill="none" stroke="#1A1B1C" strokeWidth="1" />
                </svg>
                <span className="absolute -bottom-6 right-full pr-2 text-[14px] font-roobert font-normal leading-[24px] tracking-normal uppercase whitespace-nowrap text-right" style={{ color: '#1A1B1C' }}>
                  ALLOW A.I.<br />ACCESS GALLERY
                </span>
              </div>
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div className="absolute left-8 bottom-8">
        <LeftButton
          href="/testing"
          className="hover:scale-105 transition-transform"
        >
          BACK
        </LeftButton>
      </div>

    </>
  );
};

export default Analysis;

