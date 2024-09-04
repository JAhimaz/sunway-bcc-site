import { NextPage } from "next";
import Page from "@/components/Page";
import InProgress from "@/components/InProgress/InProgress";
import EventPage from "@/components/Events/EventPage";

const Events: NextPage = () => {
  return (
    <Page>
      <EventPage />
    </Page>
  );
}

export default Events;