"use client";
import { useTranslations } from "next-intl";
import Texts from "../Atoms/Texts";
import GridHoverBox from "../Home/GridHoverBox/GridHoverBox";
import styles from "./Redirect.module.scss";
import { useEffect } from "react";

const Redirect = ({ url }: { url: string }) => {

  const t = useTranslations("Redirect");

  useEffect(() => {
    setTimeout(() => {
      window.location.href = url;
    }, 3000);
  })

  return (
    <section className={styles.main}>
      <GridHoverBox />
      <Texts color="var(--text-light)" fontSize="sm" weight="bold" className={styles.title}>
        {t('title')}
      </Texts>
    </section>
  )
}

export default Redirect;