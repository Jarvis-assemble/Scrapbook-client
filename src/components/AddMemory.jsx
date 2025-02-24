import React, { useState } from "react";

function AddMemory({ onAddMemory }) {
  const [memory, setMemory] = useState({
    title: "",
    picture: null,
    message: "",
    date: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setMemory((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    setMemory((prev) => ({
      ...prev,
      picture: file,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", memory.title);
    formData.append("message", memory.message);
    formData.append("date", memory.date);
    if (memory.picture) {
      formData.append("picture", memory.picture); // Append image file
    }

    onAddMemory(formData);
    setMemory({ heading: "", picture: null, message: "", date: "" });
    window.location.reload();
  }

  return (
    <div className="memories-container">
      <h2>Cheers to a new memory!🔮</h2>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Memory Title"
            value={memory.title}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <input
            type="text"
            name="message"
            placeholder="Write a message"
            value={memory.message}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={memory.date}
            onChange={handleChange}
            required
          />
          <hr />
          <button type="submit">
            <span>Remember✨</span>
          </button>
        </form>
      </div>

      {memory.picture && (
        <div className="preview">
          <img
            src={URL.createObjectURL(memory.picture)}
            alt="Preview"
            className="memory-img"
          />
        </div>
      )}
    </div>
  );
}

export default AddMemory;
