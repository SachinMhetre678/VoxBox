import { useState, useEffect, useRef } from 'react';

const useRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      setSpeechRecognitionSupported(true);
    }

    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0]);
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const startRecording = () => {
    if (!speechRecognitionSupported) {
      alert('Speech Recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const finalTranscript = Array.from(event.results)
        .filter(result => result.isFinal)  // Only take final results
        .map(result => result[0].transcript)
        .join(' ');
      
      if (finalTranscript) {
        setTranscript(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error detected: ', event.error);
      alert(`Speech recognition error: ${event.error}`);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    setIsRecording(true);
    recognitionRef.current = recognition;
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const hearWhatYouSaid = () => {
    fetch('/api/voice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: transcript }),
    })
      .then((response) => response.json())
      .then((data) => {
        const speech = new SpeechSynthesisUtterance(data.message);
        speech.voice = selectedVoice;
        window.speechSynthesis.speak(speech);
      })
      .catch((error) => {
        console.error('Error sending transcript:', error);
      });
  };

  return {
    isRecording,
    transcript,
    speechRecognitionSupported,
    voices,
    selectedVoice,
    setSelectedVoice,
    startRecording,
    stopRecording,
    hearWhatYouSaid,
  };
};

export default useRecorder;
