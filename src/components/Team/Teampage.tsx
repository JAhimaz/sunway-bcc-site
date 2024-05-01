"use client";
import { useTranslations } from "next-intl";
import Texts from "../Atoms/Texts";
import GridHoverBox from "../Home/GridHoverBox/GridHoverBox";
import styles from "./Teampage.module.scss";
import Seperator from "../Molecules/Seperator/Seperator";
import { Members } from "@/utils/Members";
import MemberImage from "./MemberImage/MemberImage";

const Teampage = () => {

  const t = useTranslations("Team")
  const headline = t("title");

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
      <section className={styles.memberGrid}>
      { Members.map((member, index) => {
        return (
          <MemberImage key={index} {...member} />          
        )
      })}
      </section>
    </section>
  )
}

export default Teampage;