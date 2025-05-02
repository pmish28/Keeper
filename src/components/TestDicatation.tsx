import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, Play, StopCircle } from "lucide-react";
import { Refresh } from '@mui/icons-material';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button className="start-recording" onClick={ ()=> SpeechRecognition.startListening({continuous: true})}><Mic /></button>
      <button className="stop-recording" onClick={SpeechRecognition.stopListening}><StopCircle /></button>
      <button className="refresh-transcript" onClick={resetTranscript}><Refresh/></button>
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;