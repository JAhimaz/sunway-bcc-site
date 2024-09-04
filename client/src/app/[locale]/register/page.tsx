import { NextPage } from "next";
import Page from "@/components/Page";
import Redirect from "@/components/Redirect/Redirect";

const Register: NextPage = () => {
  return (
    <Page>
      <Redirect url={"https://forms.gle/tJ7z42UgM2Qn2nUbA"} />
    </Page>
  );
}

export default Register;