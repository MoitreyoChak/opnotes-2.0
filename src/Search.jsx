import React, { useState, useEffect } from "react";
import "./Search.css";
export default function Search({ notes, setMatch }) {
  const [searchText, setSearchText] = useState();
  useEffect(() => {
    const l = searchText?.length;

    const timer = setTimeout(() => {
      const found = notes.filter(
        (note) => note.heading?.trim().substring(0, l) === searchText?.trim()
      );
      if (found[0]) {
        setMatch(found);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchText]);

  return (
    <div className="upper-container">
      <h3 className="a">OPNOTES 2.0</h3>
      <input
        type="text"
        placeholder="SEARCH"
        className="search-input"
        name="searchText"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
}
