import { WebContainer } from '@webcontainer/api';
import React, { useEffect, useState } from 'react';

interface PreviewFrameProps {
  files: any[];
  webContainer: WebContainer | null;
}

export function PreviewFrame({ files, webContainer }: PreviewFrameProps) {
  const [url, setUrl] = useState<string>("");
  const [started, setStarted] = useState(false);

  // 🔹 Convert your files → mount structure
  const createMountStructure = (files: any[]): Record<string, any> => {
    const mountStructure: Record<string, any> = {};

    const processFile = (file: any, isRoot: boolean) => {
      if (file.type === 'folder') {
        mountStructure[file.name] = {
          directory: file.children
            ? Object.fromEntries(
                file.children.map((child: any) => [
                  child.name,
                  processFile(child, false),
                ])
              )
            : {},
        };
      } else {
        return {
          file: {
            contents: file.content || '',
          },
        };
      }

      return mountStructure[file.name];
    };

    files.forEach((file) => processFile(file, true));
    return mountStructure;
  };

  useEffect(() => {
    if (!webContainer || started) return;

    setStarted(true);

    const handleServerReady = (port: number, url: string) => {
      console.log("Server ready:", port, url);
      setUrl(url);
    };

    webContainer.on('server-ready', handleServerReady);

    const main = async () => {
      try {
        // ✅ 1. mount files FIRST
        const structure = createMountStructure(files);
        await webContainer.mount(structure);

        // ✅ 2. install deps
        const installProcess = await webContainer.spawn('npm', ['install']);

        installProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              console.log(data);
            },
          })
        );

        await installProcess.exit;

        // ✅ 3. start dev server
        const devProcess = await webContainer.spawn('npm', ['run', 'dev']);

        devProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              console.log(data);
            },
          })
        );

      } catch (err) {
        console.error("WebContainer error:", err);
      }
    };

    main();

    // return () => {
    //   webContainer.off('server-ready', handleServerReady);
    // };
  }, [webContainer, files, started]);

  return (
    <div className="h-full flex items-center justify-center text-gray-400">
      {!url && (
        <div className="text-center">
          <p className="mb-2">🚀 Starting dev server...</p>
        </div>
      )}

      {url && (
        <iframe
          title="preview"
          src={url}
          className="w-full h-full border-0"
        />
      )}
    </div>
  );
}