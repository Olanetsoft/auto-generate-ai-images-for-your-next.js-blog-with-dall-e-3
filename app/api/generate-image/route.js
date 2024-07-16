import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const { title } = await req.json();

  try {
    // Generate image with DALL-E
    const dalleResponse = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: `Create a simple, professional, and relatable blog banner image that represents: "${title}".
          The image should be clear, not abstract, and suitable for a professional blog post.
          Avoid text in the image. Focus on symbolic or metaphorical representations that align with the title's theme.
          The image should work well as a background with text overlay.`,
          n: 1,
          size: "1024x1024",
        }),
      }
    );

    if (!dalleResponse.ok) {
      const error = await dalleResponse.json();
      console.error("Error generating image:", error);
      return NextResponse.json(
        { error: "Failed to generate image" },
        { status: 500 }
      );
    }

    const dalleData = await dalleResponse.json();
    const imageUrl = dalleData.data[0].url;

    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(imageUrl);

    // Apply transformations step by step
    const transformedImageUrl = cloudinary.url(uploadResponse.public_id, {
      transformation: [
        { width: 1200, height: 630, crop: "fill", gravity: "center" },
        { effect: "brightness:-80" },
        {
          overlay: {
            font_family: "Roboto",
            font_size: 70,
            font_weight: "bold",
            text: encodeURIComponent(encodeURIComponent(title)),
          },
          color: "white",
          gravity: "center",
          y: 0,
          width: 1000,
          crop: "fit",
        },
        { effect: "shadow:30", color: "black" },
      ],
    });

    return NextResponse.json({ imageUrl: transformedImageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
