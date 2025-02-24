import React, { useState, useEffect } from "react";
import Scrapbook from "./Scrapbook";
import AddMemory from "./AddMemory";

function createNote(i) {
  return <Note key={i.id} title={i.title} />;
}

function Note({ title }) {
  console.log("Rendering Note with title:", title); // Debugging
  const [memoryPages, setMemoryPages] = useState([]);

  // Fetch existing memories when component mounts
  useEffect(() => {
    fetch("http://localhost:5000/memories")
      .then((res) => res.json())
      .then((data) => setMemoryPages(data))
      .catch((err) => console.error("Error fetching data", err));
  }, []);

  // Function to add a new memory
  function handleAddMemory(newMemory) {
    fetch("http://localhost:5000/memories", {
      method: "POST",
      body: newMemory, // This should be FormData (updated in AddMemory.js)
    })
      .then((res) => res.json())
      .then((data) => {
        setMemoryPages((prev) => [...prev, data]); // Update immediately
      })
      .catch((err) => console.error("Error saving memory", err));
  }

  return (
    <div
      className={`container ${
        title.toLowerCase() === "scrapbook"
          ? "scrapbook-container"
          : "add-memory-container"
      }`}
    >
      <h1>{title}</h1>
      {title.toLowerCase() === "scrapbook" ? (
        <Scrapbook pages={memoryPages} />
      ) : title.toLowerCase() === "adding-memories" ? (
        <AddMemory onAddMemory={handleAddMemory} />
      ) : null}
    </div>
  );
}

export default Note;
export { createNote };
