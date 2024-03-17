import "@/styles/global.scss";
import "@/styles/containers.scss";

import { useContext, useEffect, useState } from "react";
import { PokemonContext } from "@/contexts/PokemonContext";
import PokemonCard from "@/components/cards/PokemonCard";
import { getPokemons } from "@/services/getPokemons";
import Modal from "@/components/modal/Modal";
import PokemonDetailsCard from "@/components/cards/PokemonDetailsCard";
import SearchForm from "@/components/forms/SearchForm";

const PokemonsList = () => {
  const { pokemonListCommand, setPokemonData } =
    useContext(PokemonContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPokemons(30);
        setPokemonData(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="d-grid align-items-center justify-content-center text-center">
        <h1 className="pt-3">Pokemons</h1>
        <SearchForm />

      <div className="container--pokemon__list p-2">
        {pokemonListCommand?.map((pokemon) => (
          <Modal
            key={pokemon.url}
            ComponentOpen={<PokemonCard pokemonURL={pokemon.url} />}
            ComponentBody={<PokemonDetailsCard pokemonName={pokemon.name} />}
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonsList;
