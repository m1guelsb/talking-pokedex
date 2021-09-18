import { useEffect, useState } from 'react';
import { PokemonItem } from './PokemonItem';

export function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  const [search, setSearch] = useState('')


  const s = search && search.toLowerCase();
  const filtered =
    !pokemons || !s
      ? pokemons
      : pokemons.filter(({ name }) =>
          name.toLowerCase().includes(s)
        );



  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon-species')
      .then(response => response.json())
      .then(pokemonData => {
        setPokemons(pokemonData.results)
      });
  }, []);
  console.log(pokemons)

  return (
    <>
      <input
          type="search"
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
        />
      <ul>
        

      {filtered && (
        <ul>
          {filtered.map(pokemon => (
              <PokemonItem key={pokemon.name} pokemon={pokemon} />
          ))}
        </ul>
      )} 
        {/* {pokemons.map(pokemon => {
          return <PokemonItem key={pokemon.name} pokemon={pokemon} />
        })} */}
      </ul>
    </>
  );
}
