import React, { useState, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import Note from "./components/note";

const notesReducer = (state: any, action: any) => {
  switch (action.type) {
    case "POPULATE_NOTES":
      return action.notes;
    case "ADD_NOTE":
      return [...state, { title: action.title, body: action.body }];
    case "REMOVE_NOTE":
      return state.filter((note: any) => note.title !== action.title);
    default:
      return state;
  }
};

export interface Notes {
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
    dispatch({
      type: "ADD_NOTE",
      title,
      bodyContent,
    });
    setTitle("");
    setBodyContent("");
  };

  const removeNote = (title: string) => {
    dispatch({ type: "REMOVE_NOTE", title });
  };

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes") || "");

    if (notes) {
      dispatch({ type: "ADD_NOTE", notes: notes });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

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

ReactDOM.render(<NoteApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
