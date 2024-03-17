import React, { createContext, useState } from 'react';

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemonData, setPokemonData] = useState([]); // State with completed data
  const [pokemonListCommand, setPokemonListCommand] = useState([]); // State with editable data
  const [pokemonDetailsListQuery, setPokemonDetailsListQuery] = useState([]); // State for query data

  return (
    <PokemonContext.Provider value={{ pokemonData, pokemonListCommand, pokemonDetailsListQuery, setPokemonData, setPokemonDetailsListQuery, setPokemonListCommand }}>
      {children}
    </PokemonContext.Provider>
  );
};