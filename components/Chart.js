import ChartBar from "./ChartBar";
import styles from "./Chart.module.css";

const Chart = (props) => {
  const dataPoints = [
    { label: "HP", value: props.stats[0].base_stat },
    { label: "Attack", value: props.stats[1].base_stat },
    { label: "Defense", value: props.stats[2].base_stat },
    { label: "Sp. Atk", value: props.stats[3].base_stat },
    { label: "Sp. Def", value: props.stats[4].base_stat },
    { label: "Speed", value: props.stats[5].base_stat },
  ];

  return (
    <div className={styles.chart}>
      {dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
