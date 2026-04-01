import express, { text } from "express";
import { GoogleGenAI } from "@google/genai";
import { getSystemPrompt } from "./prompts";

export const app = express();
app.use(express.json())

const ai = new GoogleGenAI({});

app.post('/template', async (req, res) => {
  try {
    const prompt = req.body.prompt

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      config: {
      systemInstruction: {
        role: "system",
        parts: [
          {
            text: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra",
          },
        ],
      },
    },
    contents: ''
    })

    console.log(response.text)

    return
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      msg: "something went wrong"
    })
  }
})


async function main() {
  const response = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: {
        role: "system",
        parts: [
          {
            text: getSystemPrompt(),
          },
        ],
      },
    },
    contents: [
      {
        role: "user",
        parts: [
          {
            text: "For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\nBy default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\nUse icons from lucide-react for logos.\n",
          },
        ],
      },
      {
        role: "user",
        parts: {
          text: `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
        }
      }
    ],
  });

  for await (const chunk of response) {
    process.stdout.write(chunk.text);
  }
}

// main();
