"use client";
import { useTranslations } from "next-intl";
import Texts from "../Atoms/Texts";
import GridHoverBox from "../Home/GridHoverBox/GridHoverBox";
import styles from "./Jobs.module.scss";
import Seperator from "../Molecules/Seperator/Seperator";

const Jobs = () => {

  const t = useTranslations("Jobs")
  const headline = t("title");

  // const [team, setTeam] = useState<TeamMember[]>([]);
  // const [loading, setLoading] = useState(true);

  return (
    <section className={styles.main}>
      <GridHoverBox />
      <Texts color="var(--text-light)" fontSize="xs" className={styles.subheader}>
        &#47;&#47;&nbsp;&nbsp;<Texts color="var(--text)" fontSize="xs" className={styles.underlineHover}>{t("headline-1")}</Texts>{t("headline-2")}
      </Texts>
      <span className={styles.headline}>
        {headline.split("").map((char, index) => {
          return (
            <Texts key={index} color="var(--text)" fontSize="headline" className={styles.headlineChar} style={{
              animationDelay: `${index * 0.075}s`
            }}>
              {char}
            </Texts>
          )
        })}
      </span>
      <Seperator />

      <section className={styles.jobItemGrid}>
        <Texts color="var(--foreground)" fontSize="md" className={styles.subheader}>
          Currently in development. Thank you for your patience.
        </Texts>
      </section>

    </section>  
  )
}

export default Jobs;