import React, { useState, useEffect } from "react";
import Scrapbook from "./Scrapbook";
import AddMemory from "./AddMemory";

function createNote(note, memoryPages, handleAddMemory) {
  return (
    <Note
      key={note.id}
      title={note.title}
      memoryPages={memoryPages}
      handleAddMemory={handleAddMemory}
    />
  );
}

function Note({ title, memoryPages, handleAddMemory }) {
  console.log("Rendering Note with title:", title); // Debugging

  return (
    <div
      className={`container ${
        title.toLowerCase() === "memories"
          ? "scrapbook-container"
          : "add-memory-container"
      }`}
    >
      <h1>{title.toUpperCase()}</h1>
      {title.toLowerCase() === "memories" ? (
        <Scrapbook pages={memoryPages} />
      ) : title.toLowerCase() === "capture" ? (
        <AddMemory handleAddMemory={handleAddMemory} />
      ) : null}
    </div>
  );
}

export default Note;
export { createNote };
