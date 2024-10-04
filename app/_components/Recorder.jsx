import React, { useEffect, useState } from 'react';
import useRecorder from './useRecorder';
import { Button } from '../../components/ui/button';

const Recorder = () => {
  const {
    isRecording,
    transcript: initialTranscript,
    speechRecognitionSupported,
    voices,
    selectedVoice,
    setSelectedVoice,
    startRecording,
    stopRecording,
    hearWhatYouSaid,
  } = useRecorder();

  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    // Update the transcript when the initialTranscript changes
    if (initialTranscript) {
      addUniqueWords(initialTranscript);
    }
  }, [initialTranscript]);

  // Function to add unique words to the transcript
  const addUniqueWords = (newTranscript) => {
    const newWords = newTranscript.split(' ');
    setTranscript((prev) => {
      const existingWords = prev.split(' ');
      const uniqueWords = newWords.filter(word => !existingWords.includes(word));
      return [...existingWords, ...uniqueWords].join(' ');
    });
  };

  return (
    <div className="relative" id="home">
      <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>
      <div>
        <div className="relative pt-36 ml-auto">
          <div className="lg:w-2/3 text-center mx-auto">
            <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
              VoxBox: Where <span className="text-primary dark:text-white">your voice becomes collaboration.</span>
            </h1>
            <p className="mt-8 text-gray-700 dark:text-gray-300">
              VoxBox is an innovative platform designed for seamless voice communication and collaboration. With advanced voice recognition technology, teams can capture ideas, transcribe meetings, and foster creativity in real-time. Experience a workspace that enhances productivity through effortless voice interaction.
            </p>
            <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
              {speechRecognitionSupported ? (
                <>
                  <Button onClick={startRecording} disabled={isRecording} className="relative text-base font-semibold text-white">
                    Start 
                  </Button>
                  <Button onClick={stopRecording} disabled={!isRecording} className="relative text-base font-semibold text-white">
                    Stop 
                  </Button>
                  <Button onClick={hearWhatYouSaid} disabled={!transcript} className="relative text-base font-semibold text-white">
                    Hear What You Said
                  </Button>
                  <div className="relative text-base font-semibold">
                    <select onChange={(e) => setSelectedVoice(voices[e.target.selectedIndex])} className="hidden sm:flex">
                      {voices.map((voice, index) => (
                        <option key={index} value={voice.name}>{voice.name}</option>
                      ))}
                    </select>
                    <div>
                      <p className="relative text-base font-semibold">Transcript: {transcript}</p>
                    </div>
                  </div>
                </>
              ) : (
                <p>Speech Recognition is not supported in this browser.</p>
              )}
            </div>
            <div className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between">
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">The most flexible solution</h6>
                <p className="mt-2 text-gray-500">Harness the power of voice to adapt to your team's needs.</p>
              </div>
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">Streamlined communication</h6>
                <p className="mt-2 text-gray-500">Simplify interactions with real-time transcription and playback.</p>
              </div>
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">Empowering collaboration</h6>
                <p className="mt-2 text-gray-500">Join a community that thrives on voice-driven teamwork and creativity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recorder;
