"use client"

import { FC } from "react";
import styles from "./Stamps.module.scss";
import Texts from "@/components/Atoms/Texts";
import Image from "next/image";
import { StampsType } from "./types";

// maximum of 10 stamps

const Stamps: FC<StampsType> = ({ stamps }) => {
  return (
    <section className={styles.stampFlexGrid}>
      {stamps.map((stamp) => {
        return (
          <section key={stamp.id} className={styles.stamp}>
            <Texts fontSize="sm" color="var(--text)">Attended</Texts>
            <Texts fontSize="sm" color="var(--text)">{stamp.date}</Texts>
          </section>
        )
      })}
      {/* fill out the remaining areas */}
      {Array(10 - stamps.length).fill(0).map((_, index) => {
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