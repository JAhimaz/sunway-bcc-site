"use client";

import Link from "next/link";
import { CSSProperties, FC, ReactNode } from "react";
import Texts from "../../Atoms/Texts";
import { Icon } from "@/utils/Icons";
import styles from "./LinkButton.module.scss";

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  css?: CSSProperties;
}

const LinkButton: FC<LinkButtonProps> = ({ href, children, css }) => {
  return (
    <Link href={href} className={styles.button} style={css}>
      <span className={styles.borderPseudo} />
      <Texts color="var(--text)" fontSize="sm" style={{
        padding: '1rem 0',
        fontWeight: 600,
      }}>{children}</Texts>
      <Icon icon="arrowRight" className={styles.arrow} />
    </Link>
  )
}

export default LinkButton;