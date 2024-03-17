import "./searchForm.scss";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useContext, useEffect, useState, useRef } from "react";
import { PokemonContext } from "@/contexts/PokemonContext";
import { filterPokemonByName } from "@/pipes/filterPokemonByName";
import { filterPokemonByAbility } from "../../pipes/filterPokemonByAbility";
import { filterPokemonByType } from "../../pipes/filterPokemonByType";

const SearchForm = () => {
  const [placeholderName, setPlaceholderName] = useState("");
  const [placeholderType, setPlaceholderType] = useState("");
  const [placeholderAbility, setPlaceholderAbility] = useState("");

  const inputNameRef = useRef(null);
  const inputTypeRef = useRef(null);
  const inputAbilityRef = useRef(null);

  const { pokemonDetailsListQuery, pokemonData, setPokemonListCommand } =
    useContext(PokemonContext);

    const getRandomPokemon = () => {
      return pokemonDetailsListQuery[Math.floor(Math.random() * pokemonDetailsListQuery.length)];
    };
    
    const handlerPlaceholders = () => {
      const randomPokemon = getRandomPokemon();
      setPlaceholderName(randomPokemon.name);
      setPlaceholderType(randomPokemon.types[0].type.name);
      setPlaceholderAbility(randomPokemon.abilities[0].ability.name);
    };
    
    useEffect(() => {
      const interval = setInterval(handlerPlaceholders, 3300);
      return () => clearInterval(interval);
    }, []);

  const handleFilterByName = () => {
    const inputValue = inputNameRef.current.value;
    const filteredList = inputValue
      ? filterPokemonByName(inputValue, pokemonData)
      : pokemonData;
    setPokemonListCommand(filteredList);
  };

  const handleFilterByAbility = () => {
    const inputValue = inputAbilityRef.current.value;
    const filteredList = inputValue
      ? filterPokemonByAbility(inputValue, pokemonDetailsListQuery, pokemonData)
      : pokemonData;
    setPokemonListCommand(filteredList);
  }

  const handleFilterByType = () => {
    const inputValue = inputTypeRef.current.value;
    const filteredList = inputValue
      ? filterPokemonByType(inputValue, pokemonDetailsListQuery, pokemonData)
      : pokemonData;
      setPokemonListCommand(filteredList);
  }

  useEffect(() => {
    handleFilterByName();
  }, []);

  return (
    <div className="container--search">
      <div className="container--search__form">
        <div className="container--button container--button__search">
          <div>Name</div>
          <input
            ref={inputNameRef}
            onChange={handleFilterByName}
            className="input--search"
            type="text"
            name="descriptionProduct"
            id="DescriptionProduct"
            placeholder={placeholderName}
          />
        </div>
        <div className="container--button container--button__search">
          <div>Types</div>
          <input
            ref={inputTypeRef}
            onChange={handleFilterByType}
            className="input--search"
            type="text"
            name="descriptionProduct"
            id="DescriptionProduct"
            placeholder={placeholderType}
          />
        </div>
        <div className="container--button container--button__search">
          <div>Abilities</div>
          <input
            ref={inputAbilityRef}
            onChange={handleFilterByAbility}
            className="input--search"
            type="text"
            name="descriptionProduct"
            id="DescriptionProduct"
            placeholder={placeholderAbility}
          />
        </div>
        <button  className="button--search">
          <SearchRoundedIcon />
        </button >
      </div>
    </div>
  );
};

export default SearchForm;
