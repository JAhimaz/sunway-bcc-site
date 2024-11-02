import { NextPage } from "next";
import Page from "@/components/Page";
import AdminPage from "@/components/Admin/AdminPage";

const Admin: NextPage = () => {
  return (
    <Page>
      <AdminPage />
    </Page>
  );
}

export default Admin;