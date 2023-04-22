import React, { useEffect } from "react";
import "./Overlay.css";
export default function Overlay({
  notes,
  currentNoteId,
  popup,
  text,
  setFinalArray,
  setChanged,
  headingText,
  setMatch,
}) {
  const [textAreaValue, setTextAreaValue] = React.useState();
  const [inputAreaValue, setInputAreaValue] = React.useState();

  let arr = [];
  let arrTemp = [];

  React.useEffect(() => {
    setInputAreaValue(headingText);
    setTextAreaValue(text);
  }, [text, headingText]);

  React.useEffect(() => {
    const obj = {
      id: currentNoteId,
      content: textAreaValue,
      heading: inputAreaValue,
      star: notes.find((note) => note.id == currentNoteId)?.star || false,
    };
    const tar = obj.star;
    if (tar) {
      console.log("hey there");
      const temp = notes.filter((el) => el.id !== currentNoteId);
      temp.unshift(obj);
      arr = temp;
      setFinalArray(arr);
    } else {
      arr.push(obj);
      notes.map((note) => {
        if (note.id != obj.id) {
          if (note.star) {
            arrTemp.unshift(note);
          } else {
            arr.push(note);
          }
        }
      });
      arrTemp.forEach((el) => {
        arr.unshift(el);
      });
      setFinalArray(arr);
    }
    setMatch();
  }, [textAreaValue, inputAreaValue]);

  return (
    <div
      className={popup === 1 ? "popup popup-display" : "popup"}
      id="display-popup"
    >
      {popup === 1 && (
        <div className="popup-content">
          <div className="note-upper-overlay">
            <input
              type="text"
              className="note-heading-overlay"
              placeholder="heading goes here..."
              name="heading"
              value={inputAreaValue}
              onChange={(e) => {
                setChanged(true);
                return setInputAreaValue(e.target.value);
              }}
            />
            {/* <span className="material-symbols-sharp">delete</span> */}
          </div>
          <textarea
            type="text"
            className="note-input-overlay"
            placeholder="Your note goes here..."
            value={textAreaValue}
            name="content"
            onChange={(e) => {
              setChanged(true);
              return setTextAreaValue(e.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
}
