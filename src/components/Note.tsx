import { ChangeEvent, useState } from "react"
import { NoteItem } from "../interfaces"

export const Note = (props: NoteItem) => {

    const [isMouseOver, setMouseOver] = useState(false);
    
    const HandleMouseOver = () => {
        setMouseOver(true);
    }
    const HandleMouseLeave = () => {
        setMouseOver(false);
    }
    const HandleChange = (event: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target;

        props.setNoteValue?.(prevValue => {
            console.log("Previousvalue: " + prevValue);
            if (name == "title") {
                return {
                    title: value,
                    content: prevValue.content
                }
            }
            else if(name =="content")
            {
                return {
                    content: value,
                    title: prevValue.title
                }
            }
            else{
                return{
                    content: prevValue.content,
                    title: prevValue.title
                }
            }
        })
    }

    return (<div
        onMouseOver={HandleMouseOver}
        onMouseLeave={HandleMouseLeave}
        className={isMouseOver ? "noteHighlight" : "note"}>
        <input onChange={HandleChange} name="title" value={props.title}></input>
        <input onChange={HandleChange} name="content" value={props.content}></input>
    </div>)
}