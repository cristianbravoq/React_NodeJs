export function filterPokemonByAbility(
  abilityName,
  listPokemonWithDetails,
  listPokemonPrincipal
) {
  const filteredPokemonNames = listPokemonWithDetails
    .filter((pokemon) =>
      pokemon.abilities.some((ability) =>
        ability.ability.name.includes(abilityName.toLowerCase())
      )
    )
    .map((pokemon) => pokemon.name);

  const filteredAbilities = listPokemonPrincipal.filter((pokemon) =>
    filteredPokemonNames.includes(pokemon.name)
  );

  return filteredAbilities;
}
