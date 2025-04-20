import { useState } from 'react'
import './App.css'
import "./styles/styles.scss"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { Note } from "./components/Note"
import { NoteItem } from "./interfaces"
import { CreateArea } from './components/CreateArea'


function App() {

  const [notes, setNotes] = useState<NoteItem[]>([]);

  const addNote = (newNote: {title:string, content: string}) => {
    setNotes(prevNotes => [
       ...prevNotes,
       {
        id: Date.now(),
        title: newNote.title,
        content: newNote.content,
       }
    ]);
    console.log("Inside App.tsx addNote" + notes.length);
  }

  const deleteNote = (id: number) => {
    setNotes(prevNote => {
      return prevNote.filter((note) => {
        return note.id !== id
      });
    });
  }

  return (<div>
    <Header />
    <CreateArea onAdd={addNote}></CreateArea>
    {notes.map((note) => {
      return (
      <Note
        key={note.id}
        id={note.id}
        title={note.title}
        content={note.content}
        onDelete={deleteNote}
      />)
      })}
    <Footer />
  </div>)
}

export default App;