import React, { ChangeEvent, FormEvent, useState } from "react";
import "../styles/styles.scss"
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';


interface CreateAreaProps {
    onAdd: (noteItem: { title: string, content: string }) => void
}

export const CreateArea = (props: CreateAreaProps) => {

    const [noteValue, setNoteValue] = useState(
        {
            title: "",
            content: ""
        });
    const [isExpanded, setExpanded] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNoteValue(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    const handleAddClick = (event: FormEvent<HTMLButtonElement>) => {
        props.onAdd(noteValue);
        console.log("Inside createArea hadleaddclick .tsx addNote" + noteValue);
        setNoteValue({ title: "", content: "" });
        event.preventDefault();
    }

    const handleContentClick = () => {
        setExpanded(true);
    }

    return (
        <div className="createNote">
            <h2 className="text-xl">🖊 ScribblePad</h2>
            <form>                
                {isExpanded && <input name="title" onChange={handleChange} value={noteValue.title} placeholder="Title" />}
                <textarea name="content" rows={isExpanded ? 3 : 1} onClick={handleContentClick} onChange={handleChange} value={noteValue.content} placeholder="Take a note"></textarea>
                <Zoom in={isExpanded}><Fab className="button" onClick={handleAddClick}> <AddIcon /></Fab></Zoom>
            </form>
        </div>
    )
}