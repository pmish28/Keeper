import React, { MouseEventHandler } from "react"
import { Note } from "./Note"

export const AddNote = (props)=>{
    
    const HandleClick = () => {
        
    }

    return(
        <div>
            <button onClick={HandleClick}>Add Note</button>
        </div>        
    )
}