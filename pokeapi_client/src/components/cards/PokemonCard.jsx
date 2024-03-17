import "./pokemoncard.scss";

import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { colorByType } from "@/utils/colorContainerByTypePokemon";
import { PokemonContext } from "@/contexts/PokemonContext";
import { getPokemonDetails } from "@/services/getPokemonDetails";

const PokemonCard = ({ pokemonURL }) => {
  const [pokemon, setPokemon] = useState(null);
  const { pokemonDetailsListQuery,  setPokemonDetailsListQuery } = useContext(PokemonContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPokemonDetails(pokemonURL);
        setPokemon(data);
        const temp = pokemonDetailsListQuery;
        temp.push(data);
        setPokemonDetailsListQuery(temp);
      } catch (error) {
      }
    };
    fetchData();
  }, []);

  return (
    <motion.article 
      className="text-center bg-white rounded-3 shadow p-4 pokemon--card"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      >
      <header className="mb-2">
        <img
          className="mx-auto d-block rounded-circle img-fluid image--pokemon"
          src={
            pokemon?.sprites.versions["generation-v"]["black-white"]
              .front_default
          }
          alt={pokemon?.name}
        />
      </header>
      <span className="text-sm text-gray-400">N° {pokemon?.id}</span>
      <h4 className="text-lg text-capitalize">{pokemon?.name}</h4>
      <ul className="d-flex gap-2 justify-content-center">
        {pokemon?.types.map((type) => (
          <li
            className={`px-2 py-1 rounded text-white text-sm ${colorByType[type.type.name]}`}
            key={type.type.name}
          >
            {type.type.name}
          </li>
        ))}
      </ul>
    </motion.article>
  );
};

export default PokemonCard;
