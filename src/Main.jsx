import React from "react";
import "./Main.css";

export default function Main({
  notes,
  setCurrentNoteId,
  setPopup,
  setText,
  setHeadingText,
}) {
  function handleContentClick(e) {
    const temp = e.target
      .closest(".note")
      .querySelector(".note-content").textContent;
    const temp1 = e.target
      .closest(".note")
      .querySelector(".note-heading").textContent;

    setHeadingText(temp1);
    setText(temp);
    setCurrentNoteId(e.target.closest(".note").id);
    setPopup(1);
  }

  const handleClickDelete = (e) => {
    const currId = e.target.closest(".note").id;
    const temp = notes.filter((el) => el.id !== currId);
    localStorage.setItem("allNotes", JSON.stringify(temp));
    window.location.reload();
  };

  const allNotes = notes.map((note) => (
    <div className="note" id={note.id}>
      <div className="note-upper">
        <div className="note-heading" onClick={handleContentClick}>
          {note.heading}
        </div>
        <span
          className="material-symbols-sharp"
          onClick={(e) => handleClickDelete(e)}
        >
          delete
        </span>
      </div>

      <div className="note-content" onClick={handleContentClick}>
        {note.content}
      </div>
    </div>
  ));

  return (
    <div>
      <div className="note-container">
        <div className="recent">RECENTS</div>
        {allNotes}
      </div>
    </div>
  );
}
