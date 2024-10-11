export type Stamp = {
  id: number;
  eventType: EventType;
  date: string;
}

export type StampsType = {
  stamps: Stamp[]
}

// a type, but for events, where 1 is Workshop, 2 is Talk, 3 is Networking
const EventType = {
  1: "Workshop",
  2: "Talk",
  3: "Networking",
  4: "External"
}

type EventType = typeof EventType;