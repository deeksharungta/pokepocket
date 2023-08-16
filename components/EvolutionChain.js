"use client";
import React, { useEffect, useState } from "react";
import styles from "./EvolutionChain.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonDataEvolution } from "@/store/pokemon-slice";

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
      <Image src="./Arrow.svg" height={24} width={32} alt="arrow-icon" />
      <div>
        <img
          src={pokemonDetails?.sprites?.other.home.front_default}
          height={195}
          width={195}
          alt="evolution"
        />
        <p className={styles["pokemon-name"]}>{props.chain?.species.name}</p>
      </div>
      {props.chain?.evolves_to.length >= 1 && (
        <EvolutionChain chain={props.chain?.evolves_to[0]} />
      )}
    </>
  );
};

export default EvolutionChain;
