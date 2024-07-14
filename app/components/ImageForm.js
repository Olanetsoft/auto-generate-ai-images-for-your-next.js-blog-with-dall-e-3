"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageForm() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setImageUrl(decodeURIComponent(data.imageUrl));
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveImage = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${title.replace(/\s+/g, "_")}.png`;
    link.click();
  };

  return (
    <div>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter post title"
        className="border rounded-lg p-2 w-full mb-4 text-black"
      />
      <button
        onClick={generateImage}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition-colors"
        disabled={loading}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
            <span className="ml-2">Generating...</span>
          </div>
        ) : (
          "Generate Image"
        )}
      </button>
      {imageUrl && (
        <div className="mt-6 text-center">
          <Image
            src={imageUrl}
            alt="Generated Banner"
            className="rounded-lg shadow-md mb-4 max-h-64 w-full object-cover"
            width={1200}
            height={628}
          />
          <button
            onClick={saveImage}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Save Image
          </button>
        </div>
      )}
    </div>
  );
}
