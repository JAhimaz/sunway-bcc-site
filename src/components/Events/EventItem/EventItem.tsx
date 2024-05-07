import { FC } from "react";
import { useTranslations } from "next-intl";
import Texts from "../../Atoms/Texts";
import { EventItem as EventItemProps } from "../EventPage";
import styles from "./EventItem.module.scss";
import Image from "next/image";
import LinkButton from "@/components/Molecules/LinkButton/LinkButton";


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
        <Texts fontSize="sm" color="var(--text-light)">
          {/* {new Date(startDate).toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "2-digit" })} */}
          {new Date(startDate).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
        </Texts>
        <Texts fontSize="lg" color="var(--text)" weight="bold">{title}</Texts>
        <Texts fontSize="sm">{description}</Texts>
        <Texts fontSize="sm">{location}</Texts>
      </div>
      <div style={{
        flex: 1,
      }}>
        <LinkButton href={url}>
          {t("eventLink")}
        </LinkButton>
      </div>
    </section>
  )
};

export default EventItem;