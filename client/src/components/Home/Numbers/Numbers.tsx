"use client";
import { useTranslations } from "next-intl";
import styles from "./Numbers.module.scss";
import Texts from "@/components/Atoms/Texts";
import { Stats } from "@/utils/Stats";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import FetchStats from "@/libs/stats/FetchStats";

const Numbers = () => {
  const t = useTranslations("Numbers");

  const [statistics, setStatistics] = useState({
    members: 0,
    events: 0,
    partners: 0,
  })

  useEffect(() => {
    if(statistics.members === 0) {
      FetchStats().then((data) => {
        setStatistics({
          members: data[0].value,
          events: data[1].value,
          partners: data[2].value,
        })
      })
    }
  }, [statistics.members])

  return (
    <section className={styles.numbers}>
      <div className={styles.item}>
        <Texts color="var(--highlight)" fontSize="xl" weight="bold" className={styles.text}>
          <CountUp
            start={0}
            end={statistics.members}
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
            end={statistics.events}
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
            end={statistics.partners}
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