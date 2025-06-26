"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import "./widget.css";

const CloudDetails = () => {
  // State hooks to manage analysis result, loading state, and error messages
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null); // Ref for file input trigger

  // Predefined sample image(s) for testing
  const images = [{ id: 1, src: "/images/1.png", alt: "Cloud Image 1" }];

  // Sends the selected image to the cloud classification API
  const analyzeImage = async (file) => {
    try {
      setLoading(true);
      setError("");
      setResult("");

      const formData = new FormData();
      formData.append("image", file);

      const apiResponse = await fetch("https://weather.op-bit.nz/analyze", {
        method: "POST",
        body: formData,
      });

      const resultData = await apiResponse.json();

      // Check and parse the returned prediction string
      if (resultData.error) {
        setError(resultData.error);
      } else {
        const match = resultData.result.match(
          /Prediction:\s*(\w+)\s+Confidence:\s*(\d+(\.\d+)?)/i
        );
        if (match) {
          const label = match[1];
          const confidence = parseFloat(match[2]);
          const confidencePercent = Math.round(confidence * 100);
          setResult(`Prediction: ${label} (${confidencePercent}%)`);
        } else {
          // Fallback in case parsing fails
          setResult(resultData.result);
        }
      }
    } catch (error) {
      setError("Error occurred during prediction.");
    } finally {
      setLoading(false);
    }
  };

  // Handles file input validation and triggers analysis
  const handleFileUpload = (file) => {
    if (!file || (file.type !== "image/jpeg" && file.type !== "image/png")) {
      setError("Only JPEG and PNG images are supported.");
      return;
    }
    analyzeImage(file);
  };

  // Handles test image click and converts it into a blob for analysis
  const handleImageClick = async (imageSrc) => {
    const response = await fetch(imageSrc);
    const imageBlob = await response.blob();
    analyzeImage(imageBlob);
  };

  return (
    <div className="widget expanded relative rounded-lg flex items-center justify-center w-full">
      <div className="text-center w-full">
        <h1 className="text-xl font-semibold pb-2 pt-5">
          Cloud Details (Experimental)
        </h1>

        {/* Drag and drop or click-to-upload area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={(e) => {
            e.preventDefault();
            handleFileUpload(e.dataTransfer.files[0]);
          }}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto border-dashed border-gray-400 rounded-md p-4 cursor-pointer mb-4 text-sm text-gray-300 hover:bg-white/5 transition"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              fileInputRef.current?.click();
            }
          }}
        >
          Drag and Drop Image Here or Click to Upload
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg, image/png"
            onChange={(e) => handleFileUpload(e.target.files[0])}
            className="hidden"
          />
        </div>

        {/* Sample/test images section */}
        <div className="flex gap-4 flex-wrap justify-center mb-4">
          {images.map((image) => (
            <Image
              key={image.id}
              width={112}
              height={112}
              src={image.src}
              alt={image.alt}
              className="w-28 h-28 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                handleImageClick(image.src);
              }}
            />
          ))}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="flex items-center justify-center space-x-2 text-base text-[--secondary-foreground] mt-4">
            <div className="loader w-5 h-5 rounded-full bg-gray-300 animate-pulse"></div>
            <span>Analyzing image...</span>
          </div>
        )}

        {/* Error message display */}
        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}

        {/* Result display box */}
        {result && (
          <div className="mt-6 w-full max-w-sm mx-auto p-4 bg-white text-black rounded-md shadow-md text-left">
            <h3 className="text-lg font-semibold mb-2">Prediction Result</h3>
            <p className="text-sm">{result}</p>
          </div>
        )}

        {/* Disclaimer for users */}
        <p className="text-xs text-white/60 mt-3 italic pb-3">
          Note: Predictions are experimental and may not always be accurate.
        </p>
      </div>
    </div>
  );
};

export default CloudDetails;
