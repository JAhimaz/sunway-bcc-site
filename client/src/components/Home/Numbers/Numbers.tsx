"use client";
import { useTranslations } from "next-intl";
import styles from "./Numbers.module.scss";
import Texts from "@/components/Atoms/Texts";
import { Stats } from "@/utils/Stats";
import CountUp from "react-countup";

const Numbers = () => {
  const t = useTranslations("Numbers");

  return (
    <section className={styles.numbers}>
      <div className={styles.item}>
        <Texts color="var(--highlight)" fontSize="xl" weight="bold" className={styles.text}>
          <CountUp
            start={0}
            end={Stats.members}
            duration={2.75}
            separator=","
            suffix="+"
            className={styles.countup}
          />
        </Texts>
        <Texts color="var(--text-light)" fontSize="xs" className={styles.text}>
          {t("members")}
        </Texts>
      </div>
      <div className={styles.item}>
        <Texts color="var(--highlight)" fontSize="xl" weight="bold" className={styles.text}>
          <CountUp
            start={0}
            end={Stats.events}
            duration={2.75}
            separator=","
            suffix="+"
            className={styles.countup}
          />
        </Texts>
        <Texts color="var(--text-light)" fontSize="xs" className={styles.text}>
          {t("events")}
        </Texts>
      </div>
      <div className={styles.item}>
        <Texts color="var(--highlight)" fontSize="xl" weight="bold" className={styles.text}>
          <CountUp
            start={0}
            end={Stats.cohost}
            duration={2.75}
            separator=","
            suffix="+"
            className={styles.countup}
          />
        </Texts>
        <Texts color="var(--text-light)" fontSize="xs" className={styles.text}>
          {t("cohost")}
        </Texts>
      </div>
      <div className={styles.item}>
        <Texts color="var(--highlight)" fontSize="xl" weight="bold" className={styles.text}>
          {t("estabDate")}
        </Texts>
        <Texts color="var(--text-light)" fontSize="xs" className={styles.text}>
          {t("established")}
        </Texts>
      </div>
    </section>
  );
}

export default Numbers;