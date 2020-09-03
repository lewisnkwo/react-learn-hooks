import React, { useEffect } from "react";
import { Notes } from "../index";

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

export default Note;
