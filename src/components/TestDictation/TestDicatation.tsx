import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, Play, StopCircle } from "lucide-react";
import { Language, Refresh } from '@mui/icons-material';
import "./TestDictation.scss"

const Dictaphone = () => {
  const {
    transcript,
    interimTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const [isRecording, setIsRecording] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [text, setText] = useState('');
  const finalTranscriptRef = useRef('');
  // const [listeningActive,setListeningActive] = useState(false);


  useEffect(()=>{
    finalTranscriptRef.current =transcript;
  },[transcript])

  useEffect(()=>{
    SpeechRecognition.onend = () =>{
      const final = finalTranscriptRef.current;
      if(final)
      {
        setText(prev =>(prev? prev+' ':''))
        resetTranscript();
        finalTranscriptRef.current ='';
      }

      if(isRecording){
        SpeechRecognition.startListening({continuous:true,language:'en-US'});
      }
    }
  },[isRecording, resetTranscript])


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const handleStopRecording = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);
    // setListeningActive(false);
  }
  const handleStartRecording = () => {
    SpeechRecognition.startListening({ continuous: true,language:'en-US' });
    setIsRecording(true);
    // setListeningActive(true);
  }
  const handleCopyClick = () => {
    navigator.clipboard.writeText(transcript)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(() => alert("Failed to copy."));
  } 

  const handleTranscriptChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // console.log("lastTranscript inside handleTranscriptChange:" + lastTranscript.current);
    // console.log("transcript inside handleTranscriptChange:" + transcript);
    setText(event.target.value);
    // console.log("event target value "+ event.target.value);
    }



  const handleReset = ()=>{
    resetTranscript();
    setText('');
    lastTranscript.current='';
  }

  return (
    <div className='dictation'>
      {!isRecording ?
        <button className="start-recording" onClick={handleStartRecording}><Mic /></button>
        :
        <button className="stop-recording" onClick={handleStopRecording}><StopCircle /></button>
      }
      <button className="refresh-transcript" onClick={handleReset}><Refresh /></button>
      <button style={{ fontSize: '1.5rem' }} onClick={handleCopyClick}>📋</button>
      {isCopied && <span className='copied'>Copied!</span>}
      {/* <textarea onChange={handleTranscriptChange} value= {text} className="transcript"></textarea> */}
      <p className="transcript">{transcript}</p>
      {/* <p>interimTranscript: {interimTranscript}</p> */}
    </div>
  );
};
export default Dictaphone;