"use client";

import Image from "next/image";
import styles from "./page.module.css";
import PokemonItem from "@/components/PokemonItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllPokemon } from "@/store/pokemon-slice";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const page = searchParams.get("page");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);

  const { allPokemonData, count, loading } = useSelector(
    (state) => state.pokemon
  );

  const totalPages = Math.ceil(count / 20);

  useEffect(() => {
    dispatch(fetchAllPokemon(currentPage));
  }, [currentPage]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPokemons = allPokemonData?.filter((pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pokemon.id.toString().includes(searchQuery)
    );
  });

  return (
    <main className={styles.main}>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Link
            className={styles.logo}
            href="?page=1"
            onClick={() => {
              setCurrentPage(1);
            }}
          >
            PokePocket
          </Link>
          <div className={styles["search-wrapper"]}>
            <Image
              src="./search.svg"
              width={32}
              height={32}
              alt="search-icon"
            />
            <input
              className={styles.search}
              placeholder="Search By Name or Number"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className={styles.container}>
            {filteredPokemons?.map((pokemon) => (
              <PokemonItem
                key={pokemon.id}
                number={pokemon.id}
                name={pokemon?.name}
                types={pokemon.types}
                image={
                  pokemon.sprites.other.home.front_default ||
                  pokemon.sprites?.other["official-artwork"]?.front_default ||
                  pokemon.sprites?.front_default
                }
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </main>
  );
}
