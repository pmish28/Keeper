import React, { useState } from "react";

export const CreateArea =()=>{

    const [noteValue, setNoteValue] = useState(
        {
          title: "",
          content:""
        });
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    
            const { name, value } = event.target;
    
            props.setNoteValue?.(prevValue => {
                
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
    

    return(
        <div>
            <form>
                <input name="title" onChange= {handleChange} value = {noteValue.title} placeholder="title"/>
                <textarea name="content" onChange= {handleChange} value = {noteValue.content} placeholder="content"></textarea>
                <button> Add</button>
            </form>
        </div>
    )

}