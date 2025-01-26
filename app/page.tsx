"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Home() {
  const [fromDropdown, setFromDropdown] = useState(false);
  const [toDropdown, setToDropdown] = useState(false);
  const [fromLanguage, setFromLanguage] = useState("English");
  const [toLanguage, setToLanguage] = useState("Amharic");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const languages = ["English", "Amharic"];

  const handleTranslate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/api/translate", {
        fromLanguage,
        toLanguage,
        text: inputText,
      });

      setTranslatedText(response.data.translatedText); 
    } catch (error) {
      console.error(error);
      alert("An error occurred during translation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800">
      <header className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div className="text-teal-600 font-extrabold text-3xl">Translate</div>
        <div className="space-x-6">
          <button className="text-teal-600 hover:text-teal-800 font-medium">Log in</button>
          <button className="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition">Sign up</button>
        </div>
      </header>

      <main className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 py-10">
        <div className="max-w-lg space-y-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-center leading-tight">
            Get A Quick, Elegant <span className="text-teal-600">Translation</span>
          </h1>
          <form className="space-y-6" onSubmit={handleTranslate}>
            <div className="relative">
              <label className="text-lg font-medium block mb-2">From:</label>
              <div
                className="flex items-center justify-between border border-teal-400 rounded-full px-6 py-3 cursor-pointer bg-white shadow-sm hover:shadow-md transition"
                onClick={() => setFromDropdown(!fromDropdown)}
              >
                <span>{fromLanguage}</span>
                {fromDropdown ? (
                  <ChevronUp className="text-teal-600" size={20} />
                ) : (
                  <ChevronDown className="text-teal-600" size={20} />
                )}
              </div>
              {fromDropdown && (
                <div className="absolute bg-white border border-teal-400 rounded-lg mt-2 w-full z-10 shadow-md">
                  {languages.map((lang) => (
                    <div
                      key={lang}
                      onClick={() => {
                        setFromLanguage(lang);
                        setFromDropdown(false);
                      }}
                      className={`px-6 py-3 hover:bg-teal-50 cursor-pointer ${
                        fromLanguage === lang ? "bg-teal-100 font-semibold" : ""
                      }`}
                    >
                      {lang}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Enter your text here"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full border border-teal-400 rounded-full px-6 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              />
            </div>

            <div className="relative">
              <label className="text-lg font-medium block mb-2">To:</label>
              <div
                className="flex items-center justify-between border border-teal-400 rounded-full px-6 py-3 cursor-pointer bg-white shadow-sm hover:shadow-md transition"
                onClick={() => setToDropdown(!toDropdown)}
              >
                <span>{toLanguage}</span>
                {toDropdown ? (
                  <ChevronUp className="text-teal-600" size={20} />
                ) : (
                  <ChevronDown className="text-teal-600" size={20} />
                )}
              </div>
              {toDropdown && (
                <div className="absolute bg-white border border-teal-400 rounded-lg mt-2 w-full z-10 shadow-md">
                  {languages.map((lang) => (
                    <div
                      key={lang}
                      onClick={() => {
                        setToLanguage(lang);
                        setToDropdown(false);
                      }}
                      className={`px-6 py-3 hover:bg-teal-50 cursor-pointer ${
                        toLanguage === lang ? "bg-teal-100 font-semibold" : ""
                      }`}
                    >
                      {lang}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="flex items-center justify-center bg-teal-600 text-white w-full py-4 rounded-full hover:bg-teal-700 transition"
              disabled={isLoading}
            >
              {isLoading ? "Translating..." : "Translate"}
            </button>
          </form>

          {translatedText && (
            <div className="mt-6 bg-teal-50 p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-teal-600 mb-2">Translated Text:</h2>
              <p>{translatedText}</p>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="mt-10 md:mt-0">
          <Image
            src="/illustration1.png"
            alt="Illustration"
            width={600}
            height={600}
            className=""
          />
        </div>
      </main>
    </div>
  );
}
