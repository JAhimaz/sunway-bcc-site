"use client";
import { useTranslations } from "next-intl";
import Texts from "../Atoms/Texts";
import GridHoverBox from "../Home/GridHoverBox/GridHoverBox";
import styles from "./Store.module.scss";
import Seperator from "../Molecules/Seperator/Seperator";
import StoreItem from "./StoreItem/StoreItem";
// import StoreItem from "./StoreItem/StoreItem";

const Store = () => {

  const t = useTranslations("Store")
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
      
      {/* Items */}
      <section className={styles.layout}>
        <Texts color="var(--foreground)" fontSize="md" className={styles.storeItemGridHeader}>Coming Real Soon...</Texts>
      <section className={styles.storeItemGrid}>

      </section>
      </section>

    </section>  
  )
}

export default Store;