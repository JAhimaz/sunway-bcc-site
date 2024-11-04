export type Stamp = {
  id: number;
  eventName: string;
  eventType: "workshop" | "talk" | "external" | "major";
  date: string;
}

export type StampsType = {
  stamps: Stamp[]
}

export const GetEventType = (type: "workshop" | "talk" | "external" | "major") => {
  switch(type) {
    case "workshop":
      return "Workshop";
    case "talk":
      return "Talk";
    case "external":
      return "External";
    case "major":
      return "Major Event";
    default:
      return "Unknown";
  }
}