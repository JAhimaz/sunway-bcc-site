"use client";
import { useTranslations } from "next-intl";
import Texts from "../Atoms/Texts";
import GridHoverBox from "../Home/GridHoverBox/GridHoverBox";
import styles from "./EventPage.module.scss";
import EventItem from "./EventItem/EventItem";
import Seperator from "@/components/Molecules/Seperator/Seperator";

// Event Template
// https://calendar.google.com/calendar/u/0/r/eventedit?dates=20240520T101500/20240520T174500&ctz=Asia/Kuala_Lumpur&text=TestName&location=Thisisatest+location&details=TestDescription

export type EventItem = {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  image: string;
  url: string;
  pinned?: boolean;
}

const testEventData: EventItem[] = [
  {
    id: "1",
    title: "Test Event 1",
    description: "This is a test event description",
    location: "This is a test location",
    startDate: "2024-05-20T10:15:00",
    image: "https://via.placeholder.com/200",
    url: "htts://www.google.com",
    pinned: true
  },
  {
    id: "2",
    title: "Test Event 2",
    description: "This is a test event description",
    location: "This is a test location",
    startDate: "2024-05-20T10:15:00",
    image: "https://via.placeholder.com/200",
    url: "htts://www.google.com",
    pinned: false
  },
  {
    id: "3",
    title: "Test Event 3",
    description: "This is a test event description",
    location: "This is a test location",
    startDate: "2024-05-20T10:15:00",
    image: "https://via.placeholder.com/200",
    url: "htts://www.google.com",
    pinned: false
  },
  {
    id: "4",
    title: "Test Event 4",
    description: "This is a test event description",
    location: "This is a test location",
    startDate: "2023-05-01T10:15:00",
    image: "https://via.placeholder.com/200",
    url: "htts://www.google.com",
    pinned: false
  }
]

const EventPage = () => {

  const t = useTranslations("Events");
  const headline = t("title");

  // filter the events by putting pinned events first by date, followed by the rest of the events by date
  const filteredEvents = testEventData.sort((a, b) => {
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
        <section className={styles.eventsCont}>
          <Texts className={styles.contText}>
            UPCOMING
          </Texts>
          {
            // filter events that are after the current date
            filteredEvents.filter(event => new Date(event.startDate) > new Date()).map(event => {
              return (
                <EventItem key={event.id} {...event} />
              )
            })
          }
        </section>
        <section className={styles.eventsCont}>
          <Texts className={styles.contText}>
            PAST EVENTS
          </Texts>
          {
            // filter events that are before the current date
            filteredEvents.filter(event => new Date(event.startDate) < new Date()).map(event => {
              return (
                <EventItem key={event.id} {...event} />
              )
            })
          }
        </section>
      </div>
    </section>
  )
}

export default EventPage;