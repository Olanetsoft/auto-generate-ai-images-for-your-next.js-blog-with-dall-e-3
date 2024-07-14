import ImageForm from "./components/ImageForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Auto-generate AI Images for your Next.js blog with Dall-E 3
        </h1>
        <ImageForm />
      </div>
    </div>
  );
}
