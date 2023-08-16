"use client";

import Image from "next/image";
import styles from "./page.module.css";
import PokemonItem from "@/components/PokemonItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllPokemon, fetchNextPokemon } from "@/store/pokemon-slice";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const pokemons = useSelector((state) => state.pokemon.allPokemonData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPokemon());
  }, []);

  const nextButtonHandler = () => {
    dispatch(fetchNextPokemon());
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPokemons = pokemons.filter((pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pokemon.id.toString().includes(searchQuery)
    );
  });

  return (
    <main className={styles.main}>
      <h1 className={styles.logo}>PokePocket</h1>
      <div className={styles["search-wrapper"]}>
        <Image src="./search.svg" width={32} height={32} alt="search-icon" />
        <input
          className={styles.search}
          placeholder="Search By Name or Number"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

      <div className={styles.container}>
        {/* {pokemons.map((pokemon) => (
          <PokemonItem
            key={pokemon.id}
            number={pokemon.id}
            name={pokemon.name}
            types={pokemon.types}
            image={pokemon.sprites.other.home.front_default}
          />
        ))} */}
        {filteredPokemons.map((pokemon) => (
          <PokemonItem
            key={pokemon.id}
            number={pokemon.id}
            name={pokemon.name}
            types={pokemon.types}
            image={pokemon.sprites.other.home.front_default}
          />
        ))}
      </div>
      <div className={styles.action}>
        <button onClick={nextButtonHandler} className={styles.btn}>
          Next
        </button>
        {/* {previous != "" && (
          <button onClick={previousButtonHandler} className={styles.btn}>
            Previous
          </button>
        )}
        {next != "" && (
         
        )} */}
      </div>
    </main>
  );
}
