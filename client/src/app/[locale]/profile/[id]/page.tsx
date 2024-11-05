import Page from "@/components/Page";
import CommunityProfile from "@/components/Profile/CommunityProfile";

const CommunityProfilePage = ({ params }: { params: { id: string } }) => {

  const { id } = params;

  return (
    <Page>
      <CommunityProfile accountId={id} />
    </Page>
  );
}

export default CommunityProfilePage;