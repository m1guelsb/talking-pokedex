import { useEffect, useState } from 'react';
// import { PokemonItem } from './PokemonItem';

import SearchInput from './SearchInput';

export function PokemonList() {
  const [pokemonInfo, setPokemonInfo] = useState( );

  const [searchText, setSearchText] = useState('')

  useEffect(() => {

    if (searchText) {
      fetch(`https://kitsu.io/api/edge/anime?filter[text]=${searchText}&page[limit]=12`)
      .then(response => response.json())
      .then(response => {
        setPokemonInfo(response.data);
      });
    }
    
  }, [searchText]);
  console.log(pokemonInfo)



  return (
    <>
      <SearchInput
      value={searchText} 
      onChange={(searchtxt) => setSearchText(searchtxt)}
      />

      {/* {searchText && !pokemonInfo && <span>Procurando...</span> } */}
      
      {pokemonInfo && (
        <ul className="animes-list">
          {pokemonInfo.map((anime) => (
            <li key={anime.id}>
              <img
                src={anime.attributes.posterImage.small}
                alt={anime.attributes.canonicalTitle}
              />
              {anime.attributes.canonicalTitle}
            </li>
          ))}
        </ul>
      )}



      {/* {pokemonInfo && (
        <div>
          <p><b>Nome: </b>{pokemonInfo.name}</p>
          <p><b>Color: </b>{pokemonInfo.color.name}</p>

          { pokemonInfo.egg_groups[1] ? ( //se o segundo tipo existe (se o pokemon tem 2 tipos) 
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
      )} */}

    </>
  );
}
