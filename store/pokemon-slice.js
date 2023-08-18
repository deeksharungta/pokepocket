"use-client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "https://pokeapi.co/api/v2";

export const fetchAllPokemon = createAsyncThunk(
  "fetchAllPokemon",
  async (pageNum) => {
    const response = await fetch(
      `${baseUrl}/pokemon?offset=${36 * (pageNum - 1)}&limit=36`
    );
    const data = await response.json();
    const allPokemon = data.results;
    const count = data.count;
    const allPokemonData = [];
    for (const pokemon of data.results) {
      const pokemonRes = await fetch(pokemon.url);
      const pokemonData = await pokemonRes.json();
      allPokemonData.push(pokemonData);
    }
    return { allPokemon, allPokemonData, count };
  }
);

export const fetchPokemonData = createAsyncThunk(
  "fetchPokemonData",
  async (name) => {
    const [response1, response2] = await Promise.all([
      fetch(`${baseUrl}/pokemon/${name}`),
      fetch(`${baseUrl}/pokemon-species/${name}`),
    ]);

    const data1 = await response1.json();
    const data2 = await response2.json();

    const evolutionUrl = data2.evolution_chain.url;
    const evolutionResponse = await fetch(evolutionUrl);
    const evolutionData = await evolutionResponse.json();

    return { data1, data2, evolutionData };
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    allPokemon: [],
    allPokemonData: [],
    pokemonData: {},
    pokemonSpeciesData: {},
    pokemonEvolutionData: {},
    count: 0,
    loading: true,
    isError: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllPokemon.pending, (state, action) => {
      state.loading = true;
      state.isError = false;
    });

    builder.addCase(fetchAllPokemon.fulfilled, (state, action) => {
      state.loading = false;
      state.isError = false;
      state.allPokemon = action.payload.allPokemon;
      state.allPokemonData = action.payload.allPokemonData;
      state.count = action.payload.count;
    });
    builder.addCase(fetchAllPokemon.rejected, (state, action) => {
      state.isError = true;
      state.loading = false;
    });

    builder.addCase(fetchPokemonData.pending, (state, action) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(fetchPokemonData.fulfilled, (state, action) => {
      state.loading = false;
      state.isError = false;
      state.pokemonData = action.payload.data1;
      state.pokemonSpeciesData = action.payload.data2;
      state.pokemonEvolutionData = action.payload.evolutionData;
    });

    builder.addCase(fetchPokemonData.rejected, (state, action) => {
      state.isError = true;
      state.loading = false;
    });
  },
  reducers: {},
});

export const pokemonActions = pokemonSlice.actions;

export default pokemonSlice;
