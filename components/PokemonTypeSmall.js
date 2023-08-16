import React from "react";
import styles from "./PokemonType.module.css";
import Image from "next/image";
import getColorByName from "@/utils/colors";

const PokemonTypeSmall = (props) => {
  const colorStyle = {
    color: getColorByName(props.name),
  };

  return (
    <div style={colorStyle} className={styles.type}>
      <Image
        src={`./${props.name}.svg`}
        width={13}
        height={13}
        alt={props.name}
      />
      <p className={styles["type-name"]}>{props.name}</p>
    </div>
  );
};

export default PokemonTypeSmall;
