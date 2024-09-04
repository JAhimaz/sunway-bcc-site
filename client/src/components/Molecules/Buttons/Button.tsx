"use client";

import Link from "next/link";
import { CSSProperties, FC, ReactNode } from "react";
import Texts from "../../Atoms/Texts";
import { Icon } from "@/utils/Icons";
import styles from "./Button.module.scss";

type ButtonProps = {
  href: string;
  children: ReactNode;
  css?: CSSProperties;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ href, children, css, disabled }) => {

  if(disabled) return (
    <div className={styles.disabled}>
      <Texts color="var(--text)" fontSize="sm">{children}</Texts>
    </div>
  )

  return (
    <Link href={href} target="_blank" className={styles.button} style={css}>
      <Texts color="var(--text)" fontSize="sm">{children}</Texts>
    </Link>
  )
}

export default Button;