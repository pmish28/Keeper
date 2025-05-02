import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Play, StopCircle } from "lucide-react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); // user persmission for mic
    const recorder = new MediaRecorder(stream); //starts recording
    recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);

    recorder.onstop = () => {
      console.log("Recorder.onstop called")
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" }); // combines chunks into a single audio  file
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      audioChunksRef.current = [];
    };

    recorder.start();
    console.log("Recorder.start called")
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
  };

  const stopRecording = () => {
    console.log("stopRecording called")

    mediaRecorderRef?.current?.stop();
    setIsRecording(false);
  };

  return (
    <div className="recorder">
      <div >
        <h2 className="text-xl">🎤 Audio Note Recorder</h2>        
      </div>
      <div className="mic-stop">
        {!isRecording ? (
          <button
            onClick={() => startRecording()}
            className="start-recording"
          >
            <Mic />
          </button>
        ) : (
          <button
            onClick={() => stopRecording()}
            className="start-recording"
          >
            <StopCircle />
          </button>
        )}
      </div>

      {/* <button
          onClick={() => playRecording()}
          className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600"
        >
          <Play />
        </button> */}
      {audioUrl && (
        <div>
          <p>Recorded Audio:</p>
          <audio controls src={audioUrl}><Play /></audio>
        </div>
      )}
    </div>
  );
};
