"use client"

import Texts from '@/components/Atoms/Texts';
import styles from './EventBadges.module.scss';
import { FC, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Loader from '@/components/Loader/Loader';
import { User } from '@/libs/@server/user/GetUser';
import Select from '@/components/Molecules/Select/Select';
import FetchEvents from '@/libs/events/FetchEvents';
import SetStamps from '@/libs/@server/admin/SetStamps';

type EventBadgesProps = {
  userDetails: User;
}

const EventBadges: FC<EventBadgesProps> = ({ userDetails }) => {

  const [ loading, setLoading ] = useState(true);

  const [ selectedEvent, setSelectedEvent ] = useState<number | undefined>(undefined);
  const [ eventType, setEventType ] = useState<string>("");
  const [ addresses, setAddresses ] = useState<string>("");
  const [ events, setEvents ] = useState<any[]>([]);
  const [ success, setSuccess ] = useState({
    visible: false,
    message: '',
    isError: false
  });

  const { address } = useAccount();

  // Fetch admins
  useEffect(() => {
    if(!address) return;
    setLoading(true)

    // Fetch Events
    FetchEvents().then((events) => {

      setEvents(
        // sort by date ascending
        events.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()).map
        ((event: any) => ({
          id: event.id,
          name: event.title,
          date: event.startDate
        }))
      )

    }).then(() => setLoading(false))

  }, [address, userDetails.key])

  const Submit = () => {
    if(!selectedEvent) {
      setSuccess({
        visible: true,
        message: "No Event selected",
        isError: true
      })
      return;
    }

    if(addresses === "") {
      setSuccess({
        visible: true,
        message: "No Addresses entered",
        isError: true
      })
      return;
    }

    if(!eventType) {
      setSuccess({
        visible: true,
        message: "No Event type selected",
        isError: true
      })
      return;
    }
    
    // Format Addresses and any spaces
    const formattedAddresses = addresses.split("\n").map((address) => address.trim().replace(/\s/g, ""));
    // Remove any duplicates and empty strings
    const uniqueAddresses = formattedAddresses.filter((address, index) => formattedAddresses.indexOf(address) === index && address !== "");

    // Filter out non ethereum addresses
    const invalidAddresses = uniqueAddresses.filter((address) => !address.match(/^0x[a-fA-F0-9]{40}$/));
    
    if(invalidAddresses.length > 0) {
      setSuccess({
        visible: true,
        message: "Invalid Addresses entered",
        isError: true
      })
      return;
    }

    const event = events.find((event) => event.id === selectedEvent);

    const data = {
      addresses: uniqueAddresses,
      eventName: event.name,
      eventType: eventType,
      eventDate: event.date
    }

    SetStamps({
      address: address!,
      key: userDetails.key!,
      ...data
    }).then((result) => {
      if(result.error) {
        setSuccess({
          visible: true,
          message: result.error.message,
          isError: true
        })
      } else {
        setSuccess({
          visible: true,
          message: `Badges sent to ${result.data.updatedCount} users, created ${result.data.createdCount} new users and skipped ${result.data.skippedCount} users`,
          isError: false
        })
      }
    })

    setTimeout(() => {
      setSuccess({
        visible: false,
        message: "",
        isError: false
      })
    }, 5000)

    setSelectedEvent(undefined);
    setEventType("");
    setAddresses("");
  }

  return (
    <section className={styles.container}>
      {loading && <Loader />}
      {events.length === 0 && !loading && <Texts color='var(--text-light)'>No Events Found</Texts>}
      {events.length > 0 && !loading && (
      <>
      { success.visible && <Texts fontSize='xs' color={success.isError ? 'var(--error)' : 'var(--highlight)'}>{success.message}</Texts> }
      <Texts fontSize='sm' color='var(--text-light)'>Select an Event</Texts>
      <Select options={[
        { id: undefined, name: "Select an Event" },
        ...events.map((event) => ({ id: event.id, name: event.name }))
      ]}
      value={selectedEvent ? selectedEvent.toString() : ""}
      onChange={(value) => setSelectedEvent(parseInt(value))}
      width='full'
      />
      <Texts fontSize='sm' color='var(--text-light)'>Select an Event Type</Texts>
      <Select options={[
        { id: "", name: "Select an Event Type" },
        { id: "workshop", name: "Workshop" },
        { id: "major", name: "Major" },
        { id: "talk", name: "Talk" },
        { id: "external", name: "External" },
      ]}
      onChange={(value) => setEventType(value)}
      value={eventType ? eventType : ""}
      width='full'
      />
      <Texts fontSize='sm' color='var(--text-light)'>Enter User Addresses</Texts>
      <textarea className={styles.textarea} placeholder={
        "Enter each address on a seperate line (Example)...\n" +
        "0x1234567890abcdef1234567890abcdef12345678\n" +
        "0x1234567890abcdef1234567890abcdef12345678\n"
      } 
      value={addresses}
      onChange={(e) => setAddresses(e.target.value)}/>
      <button className={styles.addButton} onClick={() => Submit()}>Send Badges</button>
      </>
      )}
    </section>
  )
}

export default EventBadges;