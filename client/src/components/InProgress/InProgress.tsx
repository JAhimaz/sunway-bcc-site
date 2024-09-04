"use client";
import { useTranslations } from "next-intl";
import Texts from "../Atoms/Texts";
import GridHoverBox from "../Home/GridHoverBox/GridHoverBox";
import styles from "./InProgress.module.scss";

const InProgress = () => {

  const t = useTranslations("Developing");

  return (
    <section className={styles.main}>
      <GridHoverBox />
      <Texts color="var(--text-light)" fontSize="sm" weight="bold" className={styles.title}>
        🔨 {t('title')} <Texts color="var(--highlight)" fontSize="sm" weight="bold" className={styles.deco}>{t('title-2')}</Texts> ⚙️
      </Texts>
    </section>
  )
}

export default InProgress;