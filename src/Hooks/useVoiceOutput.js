import { useEffect, useState } from 'react';

import { synthSpeak } from '../components/helpers/HelperFunctions';

export default function useVoiceOutPut(pokeName, pokeDescription, synthCancel) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const getVoice = speechSynthesis.getVoices();
  const voiceLang = getVoice[2];
  const synth = window.speechSynthesis;

  const [pokeDescriptionButtonClicked, setPokeDescriptionButtonClicked] =
    useState(false);

  //poke name voice output
  useEffect(() => {
    if (pokeName) {
      synthSpeak(pokeName, voiceLang);
    }
    console.log(pokeName);
  }, [pokeName, voiceLang]);

  //pokemon description voice output
  useEffect(() => {
    if (pokeDescriptionButtonClicked) {
      setIsSpeaking(true);
      synthSpeak(pokeDescription, voiceLang);

      function isSpeakingChecker() {
        if (synth.speaking === false) {
          setIsSpeaking(false);
          setPokeDescriptionButtonClicked(false);
          clearInterval(speakingInterval);
        }
      }
      const speakingInterval = setInterval(isSpeakingChecker, 100);
    }
  }, [pokeDescriptionButtonClicked, pokeDescription, synth, voiceLang]);

  useEffect(() => {
    synth.cancel();
  }, [synthCancel, synth]);

  return {
    isSpeaking,
    setPokeDescriptionButtonClicked,
  };
}
