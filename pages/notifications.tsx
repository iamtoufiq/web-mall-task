import Header from "@/components/Header";
import NotificationPanel from "@/components/NotificationPanel";

import useCurrentUser from "@/hooks/useLoggedInUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const Notifications = () => {
  return (
    <>
      <Header showBackArrow label="Notifications" />
      <NotificationPanel />
    </>
  );
};

export default Notifications;
