"use client"

import { FC } from "react";
import styles from "./Stamps.module.scss";
import Texts from "@/components/Atoms/Texts";
// import Image from "next/image";
import { StampsType } from "./types";
import { Icon } from "@/utils/Icons";

// maximum of 10 stamps

const Stamps: FC<StampsType> = ({ stamps }) => {
  return (
    <section className={styles.stampFlexGrid}>
      {stamps.map((stamp) => {
        return (
          <section key={stamp.id} className={styles.stampSuccess}>
            <Icon icon="check" style={{
              height: "2rem",
              width: "2rem",
            }} />
          </section>
        )
      })}
      {/* fill out the remaining areas */}
      {Array(6 - stamps.length).fill(0).map((_, index) => {
        return (
          <section key={index} className={styles.stamp}>
            <Texts fontSize="sm">{stamps.length + index + 1}</Texts>
          </section>
        )
      })}
    </section>
  )
}

export default Stamps;