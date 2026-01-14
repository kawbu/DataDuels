"use client";

import dynamic from "next/dynamic";
import * as React from "react";

// Dynamically import MonacoEditor to avoid SSR issues
const MonacoEditor = dynamic(() => import("react-monaco-editor"), { ssr: false });

export default function CodeEditorSample({ width = "100%" }: { width?: string | number }) {
  const [code, setCode] = React.useState("// Write your code here\nfunction hello() {\n  console.log('Hello, world!');\n}\n");

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ height: 500, width }}
    >
      <MonacoEditor
        width="100%"
        height="500"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={{
          selectOnLineNumbers: true,
          fontSize: 16,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
        onChange={setCode}
        editorDidMount={(editor) => {
          editor.focus();
        }}
      />
    </div>
  );
}
