"use client";
import { useTranslations } from "next-intl";
import Texts from "../Atoms/Texts";
import GridHoverBox from "../Home/GridHoverBox/GridHoverBox";
import styles from "./EventPage.module.scss";
import EventItem from "./EventItem/EventItem";
import Seperator from "@/components/Molecules/Seperator/Seperator";
import { useEffect, useState } from "react";
import FetchEvents from "@/libs/events/FetchEvents";

// Event Template
// https://calendar.google.com/calendar/u/0/r/eventedit?dates=20240520T101500/20240520T174500&ctz=Asia/Kuala_Lumpur&text=TestName&location=Thisisatest+location&details=TestDescription

export type EventItem = {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate?: string;
  image: string;
  url: string;
  pinned?: boolean;
  discount_code?: string;
  discount_amount?: string;
  discount_offer?: string;
}

const EventPage = () => {

  const [events, setEvents] = useState<EventItem[]>([]);

  const t = useTranslations("Events");
  const headline = t("title");

  useEffect(() => {
    FetchEvents().then((events) => {
      setEvents(events);
    });
  }, [])

  // filter the events by putting pinned events first by date, followed by the rest of the events by date
  const filteredEvents = events.sort((a, b) => {
    if (a.pinned && !b.pinned) {
      return -1;
    } else if (!a.pinned && b.pinned) {
      return 1;
    } else {
      return a.startDate > b.startDate ? 1 : -1;
    }
  });

  return (
    <section className={styles.main}>
      <GridHoverBox />
            <Texts color="var(--text-light)" fontSize="xs" className={styles.subheader}>
        &#47;&#47;&nbsp;&nbsp;<Texts color="var(--text)" fontSize="xs" className={styles.underlineHover}>{t("headline-1")}</Texts>{t("headline-2")}
      </Texts>
      <span className={styles.headline}>
        {headline.split("").map((char, index) => {
          return (
            <Texts key={index} color="var(--text)" fontSize="headline" className={styles.headlineChar} style={{
              animationDelay: `${index * 0.075}s`
            }}>
              {char}
            </Texts>
          )
        })}
      </span>
      <Seperator />
      <div className={styles.eventsArea}>
        { events.length === 0 ? 
          <Texts className={styles.contText} style={{
            position: "relative"
          }}>
            {t("loading")}
          </Texts> : 
        (<>
        <section className={styles.eventsCont}>
          <Texts className={styles.contText}>
            {t("upcoming")}
          </Texts>
          {
            // filter events that are after the current date
            filteredEvents.filter(event => 
              // check if the event has an end date, if it does, check if the end date is after the current date
              event.endDate ? new Date(event.endDate) > new Date() :
              new Date(event.startDate) > new Date()
            ).map(event => {
              return (
                <EventItem key={event.id} {...event} />
              )
            })
          }
        </section>
        { filteredEvents.filter(event => new Date(event.startDate) < new Date()).length > 0 &&
        <section className={styles.eventsCont}>
          <Texts className={styles.contText}>
            {t("pastEvents")}
          </Texts>
          {
            // filter events that are before the current date
            filteredEvents.filter(event => 
              // check if the event has an end date, if it does, check if the end date is before the current date
              event.endDate ? new Date(event.endDate) < new Date() :
              new Date(event.startDate) < new Date()
            ).reverse().map(event => {
              return (
                <EventItem key={event.id} {...event} past />
              )
            })
          }
        </section>}
        </>)}
      </div>
    </section>
  )
}

export default EventPage;