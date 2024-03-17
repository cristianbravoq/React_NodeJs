import "./pokemonDetailsCard.scss";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { colorByState } from "@/utils/colorContainerByStatePokemon";
import { colorByType } from "@/utils/colorContainerByTypePokemon";
import { PokemonContext } from "@/contexts/PokemonContext";
import { getNormalizedKey } from "@/utils/colorContainerByStatePokemon";

const PokemonDetailsCard = ({ pokemonName }) => {
  const [pokemon, setPokemon] = useState(null);
  const { pokemonDetailsListQuery } = useContext(PokemonContext);

  useEffect(() => {
    const pokemonSearch = pokemonDetailsListQuery.find(
      (pokemon) => pokemon.name === pokemonName
    );
    setPokemon(pokemonSearch);
  }, []);

  return (
    <motion.div 
      className="container--pokemon__details"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      >
      <div>
        <img
          className="image--pokemon mx-auto d-block rounded-circle"
          src={
            pokemon?.sprites.versions["generation-v"]["black-white"]
              .front_default
          }
          alt={pokemon?.name}
        />

        <span className="text-secondary text-sm font-weight-bold d-block text-center">
          N° {pokemon?.id}
        </span>

        <h2 className="font-weight-bold text-uppercase text-center">
          {pokemon?.name}
        </h2>

        <ul className="list-inline d-flex justify-content-center">
          {pokemon?.types.map((type, index) => (
            <li
              className={`px-2 py-1 rounded text-white text-sm list-inline-item ${
                colorByType[type.type.name]
              }`}
              key={index}
            >
              {type.type.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="container--detail gap-5">
        <div className="w-100">
          <span>Height</span>
          <p className="bg-light px-2 py-1 rounded">{pokemon?.height}</p>
        </div>
        <div className="w-100">
          <span>Weight</span>
          <p className="bg-light px-2 py-1 rounded">{pokemon?.weight}</p>
        </div>
      </div>

      <div className="container--detail">
        <div className="w-100">
          <h3>Abilities</h3>
          <ul className="d-flex flex-wrap w-100 gap-3 aling-items-center justify-content-center">
            {pokemon?.abilities.map((ability, index) => (
              <li className="bg-light px-2 py-1 rounded m-auto" key={index}>
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container--detail">
  <div className="w-100">
    <h3>Stats</h3>
    <ul className="d-flex flex-wrap w-100 gap-3 justify-content-center">
      {pokemon?.stats.map((stat, index) => (
        <li
          key={index}
          className={`rounded-circle d-grid border px-3 py-2 ${
            colorByState[getNormalizedKey(stat.stat.name)]
          }`}
          style={{ fontSize: "12px" }} // Ajusta el tamaño de la fuente aquí
        >
          <span className="">{getNormalizedKey(stat.stat.name)}</span>
          {stat.base_stat}
        </li>
      ))}
    </ul>
  </div>
</div>

    </motion.div>
  );
};
export default PokemonDetailsCard;
