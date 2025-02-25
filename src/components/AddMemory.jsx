import React, { useState, useRef } from "react";

function AddMemory({ handleAddMemory }) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const [myMemory, setMyMemory] = useState({
    title: "",
    picture: null,
    message: "",
    date: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setMyMemory((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    setMyMemory((prev) => ({
      ...prev,
      picture: file,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", myMemory.title);
    formData.append("message", myMemory.message);
    formData.append("date", myMemory.date);
    if (myMemory.picture) {
      formData.append("picture", myMemory.picture); // Append image file
    }

    setIsUploading(true); // Start upload

    setMyMemory({ title: "", picture: null, message: "", date: "" });
    fileInputRef.current.value = "";
    handleAddMemory(formData);
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
            value={myMemory.title}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <input
            type="text"
            name="message"
            placeholder="Write a message"
            value={myMemory.message}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={myMemory.date}
            onChange={handleChange}
            required
          />
          <hr />
          <button type="submit" disabled={isUploading}>
            {isUploading ? "Remembering..." : "Remember✨"}
          </button>
        </form>
      </div>

      {myMemory.picture && (
        <div className="preview">
          <img
            src={URL.createObjectURL(myMemory.picture)}
            alt="Preview"
            className="memory-img"
          />
        </div>
      )}
    </div>
  );
}

export default AddMemory;
