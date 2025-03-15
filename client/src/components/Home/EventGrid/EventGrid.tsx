"use client";
import { EventItem } from "@/components/Events/EventPage";
import styles from "./EventGrid.module.scss";
import { useTranslations } from 'next-intl';
import { useEffect, useState } from "react";
import FetchEvents from "@/libs/events/FetchEvents";
import EventGridItem from "./EventGridItem/EventGridItem";
import LinkButton from "@/components/Molecules/LinkButton/LinkButton";

// type EventItem = {
//     id: string;
//     title: string;
//     description: string;
//     location: string;
//     startDate: string;
//     endDate?: string;
//     image: string;
//     url: string;
//     pinned?: boolean;
//     discount_code?: string;
//     discount_amount?: string;
//     discount_offer?: string;
// }

const EventGrid = () => {
  const t = useTranslations("Events");

  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    FetchEvents().then((events) => {
      setEvents(events);
    });
  }, [])

  const filteredEvents = events.sort((a, b) => {
    if (a.pinned && !b.pinned) {
      return -1;
    } else if (!a.pinned && b.pinned) {
      return 1;
    } else {
      return a.startDate > b.startDate ? 1 : -1;
    }
  });

  const upcomingEvents = filteredEvents.filter(event => 
          // check if the event has an end date, if it does, check if the end date is after the current date
          event.endDate ? new Date(event.endDate) > new Date() :
          new Date(event.startDate) > new Date()
        ).slice(0,5);

  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        {upcomingEvents.map((event, index) => {
          return (
            <div key={index} className={styles.item} style={{
              animationDelay: `${index * 0.1}s`
            }}>
              <EventGridItem event={event} />
            </div>
          )
        })}

        {/* fill the remaining with empty */}
        {upcomingEvents.length < 5 && Array.from({ length: 5 - upcomingEvents.length }).map((_, index) => {
          return (
            <div key={index} className={styles.item} style={{
              animationDelay: `${(upcomingEvents.length + index) * 0.1}s`
            }}>
              <div className={styles.empty} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default EventGrid;