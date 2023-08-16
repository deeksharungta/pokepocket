"use-client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "https://pokeapi.co/api/v2";

export const fetchAllPokemon = createAsyncThunk("fetchAllPokemon", async () => {
  const response = await fetch(`${baseUrl}/pokemon?limit=20`);
  const data = await response.json();
  const allPokemon = data.results;
  const next = data.next;
  const allPokemonData = [];
  for (const pokemon of data.results) {
    const pokemonRes = await fetch(pokemon.url);
    const pokemonData = await pokemonRes.json();
    allPokemonData.push(pokemonData);
  }
  return { allPokemon, allPokemonData, next };
});

export const fetchNextPokemon = createAsyncThunk(
  "fetchNextPokemon",
  async (_, { getState }) => {
    const state = getState();
    const nextUrl = state.pokemon.next;
    const response = await fetch(nextUrl);
    const data = await response.json();
    const allPokemon = data.results;
    const next = data.next;
    const allPokemonData = [];
    for (const pokemon of data.results) {
      const pokemonRes = await fetch(pokemon.url);
      const pokemonData = await pokemonRes.json();
      allPokemonData.push(pokemonData);
    }
    return { allPokemon, allPokemonData, next };
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
    pokemonDataBase: [],
    next: "",
    previous: "",
    loading: false,
    isError: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllPokemon.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllPokemon.fulfilled, (state, action) => {
      state.loading = false;
      state.allPokemon = action.payload.allPokemon;
      state.allPokemonData = action.payload.allPokemonData;
      state.next = action.payload.next;
      // state.previous = action.payload.previous;
    });
    builder.addCase(fetchAllPokemon.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });

    builder.addCase(fetchNextPokemon.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchNextPokemon.fulfilled, (state, action) => {
      state.loading = false;
      state.allPokemon = action.payload.allPokemon;
      state.allPokemonData = action.payload.allPokemonData;
      state.next = action.payload.next;
      // state.previous = action.payload.previous;
    });
    builder.addCase(fetchNextPokemon.rejected, (state, action) => {
      console.error("Error");
      state.isError = true;
    });

    builder.addCase(fetchPokemonData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPokemonData.fulfilled, (state, action) => {
      state.loading = false;
      state.pokemonData = action.payload.data1;
      state.pokemonSpeciesData = action.payload.data2;
      state.pokemonEvolutionData = action.payload.evolutionData;
    });

    builder.addCase(fetchPokemonData.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
  reducers: {},
});

export const pokemonActions = pokemonSlice.actions;

export default pokemonSlice;
