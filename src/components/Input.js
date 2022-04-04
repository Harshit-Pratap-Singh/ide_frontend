import React from "react";
import AceEditor from "react-ace";

function Input({ setInputValue }) {
  return (
    <div className="input_container">
      <h3>Input</h3>
      <AceEditor
        mode="text"
        theme="monokai"
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        height="31vh"
        width="40vw"
        fontSize={16}
        onChange={(e) => setInputValue(e)}
      />
    </div>
  );
}

export default Input;
