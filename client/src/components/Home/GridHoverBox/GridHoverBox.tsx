"use client";
import styles from "./GridHoverBox.module.scss";

const GridHoverBox = () => {
  // the grid hover box will be a grid layout with a full width size of 8 columns and 4 rows, each grid box will by random have svg of either 5 vertical lines in a row or a circle split into 4 parts
  // on hover of any svg it will change color and hovering over the box will change the border color of the box, there is no background color for the box only border color

  return (
    <section className={styles.container}>
      <section className={styles.featheredEdge} />
      <section className={styles.grid}>
        {Array(64).fill(0).map((_, index) => {
          return (
            <div key={index} className={styles.box}>
              <div className={styles.lineContainer}>
              {Array(10).fill(0).map((_, index) => {
                return (
                    <span className={styles.line} key={index}>
                      <span className={styles.pseudoLine} />
                    </span>
                );
              })}
              </div>
            </div>
          );
        })}
      </section>
    </section>
  )
}

export default GridHoverBox;