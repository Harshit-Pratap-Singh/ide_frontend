import "./IdeMain.css";
import React, { useState } from "react";
// import "ace-builds/src-noconflict/mode";
import axios from "axios";
import Editor from "./Editor";
// import "ace-builds/webpack-resolver";
import Output from "./Output";
import Input from "./Input";
import arrow from "./assets/next.png";
import $ from "jquery";

function IdeMain() {
  const [code, setCode] = useState();
  const [output, setOutput] = useState();
  const [input, setInput] = useState();
  const [language, setLanguage] = useState();
  const [textMode, setTextMode] = useState("c_cpp");
  const [toggle, setToggle] = useState(false);
  const [activeDrop, setActiveDrop] = useState("C++");
  const dict = {
    "C++": "cpp",
    PYTHON: "py",
    JAVA: "java",
  };
  const handleSubmit = async (e) => {
    if (code === undefined) return alert("Empty code\n");
    // console.log($(".submit_btn"));

    if (e.type === "click" || (e.key === `'` && e.metaKey)) {
      $(".submit_btn").html("Running");
      $(".submit_btn").prop("disabled", true);

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
      $(".submit_btn").prop("disabled", false);
      $(".submit_btn").html("Run");
    }
  };

  // const handleSelect = (e) => {
  //   setLanguage(e.target.value);
  //   // console.log(e.target.value);
  //   // console.log("cpp");
  //   if (e.target.value === "cpp") setTextMode("c_cpp");
  //   if (e.target.value === "py") setTextMode("python");
  //   if (e.target.value === "java") {
  //     setTextMode("java");
  //     //alert("Write the class name as Main!!!");
  //   }
  //   // console.log(textMode);
  // };

  const handleoptions = (e) => {
    console.log(e.target.innerHTML);
    setActiveDrop(e.target.innerHTML);
    setLanguage(dict[e.target.innerHTML]);
    // console.log(e.target.innerHTML);
    // console.log("cpp");
    if (e.target.innerHTML === "C++") setTextMode("c_cpp");
    if (e.target.innerHTML === "PYTHON") setTextMode("python");
    if (e.target.innerHTML === "JAVA") setTextMode("java");
    //alert("Write the class name as Main!!!");
  };

  return (
    <div className="App" onKeyDownCapture={handleSubmit}>
      <div className="navbar">
        <div className="button_container">
          <button className="submit_btn" onClick={handleSubmit}>
            Run
          </button>
          {/* <select
            className="select_btn"
            onChange={handleSelect}
            defaultValue="cpp"
          >
            <option value="cpp">C++</option>
            <option value="py">Python3</option>
            <option value="java">JAVA</option>
          </select> */}

          <div
            tabIndex="1"
            className="dropdownMenu"
            onClick={() => setToggle(!toggle)}
            onBlur={() => setToggle(false)}
          >
            <span>{activeDrop}</span>
            <img
              className={`arrow ${toggle && "upArrow"}`}
              src={arrow}
              alt=""
            />
            <div className={`dropOptions ${!toggle && "hide"}`}>
              <p onClick={handleoptions}>C++</p>
              <p onClick={handleoptions}>PYTHON</p>
              <p onClick={handleoptions}>JAVA</p>
            </div>
          </div>
        </div>
        <div className="heading">
          <span>IDE</span>
        </div>
      </div>

      <div className="container">
        <Editor code={code} setCode={setCode} textMode={textMode} />
        <div className="io_container">
          <Output outputValue={output} setOutputValue={setOutput} />
          <Input setInputValue={setInput} />
        </div>
      </div>
    </div>
  );
}

export default IdeMain;
