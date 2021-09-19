import { useEffect, useState } from 'react';

// import SearchInput from './SearchInput';


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()
mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

export function PokemonList() {

  const [isListening, setIsListening] = useState(false)

  const [transcriptText, setTranscriptText ] = useState('')

  const [searchText, setSearchText] = useState('')

  const [pokemonInfo, setPokemonInfo] = useState( );
  


//////ESCUTA, COLETA O TEXTO TRANSCRITO E SETA EM searchText///////////////////////////
  useEffect(() => {
    handleListen()
  }, [isListening])
  

  const handleListen = () => {
    if(isListening) {
      mic.start()
      mic.onend = () => {
        setIsListening(false)
        console.log('mic stopped')
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log(' mic stopped on click')
      }
    }
    mic.onstart = () => {
      console.log('mic on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      setTranscriptText(transcript.toLowerCase())
      // console.log(`texto transcrevido: ${transcriptFinal}`)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  // console.log(`ta ouvindo: '${isListening}'`)

  // console.log(`transcript ->> transcriptText: ${transcriptText}`)

//SET searchText COM O VALOR DE transcriptText
  useEffect(() => {
    setSearchText(transcriptText)
  }, [transcriptText])


  // console.log(`transcriptText ->> searchText: '${searchText}'`)


//SET searchText NA api url && SET response EM pokemonInfo
  useEffect(() => {
    if (searchText) {
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${searchText}`)
      .then(response => response.json())
      .then(response => {
        setPokemonInfo(response);
        // console.log(`info do pokemao: ${response}`)
      });
    }
    
  }, [searchText]);

 

  //SET pokemonInfo PRA MUIE FALA AS COISA DO POKEMAO


  useEffect(() => {
    if (pokemonInfo) {
      //fala o nome
      const pokemonName = [pokemonInfo.name].toString()
      let utteranceName = new SpeechSynthesisUtterance(pokemonName)
      console.log(`nome do pokemao ${utteranceName}`)
      speechSynthesis.speak(utteranceName)
      
      //pega array descricao e filtra caracteres especiais 
      let pokemonDescription = [pokemonInfo.flavor_text_entries[1].flavor_text+
       ' '+
       pokemonInfo.flavor_text_entries[3].flavor_text+
       ' '+
       pokemonInfo.flavor_text_entries[5].flavor_text]
        .toLocaleString();
      let findN = '\n'; //remove o \n
      let reN = new RegExp(findN, 'g');
      pokemonDescription = pokemonDescription.replace(reN, ' ');
      let findF = '\f'; //remove o \f
      let reF = new RegExp(findF, 'g');
      pokemonDescription = pokemonDescription.replace(reF, ' ');
      //fala a descricao
      console.log(pokemonDescription)
      let utteranceDescription = new SpeechSynthesisUtterance(pokemonDescription)
      console.log(utteranceDescription)
      speechSynthesis.speak(utteranceDescription)
    }
    
  }, [pokemonInfo])
  
  



  

  return (
    <>
      {isListening ? <span>ouvindo</span> : <span>nao ouvindo</span>}
      <button onClick={() => setIsListening(prevState => !prevState)}>Start/stop</button>



      {/* <SearchInput
      value={searchText} 
      onChange={(searchtxt) => setSearchText(searchtxt)}
      /> */}

      {searchText && !pokemonInfo ? <span>Procurando...</span> : <span>fale pra acha o pokemao</span>}

      <div></div>


      {pokemonInfo && (
        <div>
          <p><b>Nome: </b>{pokemonInfo.name}</p>
          <p><b>Color: </b>{pokemonInfo.color.name}</p>

          { pokemonInfo.egg_groups[1] ? ( //se o segundo tipo existe // se o pokemon tem 2 tipos
            <p><b>Types: </b>{pokemonInfo.egg_groups[0].name} and  {pokemonInfo.egg_groups[1].name}</p>
          ) : ( //se nao tiver só mostra o tipo 0
            <p><b>Type: </b>{pokemonInfo.egg_groups[0].name}</p>
          )}

          <p><b>Where to find it: </b>{pokemonInfo.habitat.name}</p>
          <p><b>Description: </b>{pokemonInfo.flavor_text_entries[1].flavor_text} 
            <br/>
            {pokemonInfo.flavor_text_entries[3].flavor_text} 
            <br/>
            {pokemonInfo.flavor_text_entries[5].flavor_text}
          </p>
        </div>
      )}

    </>
  );
}
