import { useState } from "react"
import {NoteItem} from "../interfaces"

export const Note =(props :NoteItem)=>{

    const [isMouseOver, setMouseOver] = useState(false);
    const HandleMouseOver =()=>{
        setMouseOver(true);
    }
    const HandleMouseLeave =()=>{
        setMouseOver(false);
    }
    return(<div onMouseOver={HandleMouseOver} onMouseLeave={HandleMouseLeave} className={isMouseOver? "noteHighlight" : "note"}><h1>{props.title}</h1><p>{props.content}</p></div>)
}