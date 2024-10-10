import { NextPage } from "next";
import Page from "@/components/Page";
import Jobs from "@/components/Jobs/Jobs";

const JobsPage: NextPage = () => {
  return (
    <Page>
      <Jobs />
    </Page>
  );
}

export default JobsPage;