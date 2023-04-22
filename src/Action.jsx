import React from "react";
import "./Action.css";
export default function Action({ setCurrentNoteId, setPopup }) {
  function idGeneration() {
    let generateId = new Date().getTime();
    generateId += "";
    return generateId;
  }

  function handleClickAdd() {
    setCurrentNoteId(idGeneration());
    setPopup(1);
  }

  const handleDelete = () => {
    localStorage.removeItem("allNotes");
    window.location.reload();
  };

  return (
    <div className="action-container">
      <div className="action" onClick={handleClickAdd}>
        Add Note
      </div>
      <div className="action action-delete" onClick={handleDelete}>
        Delete All
      </div>
    </div>
  );
}
