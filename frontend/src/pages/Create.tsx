import axios from "axios";
import { act, use, useEffect, useState } from "react";
import { parsePath, useLocation } from "react-router-dom";
import { parseXml } from "../utils/steps";
import { StepType, type FileItem, type Step } from "../types";
import StepCard from "../components/StepCard";
import { FileExplorer } from "../components/FileExplorer";
import { CodeEditor } from "../components/CodeEditor";
import { useWebContainer } from "../hooks/useWebContainer";
import type { FileNode } from "@webcontainer/api";
import { PreviewFrame } from "../components/PreviewFrame";
import { TabView } from "../components/TabView";

export default function Create() {
  const location = useLocation();
  const data = location.state;

  const webcontainer = useWebContainer()

  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [steps, setSteps] = useState<Step[]>([]);

  async function init() {
    const res = await axios.post(`${BACKEND_URL}/template`, {
      prompt: data.trim(),
    });

    const { prompts, uiPrompts } = res.data;

    setSteps(
      parseXml(uiPrompts[0]).map((x: Step) => ({
        ...x,
        status: "pending",
      })),
    );

    const stepsRes = await axios.post(`${BACKEND_URL}/chat`, {
      messages: [...prompts, { role: "user", content: data }],
    });

    setSteps(s => [...s, ...parseXml(stepsRes.data.response).map(x => ({
      ...x,
      status: "pending" as "pending"
    }))])
  }

  // when the steps changes, we need to create them to the file explorer
  const [files, setFiles] = useState<any[]>([]);
  useEffect(() => {
    let originalFiles = [...files];
    let updateHappened = false;
    steps
      .filter(({ status }) => status === "pending")
      .map((step) => {
        updateHappened = true;
        if (step?.type === StepType.CreateFile) {
          let parsedPath = step.path?.split("/") ?? []; // ["src", "components", "App.tsx"]
          let currentFileStructure = [...originalFiles]; // {}
          let finalAnswerRef = currentFileStructure;

          let currentFolder = "";
          while (parsedPath.length) {
            currentFolder = `${currentFolder}/${parsedPath[0]}`;
            let currentFolderName = parsedPath[0];
            parsedPath = parsedPath.slice(1);

            if (!parsedPath.length) {
              // final file
              let file = currentFileStructure.find(
                (x) => x.path === currentFolder,
              );
              if (!file) {
                currentFileStructure.push({
                  name: currentFolderName,
                  type: "file",
                  path: currentFolder,
                  content: step.code,
                });
              } else {
                file.content = step.code;
              }

            } else {
              /// in a folder
              let folder = currentFileStructure.find(
                (x) => x.path === currentFolder,
              );
              if (!folder) {
                // create the folder
                currentFileStructure.push({
                  name: currentFolderName,
                  type: "folder",
                  path: currentFolder,
                  children: [],
                });
              }

              currentFileStructure = currentFileStructure.find(
                (x) => x.path === currentFolder,
              )!.children!;
            }
          }
          originalFiles = finalAnswerRef;
        }
      });

    if (updateHappened) {
      setFiles(originalFiles);
      setSteps((steps) =>
        steps.map((s: Step) => {
          return {
            ...s,
            status: "completed",
          };
        }),
      );
    }
  }, [steps, files]);

// useEffect(() => {
//     const createMountStructure = (files: FileItem[]): Record<string, any> => {
//       const mountStructure: Record<string, any> = {};
  
//       const processFile = (file: FileItem, isRootFolder: boolean) => {  
//         if (file.type === 'folder') {
//           // For folders, create a directory entry
//           mountStructure[file.name] = {
//             directory: file.children ? 
//               Object.fromEntries(
//                 file.children.map(child => [child.name, processFile(child, false)])
//               ) 
//               : {}
//           };
//         } else if (file.type === 'file') {
//           if (isRootFolder) {
//             mountStructure[file.name] = {
//               file: {
//                 contents: file.content || ''
//               }
//             };
//           } else {
//             // For files, create a file entry with contents
//             return {
//               file: {
//                 contents: file.content || ''
//               }
//             };
//           }
//         }
  
//         return mountStructure[file.name];
//       };
  
//       // Process each top-level file/folder
//       files.forEach(file => processFile(file, true));
  
//       return mountStructure;
//     };
  
//     const mountStructure = createMountStructure(files);
  
//     // Mount the structure if WebContainer is available
//     console.log(mountStructure);
//     webcontainer?.mount(mountStructure);
//   }, [files, webcontainer]);

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="py-2">
      <h1 className="font-md text-lg mb-10">{data}</h1>

      <div className="flex gap-5">
        <div className="w-1/4">
          {steps.map((step: any) => (
            <StepCard title={step.title} />
          ))}
        </div>
        <div className="w-1/3">
          <FileExplorer files={files} onFileSelect={setSelectedFile} />
        </div>

        {/* code editor */}
        <div className="w-2/3 flex flex-col">
          <TabView activeTab={activeTab} onTabChange={setActiveTab} />
          {activeTab === "code" ? (
            <CodeEditor file={selectedFile} />
          ) : (
            <PreviewFrame webContainer={webcontainer!} files={files} />
          )}
        </div>
      </div>
    </div>
  );
}
