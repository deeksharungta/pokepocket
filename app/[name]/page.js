"use client";

import PokemonCard from "@/components/PokemonCard";
import { fetchPokemonData } from "@/store/pokemon-slice";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

const PokemonData = () => {
  const pathName = usePathname();
  const pokemonName = pathName.replace("/", "");
  const router = useRouter();

  const pokemonDetails = useSelector((state) => state.pokemon.pokemonData);
  const pokemonEvolutionChain = useSelector(
    (state) => state.pokemon.pokemonEvolutionData
  );
  const pokemonSpeciesData = useSelector(
    (state) => state.pokemon.pokemonSpeciesData
  );
  const loading = useSelector((state) => state.pokemon.loading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPokemonData(pokemonName));
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <PokemonCard
            number={pokemonDetails.id}
            name={pokemonDetails.name}
            types={pokemonDetails.types}
            image={
              pokemonDetails.sprites?.other.home.front_default ||
              pokemonDetails.sprites?.other["official-artwork"]
                ?.front_default ||
              pokemonDetails.sprites?.front_default
            }
            abilities={pokemonDetails.abilities}
            baseStats={pokemonDetails.stats}
            weight={pokemonDetails.weight}
            height={pokemonDetails.height}
            chain={pokemonEvolutionChain.chain}
            base_experience={pokemonDetails.base_experience}
            category={pokemonSpeciesData.genera}
            egg_group={pokemonSpeciesData.egg_groups}
            gender_rate={pokemonSpeciesData.gender_rate}
          />

          <button
            type="button"
            className={styles.btn}
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </>
      )}
    </div>
  );
};

export default PokemonData;
