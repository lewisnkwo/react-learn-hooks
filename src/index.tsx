import React, { useState, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

const notesReducer = (state: any, action: any) => {
  switch (action.type) {
    case "POPULATE_NOTES":
      return action.notes;
    default:
      return state;
  }
};

interface Notes {
  title: string;
  bodyContent: string;
}

const NoteApp = () => {
  // const [notes, setNotes] = useState<Notes[]>([]);
  const [notes, dispatch] = useReducer(notesReducer, []);
  const [title, setTitle] = useState<string>("");
  const [bodyContent, setBodyContent] = useState("");

  const addNote = (e: any) => {
    e.preventDefault();
    // setNotes([...notes, { title, bodyContent }]);
    setTitle("");
    setBodyContent("");
  };

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes") || "");

    if (notes) {
      dispatch({ type: "POPULATE_NOTES", notes: notes });
      // setNotes(notesData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const removeNote = (_title: string) => {
    // setNotes(notes.filter((note) => note.title !== title));
  };

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note: any) => (
        <Note key={note.title} note={note} removeNote={removeNote} />
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

interface Note {
  note: Notes;
  removeNote: (note: string) => void;
}

const Note = ({ note, removeNote }: Note) => {
  useEffect(() => {
    console.log("Setting up effect");

    return () => {
      console.log("cleaning up effect");
    };
  }, []);

  return (
    <>
      <h3>{note.title}</h3>
      <h3>{note.bodyContent}</h3>
      <button onClick={() => removeNote(note.title)}>x</button>
    </>
  );
};

ReactDOM.render(<NoteApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
