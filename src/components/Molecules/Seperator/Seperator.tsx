"use client";
import Texts from "@/components/Atoms/Texts";
import styles from "./Seperator.module.scss";
import { FC } from "react";

type SeperatorProps = {
  text?: string;
  textAlign?: "left" | "center" | "right";
}

const Seperator: FC<SeperatorProps> = ({ text, textAlign }) => {
  return (
    <div className={styles.seperator} style={{
      textAlign: textAlign ?? "right",
      padding: "1rem 0",
    }}>
        <Texts color="var(--foreground)" fontSize="xs" weight="bold" style={{
          letterSpacing: "-0.5px"
        }}>
          {text}
        </Texts>
    </div>
  )
}

export default Seperator;