import { useState, useEffect } from "react";
import cleanString from "../components/helpers/cleanString";
import randomIndex from "../components/helpers/randomIndex";


export default function usePokeData(searchText) {
  const [pokeInfo, setPokeInfo] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (searchText) {   
      fetch(`https://pokeapi.co/api/v2/pokemon/${searchText}`)
      .then(response => response.json())
      .then(response => {
        let pokeId = response.id
        let pokeName = response.name
        let pokeHeight = response.height * 10
        let pokeWeight = response.weight / 10
        let pokeTypes = response.types
        let pokeSprite = response.sprites.front_default

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${searchText}`)
        .then(response => response.json())
        .then(response => {

          const pokeRandomDescription = response.flavor_text_entries.filter((textEntries) => textEntries.language.name === 'en')[randomIndex(1, 25)].flavor_text;
          const pokeDescription = cleanString(pokeRandomDescription)

          const pokeInfo = { "pokeId" : pokeId, "pokeName": pokeName, "pokeHeight": pokeHeight, "pokeWeight": pokeWeight, "pokeTypes" : pokeTypes, "pokeSprite": pokeSprite, "pokeDescription" : pokeDescription }

          setPokeInfo(pokeInfo);
          setError('')
          
        }).catch(() => {
          setError('pokemon not found')
        }).finally(() => {
          setLoading(false)
        });

      }).catch(() => {
        setError('pokemon not found')
      }).finally(() => {
        setLoading(false)
      });
    }
  }, [searchText]);

  return {
    pokeInfo,
    error,
    loading
  }
}