const colors = [
  { grass: "#5AC178" },
  { water: "#6CBDE4" },
  { flying: "#A6C2F2" },
  { steel: "#58A6AA" },
  { fire: "#FBAE46" },
  { bug: "#AFC836" },
  { ground: "#D29463" },
  { dark: "#9298A4" },
  { ice: "#8CDDD4" },
  { dragon: "#0180C7" },
  { normal: "#A3A49E" },
  { electric: "#FBE273" },
  { poison: "#C261D4" },
  { fairy: "#F3A7E7" },
  { psychic: "#FE9F92" },
  { fighting: "#E74347" },
  { rock: "#D7CD90" },
  { ghost: "#7773D4" },
];

export default function getColorByName(colorName) {
  const colorObj = colors.find((obj) => colorName in obj);
  return colorObj ? colorObj[colorName] : null;
}
