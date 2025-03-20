"use client";

import Link from "next/link";
import { CSSProperties, FC, ReactNode } from "react";
import Texts from "../../Atoms/Texts";
import styles from "./Button.module.scss";

type ButtonProps = {
  href: string;
  children: ReactNode;
  css?: CSSProperties;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ href, children, css, disabled, onClick }) => {

  if(disabled) return (
    <div className={styles.disabled}>
      <Texts color="var(--text)" fontSize="sm">{children}</Texts>
    </div>
  )

  return (
    <Link href={href} target="_blank" onClick={onClick} className={styles.button} style={css}>
      <Texts color="var(--text)" fontSize="sm">{children}</Texts>
    </Link>
  )
}

export default Button;