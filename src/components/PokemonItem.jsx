export function PokemonItem(props) {
  return (
    <li>
      <h2>{props.pokemon.name}</h2>
      <a href={props.pokemon.url}>Sobre o pokemao</a>
    </li>
  );
}
