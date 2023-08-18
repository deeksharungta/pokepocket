import Image from "next/image";
import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import styles from "./PokemonCard.module.css";
import getColorByName from "@/utils/colors";
import PokemonTypeLarge from "./PokemonTypeLarge";
import EvolutionChain from "./EvolutionChain";
import Link from "next/link";

const PokemonCard = (props) => {
  function convertHeight(meters) {
    const totalInches = meters * 39.3701;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    if (inches < 10) return `${feet}'0${inches}"`;
    else return `${feet}'${inches}"`;
  }
  const [pokemonEvolutionDetails, setPokemonEvolutionDetails] = useState(null);

  useEffect(() => {
    const evolutionData = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${props.chain?.species.name}`
      );
      const data = await response.json();
      setPokemonEvolutionDetails(data);
    };
    evolutionData();
  }, [props.chain]);

  const color =
    props.types && props.types[0]
      ? getColorByName(props.types[0].type.name)
      : "#000";

  const colorStyle = {
    background: color,
  };

  const evolutionColorStyle = {
    background: `${color}33`,
  };

  const abilityArr = props.abilities?.map((item) => item.ability.name);
  const abilityText = abilityArr?.join(", ");

  const heightInMetres = props.height / 10;
  const heightInFeet = convertHeight(heightInMetres);

  const weightInKg = props.weight / 10;
  const weightInLbs = props.weight / 4.536;

  const female = (props.gender_rate / 8) * 100;
  const male = 100 - female;

  return (
    <div className={styles.container}>
      <div style={colorStyle} className={styles["section-top"]}>
        <Image
          className={styles.pattern}
          src="./Pattern.svg"
          width={100}
          height={100}
          alt="background-pattern"
        />
        {!!props.image && (
          <Image
            className={styles.img}
            src={props.image}
            width={277}
            height={277}
            alt={props.name}
          />
        )}

        <Image
          className={styles.background}
          src="./pokemonlogo.svg"
          width={253}
          height={252}
          alt="background-pattern"
        />
        <div>
          <p className={styles.number}>
            #{props.number?.toString().padStart(4, "0")}
          </p>
          <div className={styles.names}>
            <h2 className={styles.name}>{props.name}</h2>
            {/* <Image
              src="./heart.svg"
              width={24}
              height={24}
              alt="favorite-icon"
            /> */}
          </div>
        </div>
        {/* <button onClick={}>Go Back</button> */}
      </div>
      <div className={styles.types}>
        {props.types?.map((type) => (
          <PokemonTypeLarge key={type.type.name} name={type.type.name} />
        ))}
      </div>
      <div className={styles["section-middle"]}>
        <div className={styles["base-stats-chart"]}>
          <h3>Base Stats</h3>
          {props.baseStats && <Chart stats={props.baseStats} />}
        </div>
        <div className={styles.content}>
          <div className={styles.features}>
            <div className={styles["feature"]}>
              <p className={styles["feature-name"]}>Abilities</p>
              <p className={styles["feature-value"]}>
                {abilityText || "No data found"}
              </p>
            </div>
            <div className={styles["feature"]}>
              <p className={styles["feature-name"]}>Egg Groups</p>

              {props.egg_group && (
                <p className={styles["feature-value"]}>
                  {props.egg_group[0].name || "No data found"}
                </p>
              )}
            </div>
            <div className={styles["feature"]}>
              <p className={styles["feature-name"]}>Category</p>
              {props.category && (
                <p className={styles["feature-value"]}>
                  {props.category[7]?.genus || "No data found"}
                </p>
              )}
            </div>
            <div className={styles["feature"]}>
              <p className={styles["feature-name"]}>Base Exp.</p>
              <p className={styles["feature-value"]}>
                {props.base_experience || "No data found"}
              </p>
            </div>
            <div className={styles["feature"]}>
              <p className={styles["feature-name"]}>Gender</p>
              {props.gender_rate !== -1 ? (
                <p className={styles["feature-value"]}>
                  <Image
                    src="./man.svg"
                    width={16}
                    height={16}
                    alt="man-icon"
                  />
                  {"  "} {male}
                  {"  "}
                  <Image
                    src="./woman.svg"
                    width={16}
                    height={16}
                    alt="woman-icon"
                  />
                  {"  "}
                  {female}
                </p>
              ) : (
                <p className={styles["feature-value"]}>No Gender</p>
              )}
            </div>
          </div>
          <div className={styles.measures}>
            <div className={styles.measure}>
              <div className={styles.value}>
                <Image
                  src="./weight.svg"
                  width={24}
                  height={24}
                  alt="weight-icon"
                />
                <span className={styles["measure-value"]}>
                  {weightInKg} kg ({weightInLbs.toFixed(1)} lbs)
                </span>
              </div>
              <p className={styles["measure-name"]}>Weight</p>
            </div>
            <div className={styles.vl}></div>
            <div className={styles.measure}>
              <div className={styles.value}>
                <Image
                  src="./ruler.svg"
                  width={24}
                  height={24}
                  alt="height-icon"
                />
                <span className={styles["measure-value"]}>
                  {heightInMetres} m ({heightInFeet})
                </span>
              </div>
              <p className={styles["measure-name"]}>Height</p>
            </div>
          </div>
        </div>
      </div>
      {props.chain?.evolves_to.length > 0 && (
        <div className={styles["section-evolution"]}>
          <h3 className={styles["evolution-heading"]}>Evolution Chain</h3>
          <div
            style={evolutionColorStyle}
            className={styles["evolution-chain"]}
          >
            <Link href={props.chain?.species.name}>
              {!!pokemonEvolutionDetails && (
                <Image
                  src={
                    pokemonEvolutionDetails?.sprites?.other.home
                      .front_default ||
                    pokemonEvolutionDetails?.sprites?.other["official-artwork"]
                      ?.front_default ||
                    pokemonEvolutionDetails?.sprites?.front_default
                  }
                  height={195}
                  width={195}
                  alt={props.chain?.species.name}
                />
              )}

              <p className={styles["pokemon-name"]}>
                {props.chain?.species.name}
              </p>
            </Link>
            {props.chain?.evolves_to.length > 0 && (
              <EvolutionChain chain={props.chain?.evolves_to[0]} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonCard;
