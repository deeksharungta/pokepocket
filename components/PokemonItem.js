"use-client";

import styles from "./PokemonItem.module.css";
import Image from "next/image";
import PokemonTypeSmall from "./PokemonTypeSmall";
import getColorByName from "@/utils/colors";
import { useRouter } from "next/navigation";

const PokemonItem = (props) => {
  const router = useRouter();
  const colorStyle = {
    background: getColorByName(props.types[0].type.name),
  };

  return (
    <div
      style={colorStyle}
      className={styles.container}
      onClick={() => {
        router.push(props.name);
      }}
    >
      <div className={styles.pattern}>
        <Image
          src="./Pattern.svg"
          width={100}
          height={100}
          alt="background-pattern"
        />
      </div>
      <div className={styles.top}>
        <div className={styles.right}>
          <p className={styles.number}>
            #{props.number.toString().padStart(4, "0")}
          </p>
          {/* <Image src="./heart.svg" width={20} height={20} alt="favorite-icon" /> */}
        </div>
        <h2 className={styles.name}>{props.name}</h2>
        <div className={styles.types}>
          {props.types.map((type) => (
            <PokemonTypeSmall key={type.type.name} name={type.type.name} />
          ))}
        </div>
      </div>
      <div className={styles.background}>
        <Image
          src="./pokemonlogo.svg"
          width={253}
          height={252}
          alt="background-pattern"
        />
      </div>
      <div className={styles.img}>
        {!!props.image && (
          <Image src={props.image} width={227} height={227} alt={props.name} />
        )}
      </div>
    </div>
  );
};

export default PokemonItem;
