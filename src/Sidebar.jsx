import React from "react";
import "./Sidebar.css";
export default function Sidebar({ notes, setStar }) {
  const handleClick = (e) => {
    const heading = e.target
      .closest(".notes")
      .querySelector(".note-heading-text").textContent;
    const tar = notes.find((note) => note.heading === heading);
    const obj = {
      ...tar,
      star: !tar.star,
    };
    let arr = [];
    if (!tar.star) {
      arr = notes.filter((note) => note.heading !== heading);
      arr.unshift(obj);
    } else {
      arr.push(obj);
      notes.map((note) => {
        if (note.heading !== heading) {
          if (note.star) {
            arr.unshift(note);
          } else {
            arr.push(note);
          }
        }
      });
    }
    // const arr = notes.filter((note) => note.heading !== heading);
    // arr.unshift(obj);

    localStorage.setItem("allNotes", JSON.stringify(arr));
    setStar((prev) => !prev);
  };

  const allNotes = notes.map((note) => (
    <div className="notes">
      <div className="note-heading-text">{note.heading}</div>
      <span
        className={
          note.star ? "material-symbols-rounded" : "material-symbols-outlined"
        }
        onClick={(e) => handleClick(e)}
      >
        star
      </span>
    </div>
  ));
  return (
    <div className="sidebar-container">
      <div className="note-text">NOTES</div>
      {allNotes}
    </div>
  );
}
