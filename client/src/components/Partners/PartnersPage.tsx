"use client";
import { useTranslations } from "next-intl";
import Texts from "../Atoms/Texts";
import styles from "./PartnersPage.module.scss";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import GridHoverBox from "../Home/GridHoverBox/GridHoverBox";
import Seperator from "../Molecules/Seperator/Seperator";
import FetchPartners, { Partner } from "@/libs/partners/FetchPartners";
import Image from "next/image";

const PartnerPage = () => {

  const t = useTranslations("Partners");
  const headline = t("title");

  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    if(partners?.length === 0) {
      FetchPartners().then((data) => {
        setPartners(data);
      })
    }
  }, [partners]);

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
      {partners?.length === 0 ? (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          marginTop: "2rem"
        }}>
          <Loader />
        </div>
      ) : (
        <section className={styles.partnerGrid}>
          { partners.map((partner, index) => {
            return (
              <PartnerItem partner={partner} key={index} />
            )
          })}
        </section>
      )}
    </section>
  )
}

const PartnerItem = ({ partner }: { partner: Partner }) => {
  return (
    <div className={styles.partnerItem} onClick={() => window.open(partner.website, "_blank")}>
      <div className={styles.partnerItemImage}>
        <Image src={partner.logo} alt={partner.name} fill style={{ objectFit: "contain" }} />
      </div>
      <div className={styles.partnerItemText}>
        <Texts color="var(--text)" fontSize="xs" className={styles.partnerItemName}>
          {partner.name}
        </Texts>
      </div>
    </div>
  )
}

export default PartnerPage;