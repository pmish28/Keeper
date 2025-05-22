import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, Play, StopCircle } from "lucide-react";
import { Language, Refresh } from '@mui/icons-material';
import "./TestDictation.scss"

const Dictaphone = () => {
  const { finalTranscript, transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const languages = [
    { code: 'en-UK', label: 'English (UK)' },
    { code: 'en-US', label: 'English (US)' },
    { code: 'fr-FR', label: 'French (France)' },
    { code: 'hi-IN', label: 'Hindi (India)' },
    { code: 'zh-CN', label: 'Chinese (Mandarin)' },
    { code: 'es-ES', label: 'Spanish (Spain)' },  
    { code: 'de-DE', label: 'German (Germany)' },
    // Add more languages as needed
  ];
  const [selectedLangage, setSelectedLanguage] = useState(languages[0].code);


  // Append only finalized speech, not the whole transcript
  useEffect(() => {
    if (finalTranscript !== '') {
      setText((prev) => (prev ? prev + ' ' + finalTranscript : finalTranscript));
      resetTranscript(); // Clear transcript so it doesn't append again
    }
  }, [finalTranscript, resetTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser doesn't support speech recognition.</span>;
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true ,language: selectedLangage});
    setIsRecording(true);

  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);

  };

  const handleReset = () => {
    resetTranscript();
    setText('');
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(() => alert("Failed to copy."));
  }

  return (
    <div className='dictation'>
      {!isRecording ?
        <button className="start-recording" onClick={startListening}><Mic /></button>
        :
        <button className="stop-recording" onClick={stopListening}><StopCircle /></button>
      }
      <button className="refresh-transcript" onClick={handleReset}><Refresh /></button>
      <button style={{ fontSize: '1.5rem' }} onClick={handleCopyClick}>📋</button>
      
      <div className='select-language'>
        <select
        value={selectedLangage} onChange={(e) => setSelectedLanguage(e.target.value)}>
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>{lang.label}</option>
        ))}
      </select>
      </div>
      {isCopied && <span className='copied'>Copied!</span>}
      <textarea onChange={handleChange} value={text} className="transcript"></textarea>
      {/* <p className="transcript">{transcript}</p> */}
      {/* <p>interimTranscript: {interimTranscript}</p> */}
    </div>
  );
};


export default Dictaphone;