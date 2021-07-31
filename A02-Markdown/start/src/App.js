import React, { useState } from "react";
import "./App.css";
import ReactMarkdown from "react-markdown";

export default function App() {
  // RENDER STATE
  const [markdown, setMarkdown] = useState("# sup");

  // FUNCTIONS
  function onChange(e) {
    return setMarkdown(e.target.value);
  }

  return (
    <div className="app">
      <textarea onChange={onChange} value={markdown} />

      <ReactMarkdown className="preview" children={markdown} />
    </div>
  );
}
