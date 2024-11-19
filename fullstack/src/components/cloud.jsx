'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import './widget.css';

const CloudDetails = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const images = [{ id: 1, src: '/images/1.png', alt: 'Cloud Image 1' }];

  const analyzeImage = async (file) => {
    try {
      setLoading(true);
      setError('');
      setResult('');

      const formData = new FormData();
      formData.append('image', file);

      const apiResponse = await fetch('https://weather.op-bit.nz/analyze', {
        method: 'POST',
        body: formData,
      });
      const resultData = await apiResponse.json();

      if (resultData.error) {
        setError(resultData.error);
      } else {
        setResult(resultData.result);
      }
    } catch (error) {
      setError('Error occurred during prediction.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (file) => {
    if (!file || (file.type !== 'image/jpeg' && file.type !== 'image/png')) {
      setError('Only JPEG and PNG images are supported.');
      return;
    }
    analyzeImage(file);
  };

  const handleImageClick = async (imageSrc) => {
    const response = await fetch(imageSrc);
    const imageBlob = await response.blob();
    analyzeImage(imageBlob);
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div
      onClick={toggleExpand}
      className={`widget ${isExpanded ? 'expanded' : ''} relative rounded-lg cursor-pointer flex items-center justify-center`}
    >
      <div className="text-center">
        <h1 className="px-4 pb-2">Cloud Details (Experimental)</h1>
        <p className={`text-lg mb-4 ${!isExpanded ? 'block' : 'hidden'}`}>
          Click to expand
        </p>
        {/* Conditionally render content when isExpanded is true - using Widget Logic */}
        {isExpanded && (
          <>
            <p className="text-lg">
              This is a cloud prediction model that will return the type of
              cloud found in an image.
            </p>
            <p className="text-lg mb-5">
              Drag and drop an image or click the test image below:
            </p>

            <div
              onDrop={(e) => {
                e.preventDefault();
                handleFileUpload(e.dataTransfer.files[0]);
              }}
              onDragOver={(e) => e.preventDefault()}
              className="border-4 max-w-[600px] mx-auto border-dashed border-gray-400 rounded-lg p-10 cursor-pointer mb-4"
            >
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={(e) => handleFileUpload(e.target.files[0])}
                className="hidden"
              />
              Drag and Drop
            </div>

            <div className="flex gap-4 flex-wrap justify-center mb-4">
              {images.map((image) => (
                <Image
                  key={image.id}
                  width={244}
                  height={144}
                  src={image.src}
                  alt={image.alt}
                  className="w-36 h-36 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-110 hover:shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(image.src);
                  }}
                />
              ))}
            </div>

            {loading && (
              <div className="flex items-center justify-center space-x-2 text-lg text-[--secondary-foreground] mt-4">
                <div className="loader w-6 h-6 rounded-full bg-gray-300 animate-pulse"></div>
                <span>Analyzing image...</span>
              </div>
            )}

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {result && (
              <div className="mt-6 max-w-[600px] justify-center p-4 bg-white text-black rounded-md shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  Prediction Result:
                </h3>
                <pre className="text-sm">{result}</pre>
              </div>
            )}

            <p className="text-sm mt-4">
              Note: Predictions may not always be accurate. Please double-check
              the results.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CloudDetails;
