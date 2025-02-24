import React from "react";
import ReactDOM from "react-dom";
import Note, { createNote } from "./Note";
import list from "../list.js";
import Intro from "./Intro.jsx";
import Admin from "./Admin.jsx";

function App() {
    console.log("React")
  return (
    <>
      <Intro />
      <Admin />
      <div className="board">{list.map(createNote)}</div>
    </>
  );
}

export default App;
