import React from "react";
import AceEditor from "react-ace";

function Output({ outputValue, setOutputValue }) {
  return (
    <div className="output_container">
      <h3>Output</h3>
      <AceEditor
        mode="text"
        theme="monokai"
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        height="31vh"
        width="40vw"
        fontSize={16}
        value={outputValue}
        onChange={(e) => setOutputValue(e)}
        wrapEnabled={true}
      />
    </div>
  );
}

export default Output;
