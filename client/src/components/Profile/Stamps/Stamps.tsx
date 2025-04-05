"use client"

import { FC, useState } from "react";
import styles from "./Stamps.module.scss";
import Texts from "@/components/Atoms/Texts";
// import Image from "next/image";
import { StampsType, Stamp } from "./types";
import { Icon, IconName } from "@/utils/Icons";

// maximum of 10 stamps

const Stamps: FC<StampsType> = ({ stamps }) => {

  const [ showStampDetails, setShowStampDetails ] = useState<{
    show: boolean,
    stamp: Stamp | undefined,
  }>({
    show: false,
    stamp: undefined,
  });

  return (
    <section className={styles.stampFlexGrid}>
      { (showStampDetails.show && showStampDetails.stamp) &&
        <div className={styles.overlay}>
          <div className={styles.stampDetails}>
            <Texts fontSize="md" weight="bold">{showStampDetails.stamp.name}</Texts>
            {/* capitalise the first letter of the eventType */}
            <Texts fontSize="xs" style={{
              marginTop: 'auto',
            }}>{showStampDetails.stamp.eventType.charAt(0).toUpperCase() + showStampDetails.stamp.eventType.slice(1)}</Texts>
            {/* date in format of DD/MM/YY */}
            <Texts fontSize="xs" color="var(--text-light)">{
              new Date(showStampDetails.stamp.date).toLocaleDateString()
            }</Texts>
          </div>
          <div className={styles.close} onClick={() => setShowStampDetails({show: false, stamp: undefined})}>
            <Icon icon="close" style={{
              height: "2rem",
              width: "2rem",
              color: "var(--error)",
            }}/>
          </div>
        </div>
      }
      {stamps.filter(
        // sort by date with the latest date first 
        (stamp) => stamp.date !== undefined && stamp.date !== null
      ).sort((a, b) => {
        if (a.date === undefined || a.date === null) return -1;
        if (b.date === undefined || b.date === null) return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      ).slice(0, 6).map((stamp, index) =>
          <div key={stamp.name + "-" + index} className={styles.stampSuccess} title={stamp.name}
              onClick={() => setShowStampDetails({show: true, stamp: stamp})}
          >
              <Icon icon={GetStampType(stamp.eventType)} style={{
                  height: "3rem",
                  width: "3rem",
              }} />
          </div>
      )}

      {/* fill out the remaining areas */}
      
      {(stamps.length < 6) && Array(6 - stamps.length).fill(0).map((_, index) => 
          <div key={`placeholder-${stamps.length + index}`} className={styles.stamp}>
              <Texts fontSize="sm">{stamps.length + index + 1}</Texts>
          </div>
      )}

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