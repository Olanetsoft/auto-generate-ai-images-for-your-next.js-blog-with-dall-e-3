"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageForm() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

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
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
            Save Image
          </button>
        </div>
      )}
    </div>
  );
}
