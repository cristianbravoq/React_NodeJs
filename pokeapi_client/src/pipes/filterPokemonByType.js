export function filterPokemonByType(
  typeName,
  listPokemonWithDetails,
  listPokemonPrincipal
)
{
  const filteredPokemonNames = listPokemonWithDetails
    .filter((pokemon) =>
      pokemon.types.some((type) =>
        type.type.name.includes(typeName.toLowerCase())
      )
    )
    .map((pokemon) => pokemon.name);

  const filteredTypes = listPokemonPrincipal.filter((pokemon) =>
    filteredPokemonNames.includes(pokemon.name)
  );

  return filteredTypes;
}
