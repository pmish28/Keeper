import {useState} from "react";
import "../styles/styles.scss"

export const Header =()=>{

    // const [time,setTime] = useState(new Date().toLocaleTimeString());
    // setInterval(()=>setTime(new Date().toLocaleTimeString()));


    const [time,setTime] = useState(new Date().toLocaleString());
    setInterval(()=>setTime(new Date().toLocaleString()));

    return(
        <div>
            <h1 className="header">Keeper  {time}</h1>
            {/* <h2 className="header h2"> </h2> */}
        </div>
    )
}
