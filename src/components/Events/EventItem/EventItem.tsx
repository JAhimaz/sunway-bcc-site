"use client";
import { FC } from "react";
import { useTranslations } from "next-intl";
import Texts from "../../Atoms/Texts";
import { EventItem as EventItemProps } from "../EventPage";
import styles from "./EventItem.module.scss";
import Image from "next/image";
import LinkButton from "@/components/Molecules/LinkButton/LinkButton";
import Button from "@/components/Molecules/Buttons/Button";


const EventItem: FC<EventItemProps> = ({ title, description, location, startDate, image, url, pinned }) => {

  const t = useTranslations('Events');

  return (
    <section className={pinned ? styles.eventItemPinned : styles.eventItem }>
      <div className={styles.imageContainer}>
        <Image src={image} alt={title}
        fill
        style={{
          objectFit: "cover",
          borderRadius: "0.25rem"
        }} />
      </div>
      <div className={styles.eventItemDetails}>
        <Texts fontSize="lg" color="var(--text)" weight="bold">{title}</Texts>
        <Texts fontSize="sm" color="var(--text-light)">{location}</Texts>
        <Texts fontSize="sm" className={styles.description}>{description}</Texts>
      </div>
      <div className={styles.rightSect}>
          <Texts fontSize="md" color="var(--text)" weight="bold">
          {new Date(startDate).toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })}
        </Texts>
        <Texts fontSize="sm" color="var(--text-light)">
          {new Date(startDate).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
        </Texts>
       <Button href={url}>
          {t("joinEvent")}
       </Button>
      </div>
    </section>
  )
};

export default EventItem;