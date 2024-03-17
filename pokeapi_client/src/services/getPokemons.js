import { pokemonService } from "./pokemonService";

export const getPokemons = async (limit = 10) => {
  try {
    const response = await pokemonService.get(`pokemon?limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
