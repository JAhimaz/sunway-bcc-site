"use client";
import styles from "./SocialBox.module.scss";
import { Socials } from "@/utils/Socials";
import Texts from "../../Atoms/Texts";
import { Icon, IconName } from "@/utils/Icons";
import Link from "next/link";

const SocialBox = () => {
  return (
    <section className={styles.main}>
      { Socials.map((social) => {
        return (
          <Link key={social.id} className={styles.socialBox} href={social.link} target="_blank">
            <div className={styles.fakeBorderLeft} />
            <div className={styles.fakeBorderRight} />
            <div className={styles.fakeBorderTop} />
            <div className={styles.fakeBorderBottom} />
            <Texts fontSize="sm" color="var(--text-light)">
              {social.socialName}
            </Texts>
            <Icon icon={social.id as IconName} className={styles.socialIcon} />
          </Link>
        )
      })}
    </section>
  )
}

export default SocialBox;