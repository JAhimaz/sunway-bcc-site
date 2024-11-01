"use client";
import { FC } from "react"
import styles from "./Select.module.scss"
import Texts from "@/components/Atoms/Texts"

type SelectProps = {
  options: {
    id: string,
    name: string,
  }[],
  value: string,
  onChange: (value: string) => void,
  width?: "full" | "fit"
}

const Select: FC<SelectProps> = ({ options, value, onChange, width }) => {

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={styles.select} style={{
      width: width === "full" ? "100%" : "fit-content",
    }}>
      { options.map((option) => (
        <option key={option.id} value={option.id} className={styles.option}>
          <Texts fontSize="lg">{option.name}</Texts>
        </option>
      )) }
    </select>
  )
}

export default Select;