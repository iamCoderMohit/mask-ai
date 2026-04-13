import { WebContainer } from "@webcontainer/api";
import React, { useEffect, useState } from "react";

interface PreviewFrameProps {
  files: any[];
  webContainer: WebContainer;
}

export function PreviewFrame({ files, webContainer }: PreviewFrameProps) {
  // In a real implementation, this would compile and render the preview
  const [url, setUrl] = useState("");

  async function main() {
    const installProcess = await webContainer.spawn("npm", ["install"]);

    installProcess.output.pipeTo(
      new WritableStream({
        write(data) {
              const clean = data.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '').trim();
              if (clean) console.log(clean);
        },
      }),
    );

    const exitCode = await installProcess.exit; // 👈 wait for it to finish
    console.log("npm install exit code:", exitCode);

    if (exitCode !== 0) {
      console.error("npm install failed!");
      return;
    }

    webContainer.spawn("npm", ["run", "dev"]);

    // Wait for `server-ready` event
    webContainer.on("server-ready", (port, url) => {
      // ...
      console.log(url);
      console.log(port);
      setUrl(url);
    });
  }

  useEffect(() => {
    console.log("reached");
    if (!webContainer) return;
    console.log("here");
    main();
  }, []);
  return (
    <div className="h-full flex items-center justify-center text-gray-400">
      {!url && (
        <div className="text-center">
          <p className="mb-2">Loading...</p>
        </div>
      )}
      {url && <iframe width={"100%"} height={"100%"} src={url} />}
    </div>
  );
}
