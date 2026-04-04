import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate()
    const [prompt, setPrompt] = useState("")
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-200 flex flex-col gap-10">
        <h1 className="text-5xl font-bold">
          <i>What do you want to build today?</i>
        </h1>

        <textarea className="border w-200 h-40 p-4 text-lg focus:outline-none rounded-md border-gray-600/30" placeholder="Create a website for my e-commerce store..."
        onChange={(e) => setPrompt(e.target.value)}
        />

        <button className="bg-blue-700 w-full rounded-md py-2 cursor-pointer font-bold"
        onClick={() => navigate("/create", {state: prompt})}
        >Start the magic</button>
      </div>
    </div>
  );
}
