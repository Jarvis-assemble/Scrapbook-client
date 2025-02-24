import React, { useState, useEffect } from "react";
import "./../styles.css";

function Admin() {
  const [fullName, setFullName] = useState({
    fName: "John",
    lName: "Doe",
  });

  const [visible, setVisible] = useState(true);
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowName(true), 300); // Delay for effect
  }, []);

  function handleUpdate(event) {
    const { value, name } = event.target;
    setFullName((prev) => ({ ...prev, [name]: value }));
  }

  function handleVanish(event) {
    event.preventDefault();
    setVisible(false);
  }

  return (
    <div className="header">
      <h1 className={`fade-in ${showName ? "visible" : "hidden"}`}>
        {fullName.fName} {fullName.lName} {!visible && "!"}
      </h1>
    </div>
  );
}

export default Admin;
