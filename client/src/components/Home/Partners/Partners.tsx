"use client";
import Image from "next/image";
import styles from "./Partners.module.scss";
import { useEffect, useState } from "react";
import FetchPartners, { Partner } from "@/libs/partners/FetchPartners";

const Partners = () => {

  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    if(partners?.length === 0) {
      FetchPartners().then((data) => {
        setPartners(data);
      })
    }
  }, [partners]);

  return (
    <section className={styles.container}>
      <section className={styles.wrapper}>
        <section className={styles.partner}>
          { partners && partners.map((partner: Partner) => {
            return (
              <div className={styles.item} key={partner.id} onClick={
                () => {
                  if (partner.website) {
                    window.open(partner.website, "_blank");
                  }     
                }
              }>
                <Image src={partner.logo} style={{
                  objectFit: "contain",
                  // white shadow
                }} fill alt={`${partner.name}_logo`} loading="eager"/>
              </div>
            )
          })}
        </section>
        <section className={styles.partner}>
          { partners && partners.map((partner: Partner) => {
            return (
              <div className={styles.item} key={partner.id} onClick={
                                () => {
                  if (partner.website) {
                    window.open(partner.website, "_blank");
                  }     
                }
              }>
                <Image src={partner.logo} style={{
                  objectFit: "contain",
                  filter: "drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.05))",
                }} fill alt={`${partner.name}_logo`} loading="eager" />
              </div>
            )
          })}
        </section>
      </section>
    </section>
  )
}

export default Partners;