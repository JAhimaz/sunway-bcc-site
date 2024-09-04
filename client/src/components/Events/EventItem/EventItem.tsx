"use client";
import { FC } from "react";
import { useTranslations } from "next-intl";
import Texts from "../../Atoms/Texts";
import { EventItem as EventItemProps } from "../EventPage";
import styles from "./EventItem.module.scss";
import Image from "next/image";
import LinkButton from "@/components/Molecules/LinkButton/LinkButton";
import Button from "@/components/Molecules/Buttons/Button";
import { CopyToClipBoard } from "@/libs/CopyToClipboard";


const EventItem: FC<EventItemProps & {
  past?: boolean
}> = ({ title, description, location, startDate, endDate, image, url, pinned, past = false, discount_code, discount_amount, discount_offer }) => {

  console.log(discount_code, discount_amount, discount_offer)

  const t = useTranslations('Events');

  return (
    <section className={pinned ? styles.eventItemPinned : styles.eventItem } style={{
      opacity: past ? '0.5' : 1
    }}>
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
        { discount_code &&
        <Texts fontSize="sm" color="var(--text)" className={styles.discount}>
          {t("useCode")}<Texts fontSize="sm" color="var(--highlight)" weight="bold" style={{
            cursor: "pointer",
            userSelect: "all"
          }} onClick={() => CopyToClipBoard(discount_code)}>{discount_code}</Texts>{t("for")}
          <Texts fontSize="sm" color="var(--highlight)" weight="bold">{discount_amount}</Texts>{discount_amount && t("off")}
          {discount_offer && (
            <Texts fontSize="sm" color="var(--text)">{t("on")}{discount_offer}</Texts>
          )}
        </Texts>
        }
      </div>
      <div className={styles.rightSect}>
          <Texts fontSize="md" color="var(--text)" weight="bold" >
          {new Date(startDate).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}
          {endDate ? " - " + new Date(endDate).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }) : ""}
          </Texts>
        <Texts fontSize="sm" color="var(--text-light)">
          {new Date(startDate).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
        </Texts>
        <Button href={url} disabled={url ? false : true} css={{}}>
            {!past && url ? t("joinEvent") :
            !url ? t("eventDisabled")
            : t("eventDetails")}
        </Button>
      </div>
    </section>
  )
};

export default EventItem;