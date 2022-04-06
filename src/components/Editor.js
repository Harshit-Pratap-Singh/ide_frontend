/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import { cppTemplate, javaTemplate, pythonTemplate } from "./CodeTemplate";

function Editor({ setCode, code, textMode }) {
  const [autoComplete, setAutoComplete] = useState(false);
  const [cpp, setCpp] = useState(cppTemplate);
  const [python, setPython] = useState(pythonTemplate);
  const [java, setJava] = useState(javaTemplate);

  useEffect(() => setCode(cppTemplate), []);

  useEffect(() => {
    if (textMode === "python" || textMode === "java") setAutoComplete(true);
    else setAutoComplete(false);

    if (textMode === "c_cpp") setCode(cpp);
    if (textMode === "python") setCode(python);
    if (textMode === "java") setCode(java);
  }, [textMode]);

  const handleChange = (v) => {
    if (textMode === "c_cpp") setCpp(v);
    if (textMode === "python") setPython(v);
    if (textMode === "java") setJava(v);
    setCode(v);

    // console.log(textMode);
  };

  return (
    <div className="editor">
      <h3>Code</h3>
      <AceEditor
        mode={textMode}
        theme="monokai"
        onChange={handleChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        height="70vh"
        width="60vw"
        fontSize={16}
        highlightActiveLine={true}
        enableLiveAutocompletion={autoComplete}
        value={code}
      />
    </div>
  );
}

export default Editor;
