import React, { useState } from "react";

function createNote(i) {
  return (
    <Note
      key={i.id}
      title={i.title}
    />
  );
}


function Note(props) {
  
  const [Entry, setEntry] = useState("");
  const [Items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);

  function handleChange(event) {
    const newVal = event.target.value;
    setEntry(newVal);
    setError(""); // Clear error message when user types
  }

  function onSave() {
    if (Entry.trim() === "") {
      setError("Item cannot be empty");
      return;
    }
    setItems((prev) => {
      setCount(n => n + 1);
      return [...prev, Entry];
    });
    setEntry("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>{props.title}</h1>
        <h1>{count}</h1>
      </div>
      <div className="form">
        <input type="text" onChange={handleChange} value={Entry} />
        <button onClick={onSave}> 
          <span>Add</span>
        </button>
      
        {error && <p style={{ color: "#c0392b" }}>{error}</p>}
      </div>
      <div>
        <ul>
         {Items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Note;
export {createNote};