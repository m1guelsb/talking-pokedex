import { useEffect, useState } from 'react';

import useTimeout from './useTimeout';

export default function useVoiceOutPut(pokeName, pokeDescription, synthCancel) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const getVoice = speechSynthesis.getVoices();
  const voiceLang = getVoice[2];

  const pokeNameSynth = window.speechSynthesis;
  const pokeDescriptionSynth = window.speechSynthesis;

  const [pokeDescriptionButtonClicked, setPokeDescriptionButtonClicked] =
    useState(false);

  //NAME VOICEOUTPUT
  function pokeNameSpeak() {
    if (pokeName) {
      const pokeNameUtterance = new SpeechSynthesisUtterance(pokeName);
      pokeNameUtterance.voice = voiceLang;
      pokeNameSynth.speak(pokeNameUtterance);
    }
  }
  const { reset } = useTimeout(() => pokeNameSpeak(), 800);
  useEffect(() => {
    reset();
  }, [pokeName, reset]);

  //DESCRIPTION VOICE OUTPUT
  useEffect(() => {
    if (pokeDescriptionButtonClicked) {
      setIsSpeaking(true);
      const pokeDescriptionUtterance = new SpeechSynthesisUtterance(
        pokeDescription,
      );
      pokeDescriptionUtterance.voice = voiceLang;
      pokeDescriptionSynth.speak(pokeDescriptionUtterance);

      function isSpeakingChecker() {
        if (pokeDescriptionSynth.speaking === false) {
          setIsSpeaking(false);
          setPokeDescriptionButtonClicked(false);
          clearInterval(speakingInterval);
        }
      }
      const speakingInterval = setInterval(isSpeakingChecker, 5);
    }
  }, [
    pokeDescriptionButtonClicked,
    pokeDescription,
    voiceLang,
    pokeDescriptionSynth,
  ]);

  useEffect(() => {
    setIsSpeaking(false);
    pokeNameSynth.cancel();
    pokeDescriptionSynth.cancel();
  }, [synthCancel, pokeNameSynth, pokeDescriptionSynth]);

  return {
    isSpeaking,
    setPokeDescriptionButtonClicked,
  };
}
