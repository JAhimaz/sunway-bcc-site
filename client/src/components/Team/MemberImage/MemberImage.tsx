"use client";
import styles from "./MemberImage.module.scss";
import { useTranslations } from "next-intl";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Texts from "@/components/Atoms/Texts";
import { Icon } from "@/utils/Icons";
import { TeamMember } from "@/libs/team/FetchTeam";

const MemberImage: FC<TeamMember> = ({
  id,
  fullName,
  position,
  image,
  imageAlt
}) => {

  const [isHovered, setIsHovered] = useState(false);

  const t = useTranslations("Roles");

  return (
    <div className={styles.tile} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={styles.gradient} />
      <section className={styles.details}>
        <Texts color="var(--text)" fontSize="md" weight="bold" className={styles.name}>{fullName}</Texts>
        <Texts color="var(--text-light)" fontSize="xs" italics className={styles.role}>{t(position)}</Texts>
      </section>
      <div className={styles.desktopImg}>
        { (image && imageAlt) ? (
          <>
            <Image src={`${image}`} fill alt={`${fullName} user profile`} className={styles.img} loading="eager" />
            { isHovered && <Image src={`${imageAlt}`} fill alt={`${fullName} user profile`} className={styles.imgAlt} loading="eager" /> }
          </>
        ) : (
          <Icon icon="person" className={styles.avatar} />
        )}
      </div>
      <div className={styles.mobileImg}>
        { (image && imageAlt) ? (
          <Image src={`${imageAlt}`} fill alt={`${fullName} user profile`} className={styles.imgAlt} loading="eager" />
        ) : (
          <Icon icon="person" className={styles.avatar} />
        )}
      </div>
    </div>
  )
}

export default MemberImage;