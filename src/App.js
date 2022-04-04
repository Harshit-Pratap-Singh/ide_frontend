import "./App.css";
import { useState } from "react";
// import "ace-builds/src-noconflict/mode";
import axios from "axios";
import Editor from "./components/Editor";
import "ace-builds/webpack-resolver";
import Output from "./components/Output";
import Input from "./components/Input";

function App() {
  const [code, setCode] = useState();
  const [output, setOutput] = useState();
  const [input, setInput] = useState();
  const [language, setLanguage] = useState();
  const [textMode, setTextMode] = useState("c_cpp");

  const handleSubmit = async () => {
    if (code === undefined) return alert("Empty code\n");
    const data = {
      language,
      code,
      input,
    };
    console.log("Input-->", input);
    try {
      const output = await axios.post(
        "https://ide-backend-hps.herokuapp.com/run",
        data
      );
      console.log(output.data.output);
      setOutput(output.data.output);
    } catch (err) {
      setOutput(err?.response?.data?.stderr);
      console.log(err?.response?.data?.stderr);
    }
  };

  const handleSelect = (e) => {
    setLanguage(e.target.value);
    // console.log(e.target.value);
    // console.log("cpp");
    if (e.target.value === "cpp") setTextMode("c_cpp");
    if (e.target.value === "py") setTextMode("python");
    if (e.target.value === "java") {
      setTextMode("java");
      alert("Write the class name as Main!!!");
    }
    // console.log(textMode);
  };

  return (
    <div className="App">
      <h1>Online IDE</h1>
      <div className="container">
        <Editor code={code} setCode={setCode} textMode={textMode} />
        <div className="io_container">
          <Output outputValue={output} setOutputValue={setOutput} />
          <Input setInputValue={setInput} />
        </div>
      </div>
      <div className="button_container">
        <button onClick={handleSubmit}>Submit</button>
        <select onChange={handleSelect} defaultValue="cpp">
          <option value="cpp">C++</option>
          <option value="py">Python3</option>
          <option value="java">JAVA</option>
        </select>
      </div>
    </div>
  );
}

export default App;
