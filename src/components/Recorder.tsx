import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, StopCircle, Play } from "lucide-react";

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
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" }); // combines chunks into a single audio  file
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      audioChunksRef.current = [];
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef?.current?.stop();
    setIsRecording(false);
  };

  return (
    <div>
      <div className="w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-2xl text-center space-y-4">
        <h2 className="text-xl font-semibold">🎤 Audio Note Recorder</h2>
        <motion.div
          className="mx-auto w-16 h-16 rounded-full bg-red-500"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        />
      </div>
      <div>
        {!isRecording ? (
          <button
            onClick={() => startRecording()}
            className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600"
          >
            <Mic />
          </button>
        ) : (
          <button
            onClick={() => stopRecording()}
            className="bg-gray-500 text-white p-3 rounded-full hover:bg-gray-600"
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
          <audio controls src={audioUrl}></audio>
        </div>
      )}
    </div>
  );
};
