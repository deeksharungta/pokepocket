"use client";

import Image from "next/image";
import styles from "./page.module.css";
import PokemonItem from "@/components/PokemonItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllPokemon } from "@/store/pokemon-slice";
import Pagination from "@/components/Pagination";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const pokemons = useSelector((state) => state.pokemon.allPokemonData);
  const count = useSelector((state) => state.pokemon.count);
  const loading = useSelector((state) => state.pokemon.loading);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(count / pokemons.length);

  useEffect(() => {
    dispatch(fetchAllPokemon(currentPage));
  }, [currentPage]);

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
      {loading && <h1>Loading...</h1>}

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
        {filteredPokemons.map((pokemon) => (
          <PokemonItem
            key={pokemon.id}
            number={pokemon.id}
            name={pokemon.name}
            types={pokemon.types}
            image={
              pokemon.sprites.other.home.front_default ||
              pokemon.sprites.front_default
            }
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}
