"use client";

import Image from "next/image";
import styles from "./page.module.css";
import PokemonItem from "@/components/PokemonItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllPokemon, fetchNextPokemon } from "@/store/pokemon-slice";

export default function Home() {
  const pokemons = useSelector((state) => state.pokemon.allPokemonData);
  const next = useSelector((state) => state.pokemon.next);
  console.log(next);
  // const previous = useSelector((state) => state.pokemon.previous);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllPokemon());
  }, []);
  const nextButtonHandler = () => {
    dispatch(fetchNextPokemon());
  };

  // const previousButtonHandler = () => {
  //   dispatch(fetchNextPokemon(previous));
  // };
  return (
    <main className={styles.main}>
      <h1 className={styles.logo}>PokePocket</h1>
      <div className={styles["search-wrapper"]}>
        <Image src="./search.svg" width={32} height={32} alt="search-icon" />
        <input
          className={styles.search}
          placeholder="Search By Name or Number"
        />
      </div>

      <div className={styles.container}>
        {pokemons.map((pokemon) => (
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
