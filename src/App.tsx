import { useState } from 'react'
import './App.css'
import "./styles/styles.scss"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { Note } from "./components/Note"
import notes from "./notes"
import { NoteItem }from "./interfaces"
import { AddNote } from "./components/AddNote"


function App() {

  // const [showNewNote, setShowNewNote] = useState(true); 
 
  const [noteValue, setNoteValue] = useState(
    {
      title: "",
      content:""
    });

    const UpdateNotes = () =>{ 
      {notes.push({key: notes.count+1, title: noteValue.title, content: noteValue.content})}
      console.log(notes);
      setNoteValue({title:"", content: ""});
    }
  return (<div>
    <Header />
    {notes.map((noteItem: NoteItem) => (
      <Note
        key={noteItem.key}
        title={noteItem.title}
        content={noteItem.content}
      />
    ))}

    { <Note
        key={notes.count+1}
        title= {noteValue.title}
        content = {noteValue.content}
        setNoteValue = {setNoteValue}
    />}   
    <button onClick = {UpdateNotes}>Add Note</button>
    <Footer/>
  </div>)
}

export default App;