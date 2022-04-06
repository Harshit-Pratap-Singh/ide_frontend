import React from "react";
import AceEditor from "react-ace";

import "./Output.css";

function Output({ outputValue, setOutputValue }) {
  return (
    <div className="output_container">
      <p className="inputHeading">Output</p>
      <AceEditor
        mode="text"
        theme="monokai"
        name="output"
        editorProps={{ $blockScrolling: true }}
        fontSize={16}
        value={outputValue}
        onChange={(e) => setOutputValue(e)}
        wrapEnabled={true}
      />
    </div>
  );
}

export default Output;
