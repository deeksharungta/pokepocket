import React from "react";
import styles from "./PokemonTypeLarge.module.css";
import Image from "next/image";
import getColorByName from "@/utils/colors";

const PokemonTypeLarge = (props) => {
  const colorStyle = {
    color: getColorByName(props.name),
    borderColor: getColorByName(props.name),
  };

  return (
    <div style={colorStyle} className={styles.type}>
      <Image
        src={`./${props.name}.svg`}
        width={15}
        height={15}
        alt={props.name}
      />
      <p className={styles["type-name"]}>{props.name}</p>
    </div>
  );
};

export default PokemonTypeLarge;
