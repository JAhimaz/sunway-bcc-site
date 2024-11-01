"use client";
import styles from "./Ethos.module.scss";
import Texts from "@/components/Atoms/Texts";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { EthosItems } from "@/utils/Ethos";

const Ethos = () => {
  const [ selectedEthos, setSelectedEthos ] = useState<string>(EthosItems[0].title);
  const t = useTranslations("Ethos");

  return (
    <section className={styles.main}>
      <div className={styles.sidebar}>
        { EthosItems.map((item, index) => {   
          return (
            <div className={ selectedEthos === item.title ? styles.sidebarItemSelected : styles.sidebarItem} key={item.id} onClick={() => {
              setSelectedEthos(item.title);
            }}>
              <Texts color="var(--text-light)" fontSize="xs" weight="bold" className={styles.title}>
                {t(item.title + ".title")}
              </Texts>
              { selectedEthos !== item.title && <div className={styles.sidebarItemInner} />}
              { selectedEthos !== item.title && <div className={styles.sidebarItemInnerSide} />}
            </div>
          )
        })}
      </div>
      <div className={styles.content}>
        <Texts color="var(--text-light)" fontSize="lg" className={styles.title}>
          {t(selectedEthos + ".content")}
        </Texts>
      </div>
    </section>
  )
}

export default Ethos