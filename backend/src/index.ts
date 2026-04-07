import express, { text } from "express";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import { basePrompt as nodeBasePrompt } from "./defaults/node";
import { basePrompt as reactBasePrompt } from "./defaults/react";
import OpenAI from "openai";
import cors from 'cors'

export const app = express();
app.use(express.json());

app.use(cors())


const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

app.post("/template", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: 'system',
          content: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra"
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const ans = response.choices[0]?.message.content;
    
    if(ans?.toLowerCase() === "react") {
      return res.json({
        prompts: [
          {
            role: "user",
            content: `${BASE_PROMPT}, Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
          }
        ],
        uiPrompts: [reactBasePrompt]
      })
    }
    
    if(ans?.toLowerCase() === "node") {
      return res.json({
        prompts: [
          {
            role: "user",
            content: `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
          }
        ],
        uiPrompts: [nodeBasePrompt]
      })
    }

    if(ans?.toLowerCase() !== "react" && ans?.toLowerCase() !== "node") {
      return res.status(403).json({
        msg: "received something weird"
      })
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "something went wrong",
    });
  }
});

app.post("/chat", async (req, res) => {
  try {
    const messages = req.body.messages

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: 'system',
          content: getSystemPrompt()
        },
        ...messages
      ],
      stream: true
    })

    for await (const chunk of response) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }

    res.json({
      msg: "done"
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      msg: "something went wrong"
    })
  }
})