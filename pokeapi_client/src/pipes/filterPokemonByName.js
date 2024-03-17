export function filterPokemonByName(keyWord, listPokemon) {
    return listPokemon.filter((pokemon) => {
      return pokemon.name.includes(keyWord.toLowerCase());
    });
  }