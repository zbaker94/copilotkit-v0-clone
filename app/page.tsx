"use client";
import { useCallback, useState } from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import PreviewScreen from "@/components/preview-screen";
import { Input } from "@/components/ui/input";
import {
  CopilotTask,

  useCopilotContext,
  useMakeCopilotReadable,
} from "@copilotkit/react-core";



export default function Home() {
  const [code, setCode] = useState<string[]>([
    `import * as React from 'react';
    import Button from '@mui/material/Button';
    
    export default function ButtonUsage() {
      return <Button variant="contained">Hello world</Button>;
    }`,
  ]);

  const [codeToDisplay, setCodeToDisplay] = useState<string>(code[0] || "");
  const [codeCommand, setCodeCommand] = useState<string>("");

  const readableCode = useMakeCopilotReadable(codeToDisplay);

  console.log({codeToDisplay, readableCode, apiKey: process.env.OPENAI_API_KEY})

  const generateCode = new CopilotTask({
    instructions: "please give me the full react component code for the following: " + codeCommand + " using react and Material UI v5. The code should have all placeholder data declared in the same file and not import from any local files.",
    actions: [
      {
        name: "generateCode",
        description: "Create Full Component with React.js and MUIv5.",
        parameters: [
          {
            name: "code",
            type: "string",
            description: "Code to be generated",
            required: true,
          },
        ],
        handler: async ({ code }) => {
          setCode((prev) => [...prev, code]);
          setCodeToDisplay(code);
        },
      },
    ],
  });

  

 

  const context = useCopilotContext();


  return (
    <>
      <main className="bg-white min-h-screen px-4">
        <Header />
        <div className="w-full h-full min-h-[70vh] flex justify-between gap-x-1 ">
          <Sidebar>
            <div className="space-y-2">
              {code.map((c, i) => (
                <div
                  key={i}
                  className="w-full h-20 p-1 rounded-md bg-white border border-blue-600"
                  onClick={() => setCodeToDisplay(c)}
                >
                  v{i}
                </div>
              ))}
            </div>
          </Sidebar>
          <div className="w-10/12 flex my-4 mx-auto">
            <PreviewScreen html_code={ codeToDisplay || ""} command={codeCommand} />
          
            </div>
        </div>
        <div className="w-8/12 mx-auto p-1 rounded-full bg-primary flex my-4 outline-0">
          <Input
            type="text"
            placeholder="Enter your code command"
            className="w-10/12 p-6 rounded-l-full  outline-0 bg-primary text-white"
            value={codeCommand}
            onChange={(e) => setCodeCommand(e.target.value)}
          />
          <button
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                generateCode.run(context);
              }
            }}
            className="w-2/12 bg-white text-primary rounded-r-full"
            onClick={() => generateCode.run(context)}
          >
            Generate
          </button>
        </div>
      </main>
    </>
  );
}
