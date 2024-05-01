"use client";
import { MemberProp } from "@/utils/Members";
import styles from "./MemberImage.module.scss";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import Image from "next/image";
import Texts from "@/components/Atoms/Texts";
import { Icon } from "@/utils/Icons";

const MemberImage: FC<MemberProp> = ({
  name,
  role,
  image,
  imageAlt
}) => {

  const [isHovered, setIsHovered] = useState(false);

  const t = useTranslations("Roles");

  return (
    <div className={styles.tile} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={styles.gradient} />
      <section className={styles.details}>
        <Texts color="var(--text)" fontSize="md" weight="bold" className={styles.name}>{name}</Texts>
        <Texts color="var(--text-light)" fontSize="xs" italics className={styles.role}>{t(role)}</Texts>
      </section>
      { (image && imageAlt) ? (
        <>
          <Image src={`/images/team/${image}`} fill alt={`${name} user profile`} className={styles.img} loading="eager" />
          { isHovered && <Image src={`/images/team/${imageAlt}`} fill alt={`${name} user profile`} className={styles.imgAlt} loading="eager" /> }
        </>
      ) : (
        <Icon icon="person" className={styles.avatar} />
      )}

    </div>
  )
}

export default MemberImage;