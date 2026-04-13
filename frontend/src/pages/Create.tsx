import axios from "axios";
import { act, use, useEffect, useState } from "react";
import { parsePath, useLocation } from "react-router-dom";
import { parseXml } from "../utils/steps";
import { StepType, type FileItem, type Step } from "../types";
import StepCard from "../components/StepCard";
import { FileExplorer } from "../components/FileExplorer";
import { CodeEditor } from "../components/CodeEditor";
import { useWebContainer } from "../hooks/useWebContainer";
import { PreviewFrame } from "../components/PreviewFrame";
import { TabView } from "../components/TabView";
import Loading from "../components/Loading";

export default function Create() {
  const location = useLocation();
  const data = location.state;

  const [userPrompt, setUserPrompt] = useState("");
  const [llmMsg, setLlmMsg] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const webcontainer = useWebContainer();
  const [isMounted, setIsMounted] = useState(false);

  const [loading, setLoading] = useState(false)

  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [steps, setSteps] = useState<Step[]>([]);

  async function init() {
    setLoading(true)
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

    console.log(stepsRes.status)
    if(stepsRes.status === 500) setLoading(false)

    setSteps((s) => [
      ...s,
      ...parseXml(stepsRes.data.response).map((x) => ({
        ...x,
        status: "pending" as "pending",
      })),
    ]);

    setLlmMsg(
      [...prompts, prompt].map((content) => ({
        role: "user",
        content,
      })),
    );

    setLlmMsg((x) => [
      ...x,
      { role: "assistant", content: stepsRes.data.response },
    ]);

    setLoading(false)
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

  useEffect(() => {
    const createMountStructure = (files: FileItem[]): Record<string, any> => {
      const mountStructure: Record<string, any> = {};

      const processFile = (file: FileItem, isRootFolder: boolean) => {
        if (file.type === "folder") {
          // For folders, create a directory entry
          mountStructure[file.name] = {
            directory: file.children
              ? Object.fromEntries(
                  file.children.map((child) => [
                    child.name,
                    processFile(child, false),
                  ]),
                )
              : {},
          };
        } else if (file.type === "file") {
          if (isRootFolder) {
            mountStructure[file.name] = {
              file: {
                contents: file.content || "",
              },
            };
          } else {
            // For files, create a file entry with contents
            return {
              file: {
                contents: file.content || "",
              },
            };
          }
        }

        return mountStructure[file.name];
      };

      // Process each top-level file/folder
      files.forEach((file) => processFile(file, true));

      return mountStructure;
    };

    const mountStructure = createMountStructure(files);

    // Mount the structure if WebContainer is available
    console.log(mountStructure);
    webcontainer?.mount(mountStructure).then(() => {
      console.log("files mounted!");
      setIsMounted(true); // 👈 signal that mount is done
    });
  }, [files, webcontainer]);

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="py-2">
      {loading && <Loading />}
      <h1 className="font-md text-md mb-10 bg-gray-800 p-2">Prompt - {data}</h1>

      <div className="flex gap-5">
        <div className="w-1/4 h-[80vh] flex flex-col justify-between">
          <div className="flex flex-col gap-2 h-3/4 overflow-scroll">
          <h1>Steps </h1>
            {steps.map((step: any) => (
              <StepCard title={step.title} />
            ))}
          </div>

          <div>
            <textarea
              name=""
              id=""
              className="p-2 border border-white/20 rounded-md outline-0 w-full"
              placeholder="make this in dark mode..."
              onChange={(e) => setUserPrompt(e.target.value)}
            ></textarea>
            <button
              className="bg-blue-600 w-full rounded-md cursor-pointer"
              onClick={async () => {
                const newMessage = {
                  role: "user" as "user",
                  content: userPrompt,
                };

                const stepsRes = await axios.post(`${BACKEND_URL}/chat`, {
                  messages: [...llmMsg, newMessage],
                });

                setLlmMsg((x) => [...x, newMessage]);
                setLlmMsg(x => [...x, {
                  role: "assistant",
                  content: stepsRes.data.response 
                }])

                setSteps((s) => [
                  ...s,
                  ...parseXml(stepsRes.data.response).map((x) => ({
                    ...x,
                    status: "pending" as "pending",
                  })),
                ]);
              }}
            >
              Send
            </button>
          </div>
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
            webcontainer &&
            isMounted && (
              <PreviewFrame files={files} webContainer={webcontainer} />
            )
          )}
        </div>
      </div>
    </div>
  );
}
