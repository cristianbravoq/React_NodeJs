import { pokemonService } from "./pokemonService";

export const getPokemonDetails = async (pokemonURL) => {
  try {
    const _URL = pokemonURL.substring(pokemonURL.lastIndexOf("pokemon"));
    const response = await pokemonService.get(_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
