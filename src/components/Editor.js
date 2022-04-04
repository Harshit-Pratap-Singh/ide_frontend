import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";

function Editor({ setCode, code, textMode }) {
  const [autoComplete, setAutoComplete] = useState(false);

  useEffect(() => {
    if (textMode === "python" || textMode === "java") setAutoComplete(true);
    else setAutoComplete(false);
  }, [textMode]);

  const handleChange = (e) => {
    setCode(e);
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
      />
    </div>
  );
}

export default Editor;
