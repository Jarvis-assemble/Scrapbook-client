import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddMemory({ onAddMemory }) {
  const [isUploading, setIsUploading] = useState(false);

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

    setIsUploading(true); // Start upload
    toast.info("Molding memory...");

    onAddMemory(formData)
      .then(() => {
        toast.dismiss(); // Remove loading toast
        toast.success("Memory etched ! 🎉 ");
        setMemory({ title: "", picture: null, message: "", date: "" });
      })
      .catch(() => {
        toast.dismiss();
        toast.error("Failed to upload memory. Please try again!");
      })
      .finally(() => {
        setIsUploading(false);
        window.location.reload();
      });
    // setMemory({ title: "", picture: null, message: "", date: "" });
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
          <button type="submit" disabled={isUploading}>
            {isUploading ? "Remembering..." : "Remember✨"}
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
      {isUploading && <ToastContainer position="top-right" autoClose={false} />}
    </div>
  );
}

export default AddMemory;
