import {NoteItem} from "../interfaces"

export const Note =(props :NoteItem)=>{
    return(<div className="note"><h1>{props.title}</h1><p>{props.content}</p></div>)
}