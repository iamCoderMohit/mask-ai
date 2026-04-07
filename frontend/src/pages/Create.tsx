import axios from "axios"
import { useEffect, useState } from "react"
import { parsePath, useLocation } from "react-router-dom"
import { parseXml } from "../utils/steps"
import { StepType, type Step } from "../types"
import StepCard from "../components/StepCard"
import { FileExplorer } from "../components/FileExplorer"

export default function Create() {
    const location = useLocation()
    const data = location.state

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    const [steps, setSteps] = useState<Step[]>([])

    async function init() {
        const res = await axios.post(`${BACKEND_URL}/template`, {prompt: data.trim()})

        const {prompts, uiPrompts} = res.data

        setSteps(parseXml(uiPrompts[0]).map((x: Step) => ({
            ...x,
            status: "pending"
        })))


        const stepsRes = await axios.post(`${BACKEND_URL}/chat`, {messages: [...prompts, {role: "user", content: data}]})
    }

    // when the steps changes, we need to create them to the file explorer
    const [files, setFiles] = useState<any[]>([])
    useEffect(() => {
    let originalFiles = [...files];
    let updateHappened = false;
    steps.filter(({status}) => status === "pending").map(step => {
      updateHappened = true;
      if (step?.type === StepType.CreateFile) {
        let parsedPath = step.path?.split("/") ?? []; // ["src", "components", "App.tsx"]
        let currentFileStructure = [...originalFiles]; // {}
        let finalAnswerRef = currentFileStructure;
  
        let currentFolder = ""
        while(parsedPath.length) {
          currentFolder =  `${currentFolder}/${parsedPath[0]}`;
          let currentFolderName = parsedPath[0];
          parsedPath = parsedPath.slice(1);
  
          if (!parsedPath.length) {
            // final file
            let file = currentFileStructure.find(x => x.path === currentFolder)
            if (!file) {
              currentFileStructure.push({
                name: currentFolderName,
                type: 'file',
                path: currentFolder,
                content: step.code
              })
            } else {
              file.content = step.code;
            }
          } else {
            /// in a folder
            let folder = currentFileStructure.find(x => x.path === currentFolder)
            if (!folder) {
              // create the folder
              currentFileStructure.push({
                name: currentFolderName,
                type: 'folder',
                path: currentFolder,
                children: []
              })
            }
  
            currentFileStructure = currentFileStructure.find(x => x.path === currentFolder)!.children!;
          }
        }
        originalFiles = finalAnswerRef;
      }

    })

    if (updateHappened) {

      setFiles(originalFiles)
      setSteps(steps => steps.map((s: Step) => {
        return {
          ...s,
          status: "completed"
        }
        
      }))
    }
    console.log(files);
  }, [steps, files]);

    useEffect(() => {   
        init()
    }, [])

    return <div className="py-2">
        <h1 className="font-md text-lg">{data}</h1>

        <div>
            {steps.map((step: any) => (
                <StepCard title={step.title} />
            ))}

            <FileExplorer files={files} />
        </div>
    </div>
}