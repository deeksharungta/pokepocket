"use client";
import React, { useEffect, useState } from "react";
import styles from "./EvolutionChain.module.css";
import Image from "next/image";
import Link from "next/link";

const EvolutionChain = (props) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const evolutionData = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${props.chain.species.name}`
      );
      const data = await response.json();
      setPokemonDetails(data);
    };
    evolutionData();
  }, [props.chain]);

  return (
    <>
      <Image
        src="./Arrow.svg"
        height={24}
        width={32}
        alt="arrow-icon"
        className={styles.arrow}
      />
      <Link href={props.chain?.species.name}>
        <Image
          src={
            pokemonDetails?.sprites?.other.home.front_default ||
            pokemonDetails?.sprites?.other["official-artwork"]?.front_default ||
            pokemonDetails?.sprites?.front_default
          }
          height={195}
          width={195}
          alt={props.chain?.species.name}
        />
        <p className={styles["pokemon-name"]}>{props.chain?.species.name}</p>
      </Link>
      {props.chain?.evolves_to.length >= 1 && (
        <EvolutionChain chain={props.chain?.evolves_to[0]} />
      )}
    </>
  );
};

export default EvolutionChain;
