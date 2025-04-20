import {useState} from "react";
import "../styles/styles.scss"
import HighlightIcon from '@mui/icons-material/Highlight';

export const Header =()=>{

    // const [time,setTime] = useState(new Date().toLocaleString());
    // setInterval(()=>setTime(new Date().toLocaleString()));

    return(
        <div className="header">
            
            <h1 ><HighlightIcon/>Keeper  </h1>   
            {/* <p className="headerTime">{time}</p>         */}
        </div>
        
    )
}
