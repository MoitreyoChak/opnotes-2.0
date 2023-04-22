import React from "react";
import "./styles.css";
import Main from "./Main";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Action from "./Action";
import Overlay from "./Overlay";

export default function App() {
  let p = {
    id: "2020",
    content: "sample content",
    heading: "heading",
    star: false,
  };
  let q = [];
  q.push(p);
  if (localStorage.getItem("allNotes") === null) {
    localStorage.setItem("allNotes", JSON.stringify(q));
  }

  const [notes, setNotes] = React.useState([]);
  const [finalArray, setFinalArray] = React.useState([]);
  const [popup, setPopup] = React.useState(0);
  const [currentNoteId, setCurrentNoteId] = React.useState("");
  const [text, setText] = React.useState("");
  const [headingText, setHeadingText] = React.useState("");
  const [changed, setChanged] = React.useState(false);
  const [match, setMatch] = React.useState();
  const [star, setStar] = React.useState(false);

  function removeOverlay(e) {
    if (
      !e.target.classList.contains("note-input-overlay") &&
      !e.target.classList.contains("note-heading-overlay") &&
      popup === 1
    ) {
      if (changed === true) {
        setChanged(false);
        localStorage.setItem("allNotes", JSON.stringify(finalArray));
      }
      setHeadingText();
      setText();
      setPopup(0);
    }
  }

  React.useEffect(() => {
    setNotes(JSON.parse(localStorage.getItem("allNotes")));
  }, [popup, star]);

  return (
    <div className="App" onClick={removeOverlay}>
      <Search notes={notes} setMatch={setMatch} />
      <div className="main-section">
        <Sidebar notes={notes} setStar={setStar} />
        <Main
          notes={match || notes}
          setCurrentNoteId={setCurrentNoteId}
          setPopup={setPopup}
          setText={setText}
          setHeadingText={setHeadingText}
        />
        <Action setCurrentNoteId={setCurrentNoteId} setPopup={setPopup} />
      </div>
      <Overlay
        notes={notes}
        currentNoteId={currentNoteId}
        popup={popup}
        text={text}
        setFinalArray={setFinalArray}
        setChanged={setChanged}
        headingText={headingText}
        setMatch={setMatch}
      />
    </div>
  );
}
