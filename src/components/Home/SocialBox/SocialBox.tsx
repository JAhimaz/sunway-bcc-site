"use client";
import styles from "./SocialBox.module.scss";
import { Socials } from "@/utils/Socials";
import Texts from "../../Atoms/Texts";
import { Icon, IconName } from "@/utils/Icons";

const SocialBox = () => {
  return (
    <section className={styles.main}>
      { Socials.map((social) => {
        return (
          <div key={social.id} className={styles.socialBox}>
            <div className={styles.fakeBorderLeft} />
            <div className={styles.fakeBorderRight} />
            <div className={styles.fakeBorderTop} />
            <div className={styles.fakeBorderBottom} />
            <div className={styles.pseudoGradient} />
            <Texts fontSize="lg" color="var(--text-light)">
              {social.socialName}
            </Texts>
            <Icon icon={social.id as IconName} className={styles.socialIcon} />
          </div>
        )
      })}
    </section>
  )
}

export default SocialBox;