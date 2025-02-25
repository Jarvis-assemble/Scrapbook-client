import React from "react";
import ReactDOM from "react-dom";
import Note, { createNote } from "./Note";
import list from "../list.js";
import Intro from "./Intro.jsx";
import Admin from "./Admin.jsx";
import { useEffect, useState } from "react";

function App() {
  console.log("React");

  const [memoryPages, setMemoryPages] = useState([]);

  // Fetch existing memories when component mounts
  useEffect(() => {
    fetch("https://scrapbook-server.vercel.app/memories/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Memories:", data); // Debug log
        setMemoryPages(data);
      })
      .catch((err) => console.error("Error fetching data", err));
  }, []);

  // Function to add a new memory
  async function handleAddMemory(newMemory) {
    try {
      const res = await fetch("https://scrapbook-server.vercel.app/memories/", {
        method: "POST",
        body: newMemory, // FormData
      });

      if (!res.ok) {
        throw new Error("Failed to save memory");
      }

      const data = await res.json();
      console.log("Post Result:", data);

      setMemoryPages((prev) => {
        if (prev.length < 2) {
          return [...prev, data]; // Append if less than 2 items
        }
        return [...prev.slice(0, -1), data, prev[prev.length - 1]];
      });

      return data; // Return the response so handleSubmit can await it
    } catch (err) {
      console.error("Error saving memory", err);
      throw err; // Ensures rejection if there’s an error
    }
  }

  return (
    <>
      <Intro />
      <Admin />
      <div className="board">
        {list.map((item) => createNote(item, memoryPages, handleAddMemory))}
      </div>
    </>
  );
}

export default App;
