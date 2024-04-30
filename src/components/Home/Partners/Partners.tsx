"use client";
import Image from "next/image";
import styles from "./Partners.module.scss";
import partners, { PartnerType } from "@/utils/Partners";

const Partners = () => {

  return (
    <section className={styles.container}>
      <section className={styles.wrapper}>
        <section className={styles.partner}>
          { partners.map((partner: PartnerType) => {
            return (
              <div className={styles.item} key={partner.id}>
                <Image src={`/images/partners/${partner.logo}`} fill alt={`${partner.name}_logo`}/>
              </div>
            )
          })}
        </section>
        <section className={styles.partner}>
          { partners.map((partner: PartnerType) => {
            return (
              <div className={styles.item} key={partner.id}>
                <Image src={`/images/partners/${partner.logo}`} fill alt={`${partner.name}_logo`}/>
              </div>
            )
          })}
        </section>
      </section>
    </section>
  )
}

export default Partners;