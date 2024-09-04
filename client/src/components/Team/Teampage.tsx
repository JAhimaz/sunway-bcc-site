"use client";
import { useTranslations } from "next-intl";
import Texts from "../Atoms/Texts";
import GridHoverBox from "../Home/GridHoverBox/GridHoverBox";
import styles from "./Teampage.module.scss";
import Seperator from "../Molecules/Seperator/Seperator";
import { Members } from "@/utils/Members";
import MemberImage from "./MemberImage/MemberImage";
import { useEffect, useState } from "react";
import FetchTeam, { TeamMember } from "@/libs/team/FetchTeam";

const Teampage = () => {

  const t = useTranslations("Team")
  const headline = t("title");

  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FetchTeam().then((team) => {
      setLoading(false);
      setTeam(team);
    });
  }, [])

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
      { loading ? 
      (
        <section style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '2rem'
        }}>
          <div className={styles.loader}></div>
        </section>
      )
      :  
      <section className={styles.memberGrid}>
      { team.map((member, index) => {
        return (
          <MemberImage key={index} {...member} />          
        )
      })}
      </section>
      }
    </section>
  )
}

export default Teampage;