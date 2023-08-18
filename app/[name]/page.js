"use client";

import PokemonCard from "@/components/PokemonCard";
import { fetchPokemonData } from "@/store/pokemon-slice";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import Link from "next/link";
import Chat from "@/components/Chat";
import Image from "next/image";
import Dots from "@/utils/dots";

const PokemonData = () => {
  const [showChat, setShowChat] = useState(true);
  const router = useRouter();

  const pathName = usePathname();
  const pokemonName = pathName.replace("/", "");

  const {
    pokemonData,
    pokemonEvolutionData,
    pokemonSpeciesData,
    loading,
    isError,
  } = useSelector((state) => state.pokemon);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPokemonData(pokemonName));
  }, [pokemonName]);

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loading}>
          <p className={styles["loading-text"]}>
            {" "}
            Loading
            <Dots />
          </p>
        </div>
      )}
      {isError && (
        <div className={styles.loading}>
          <p className={styles["error-text"]}>No data found!</p>

          <button
            className={styles.btn}
            type="button"
            onClick={() => router.back()}
          >
            Go back
          </button>
        </div>
      )}
      {!loading && !isError && (
        <>
          <Link className={styles.logo} href="/">
            PokePocket
          </Link>
          <PokemonCard
            number={pokemonData.id}
            name={pokemonData.name}
            types={pokemonData.types}
            image={
              pokemonData.sprites?.other.home.front_default ||
              pokemonData.sprites?.other["official-artwork"]?.front_default ||
              pokemonData.sprites?.front_default
            }
            abilities={pokemonData.abilities}
            baseStats={pokemonData.stats}
            weight={pokemonData.weight}
            height={pokemonData.height}
            chain={pokemonEvolutionData.chain}
            base_experience={pokemonData.base_experience}
            category={pokemonSpeciesData.genera}
            egg_group={pokemonSpeciesData.egg_groups}
            gender_rate={pokemonSpeciesData.gender_rate}
          />
          {!!pokemonData && (
            <div className={styles.chatbox}>
              {showChat ? (
                <Chat
                  name={pokemonData?.name}
                  type={pokemonData?.types}
                  onClose={setShowChat}
                />
              ) : (
                <button
                  className={styles["chat-btn"]}
                  onClick={() => {
                    setShowChat(true);
                  }}
                >
                  <Image
                    src="./chat.svg"
                    width={29}
                    height={26.1}
                    alt="chat-icon"
                  />
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PokemonData;
