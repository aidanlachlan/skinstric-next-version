"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import LeftButton from "../components/LeftButton";

const Testing = () => {
  const router = useRouter();
  const questions = ["Introduce Yourself", "Where are you from?"];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [caption, setCaption] = useState("CLICK TO TYPE");
  const [placeholder, setPlaceholder] = useState(questions[0]);
  const [inputValue, setInputValue] = useState("");
  const [answers, setAnswers] = useState({ name: "", location: "" });

  const handleFocus = () => {
    setCaption(placeholder);
    setPlaceholder("");
  };

  const handleBlur = () => {
    if (inputValue.trim() === "") {
      setCaption("CLICK TO TYPE");
      setPlaceholder(questions[currentQuestionIndex]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentQuestionIndex === 0) {
      setAnswers((prev) => ({ ...prev, name: inputValue }));
      setCurrentQuestionIndex(1);
      setCaption("CLICK TO TYPE");
      setPlaceholder(questions[1]);
      setInputValue("");
    } else {
      const finalAnswers = { ...answers, location: inputValue };

      try {
        const res = await fetch(
          "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finalAnswers),
          }
        );

        if (!res.ok) throw new Error("Failed to submit");

        localStorage.setItem("userAnswers", JSON.stringify(finalAnswers));
        console.log("Submitted successfully:", finalAnswers);
        router.push("/analysis");
      } catch (err) {
        console.error("Error submitting form:", err);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <div className="flex items-center justify-between bg-white-custom h-[48px] px-8">
        <Header subtitleText="INTRO" />
      </div>
      <h1 className="ml-8 mt-8 font-bold">TO START ANALYSIS</h1>

      <main className="flex-1 relative overflow-hidden">
        {/* Decorative Dotted Diamonds */}
        <div className="absolute w-[500px] h-[500px] border border-dotted border-[2px] border-[#E5E7EB] rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 spin-slow max-md:w-[400px] max-md:h-[400px]" />
        <div className="absolute w-[450px] h-[450px] border border-dotted border-[2px] border-[#D1D5DB] rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 spin-slower max-md:w-[350px] max-md:h-[350px]" />
        <div className="absolute w-[400px] h-[400px] border border-dotted border-[2px] border-[#A0A4AB] rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 spin-slowest max-md:w-[300px] max-md:h-[300px]" />

        {/* Input Field */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
          <div className="caption mb-4 text-[16px] text-gray-500">
            {caption.toUpperCase()}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              placeholder={placeholder}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="py-2 border-b border-black text-center text-[40px] text-black placeholder:text-black bg-transparent outline-none focus:ring-0 mb-[48px] max-md:text-[28px] max-md:placeholder:text-[28px]"
              style={{
                display: "inline-block",
                width: "auto",
                minWidth: "1ch",
              }}
              size={18}
            />
          </form>
        </div>
      </main>

      <footer className="relative w-full h-[64px]">
        <div className="absolute left-8 bottom-8">
          <LeftButton href="/" className="hover:scale-105 transition-transform">
            BACK
          </LeftButton>
        </div>
      </footer>
    </div>
  );
};

export default Testing;
