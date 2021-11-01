import { useState, useEffect } from 'react';

import {
  cleanString,
  randomIndex,
} from '../components/helpers/HelperFunctions';

export default function usePokeData(searchText) {
  const [pokeInfo, setPokeInfo] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchText) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${searchText}`)
        .then((response) => response.json())
        .then((response) => {
          const pokeId = response.id;
          const pokeName = response.name;
          const pokeHeight = response.height * 10;
          const pokeWeight = response.weight / 10;
          const pokeTypes = response.types;
          const pokeSprite = response.sprites.front_default;

          fetch(`https://pokeapi.co/api/v2/pokemon-species/${searchText}`)
            .then((response) => response.json())
            .then((response) => {
              const pokeRandomDescription = response.flavor_text_entries.filter(
                (textEntries) => textEntries.language.name === 'en',
              )[randomIndex(1, 25)].flavor_text;
              const pokeDescription = cleanString(pokeRandomDescription);

              const pokeHabitat = response.habitat.name;

              const pokeInfo = {
                pokeId: pokeId,
                pokeName: pokeName,
                pokeHeight: pokeHeight,
                pokeWeight: pokeWeight,
                pokeTypes: pokeTypes,
                pokeSprite: pokeSprite,
                pokeDescription: pokeDescription,
                pokeHabitat: pokeHabitat,
              };

              setPokeInfo(pokeInfo);
              setError('');
            })
            .catch(() => {
              setError('pokemon not found');
            })
            .finally(() => {
              setLoading(false);
            });
        })
        .catch(() => {
          setError('pokemon not found');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchText]);

  return {
    pokeInfo,
    error,
    loading,
  };
}
