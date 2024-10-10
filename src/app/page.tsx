"use client";

import React, { useState } from "react";
import { Zap, ChevronDown } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const languages = [
    "Spanish",
    "Mandarin",
    "Hindi",
    "Arabic",
    "French",
    "Bengali",
    "Russian",
    "Portuguese",
    "Indonesian",
    "Urdu",
    "German",
    "Japanese",
    "Swahili",
    "Turkish",
    "Korean",
    "Italian",
    "Thai",
    "Vietnamese",
    "Tamil",
    "Tagalog",
  ];

  const handleConvert = async () => {
    try {
      if (!inputText || !selectedLanguage) {
        toast.error("Please enter a valid input and select a language");
        return;
      }
      setIsLoading(true);
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `${inputText} in ${selectedLanguage}`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoading(false);
        setOutputText(data.message);
      } else {
        console.error("Error sending prompt:", response.statusText);
      }
    } catch (error) {
      console.error("Error during request:", error);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-black font-sans text-white flex flex-col p-4 relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 z-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(20,minmax(0,1fr))]">
          {[...Array(400)].map((_, i) => (
            <div key={i} className="border border-gray-900/30"></div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 flex-grow flex flex-col items-center justify-center">
          <h1 className="text-6xl font-extrabold text-center mb-5">
            <span className="text-white">Let Me</span>
            <span className="text-yellow-400 animate-pulse"> Know</span>
          </h1>
          <p className="text-xl text-center mb-6 text-gray-300">
            What you want to know. I&#39;ll translate it.
          </p>

          <div className="w-full max-w-md space-y-6">
            <div className="relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full px-4 py-3 text-lg bg-gray-900 border-2 border-yellow-400 rounded-md outline-none placeholder-gray-500 text-white focus:ring-2 focus:ring-yellow-400"
              />
              <Zap
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400"
                size={24}
              />
            </div>

            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-4 py-3 text-lg bg-gray-900 border-2 border-yellow-400 rounded-md outline-none text-white focus:ring-2 focus:ring-yellow-400 appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  Select language
                </option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400 pointer-events-none"
                size={24}
              />
            </div>

            <button
              disabled={isLoading}
              onClick={handleConvert}
              className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg rounded-md transition-all hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 uppercase tracking-wider"
            >
              {isLoading ? "Converting..." : "Convert!"}
            </button>

            {outputText && (
              <div className="mt-8 p-4 bg-gray-900 border-2 border-white rounded-md max-h-60 overflow-y-auto">
                <h2 className="text-xl font-bold mb-2 text-yellow-400">
                  Output:
                </h2>
                <p className="text-lg text-white whitespace-pre-wrap">
                  {outputText}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {["⬆️", "⬇️", "⬅️", "➡️"].map((btn) => (
            <div
              key={btn}
              className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-yellow-400 font-bold text-xl border-2 border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"
            >
              {btn}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
