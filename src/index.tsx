import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

interface Note {
  title: string;
  bodyContent: string;
}

// interface Body<T> {
//   content: T;
// }

const NoteApp = () => {
  const notesData = JSON.parse(localStorage.getItem("notes") || "");
  const [notes, setNotes] = useState<Note[]>(notesData || []);
  const [title, setTitle] = useState("");
  const [bodyContent, setBodyContent] = useState("");

  const addNote = (e: any) => {
    e.preventDefault();
    setNotes([...notes, { title, bodyContent }]);
    setTitle("");
    setBodyContent("");
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  });

  const removeNote = (title: string) => {
    setNotes(notes.filter((note) => note.title !== title));
  };

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => (
        <div key={note.title}>
          <h3>{note.title}</h3>
          <h3>{note.bodyContent}</h3>
          <button onClick={() => removeNote(note.title)}>x</button>
        </div>
      ))}
      <p>Add note</p>
      <form onSubmit={addNote}>
        <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <button>add note</button>
        <textarea
          value={bodyContent}
          onChange={(e) => setBodyContent(e.target.value)}
        ></textarea>
        <button>add body</button>
      </form>
    </div>
  );
};

ReactDOM.render(<NoteApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
