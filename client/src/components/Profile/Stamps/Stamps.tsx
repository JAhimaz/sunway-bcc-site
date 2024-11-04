"use client"

import { FC } from "react";
import styles from "./Stamps.module.scss";
import Texts from "@/components/Atoms/Texts";
// import Image from "next/image";
import { StampsType } from "./types";
import { Icon, IconName } from "@/utils/Icons";

// maximum of 10 stamps

const Stamps: FC<StampsType> = ({ stamps }) => {
  
  return (
    <section className={styles.stampFlexGrid}>
      {stamps.map((stamp) => {
        return (
          <div key={stamp.id} className={styles.stampSuccess} title={stamp.eventName}>
            <Icon icon={GetStampType(stamp.eventType)} style={{
              height: "3rem",
              width: "3rem",
            }} />
          </div>
        )
      })}
      {/* fill out the remaining areas */}
      {Array(6 - stamps.length).fill(0).map((_, index) => {
        return (
          <div key={index} className={styles.stamp}>
            <Texts fontSize="sm">{stamps.length + index + 1}</Texts>
          </div>
        )
      })}
    </section>
  )
}

const GetStampType = (eventType: string): IconName => {
  switch (eventType) {
    case "major":
      return "major";
    case "workshop":
      return "workshop";
    case "talk":
      return "talk";
    case "external":
      return "external";
    default:
      return "external";
  }
}


export default Stamps;