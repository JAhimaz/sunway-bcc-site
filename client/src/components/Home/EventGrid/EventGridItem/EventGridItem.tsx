"use client"
import Texts from "@/components/Atoms/Texts";
import styles from "./EventGridItem.module.scss";
import { EventItem } from "@/components/Events/EventPage";
import { FC } from "react";

type EventGridItemProps = {
  event: EventItem;
}

const EventGridItem: FC<EventGridItemProps> = ({ event }) => {

  const { title, startDate, endDate, url } = event;

  return (
    <div className={styles.container} style={{
        backgroundImage: `url(${event.image})`,
        cursor: url ? "pointer" : "default"
      }}
      
      onClick={() => {
        if (url) {
          window.open(url, "_blank");
        }
      }}
      >
      <div className={styles.titlePanel}>
          <Texts fontSize="lg" color="var(--text)" weight="bold" >{event.title}</Texts> 
          <Texts fontSize="sm" color="var(--text)" >
          {new Date(startDate).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}
          {endDate ? " - " + new Date(endDate).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }) : ""}
          {", "}{new Date(startDate).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
          </Texts>
      </div>
      <div className={styles.background} />
    </div>
  )
}

export default EventGridItem; 