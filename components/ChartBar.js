import React from "react";

import styles from "./ChartBar.module.css";

const ChartBar = (props) => {
  let barFillHeight = "0%";
  barFillHeight = props.value + "%";

  return (
    <div className={styles["chart-bar"]}>
      <div className={styles["chart-bar__label"]}>{props.label}</div>
      <div className={styles["chart-bar__value"]}>{props.value}</div>
      <div className={styles["chart-bar__inner"]}>
        <div
          className={styles["chart-bar__fill"]}
          style={{ width: barFillHeight }}
        ></div>
      </div>
    </div>
  );
};

export default ChartBar;
