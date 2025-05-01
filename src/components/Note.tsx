import { ChangeEvent, useState } from "react"
import { NoteItem } from "../interfaces"
import notes from "../notes";
import DeleteIcon from '@mui/icons-material/Delete';
import "../styles/styles.scss"


export const Note = (props: NoteItem) => {

    // const [isMouseOver, setMouseOver] = useState(false);
    
    // const HandleMouseOver = () => {
    //     setMouseOver(true);
    // }
    // const HandleMouseLeave = () => {
    //     setMouseOver(false);
    // }
    // const HandleChange = (event: ChangeEvent<HTMLInputElement>) => {

    //     const { name, value } = event.target;

    //     props.setNoteValue?.(prevValue => {
    //         console.log("Previousvalue: " + prevValue);
    //         if (name == "title") {
    //             return {
    //                 title: value,
    //                 content: prevValue.content
    //             }
    //         }
    //         else if(name =="content")
    //         {
    //             return {
    //                 content: value,
    //                 title: prevValue.title
    //             }
    //         }
    //         else{
    //             return{
    //                 content: prevValue.content,
    //                 title: prevValue.title
    //             }
    //         }
    //     })
    // }

    const handleClick = () =>{
        props.onDelete?.(props.id);
    }

    return (
        <div className="note">
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <button className="delete" onClick={handleClick}><DeleteIcon/></button>
        </div>
      );
    } 