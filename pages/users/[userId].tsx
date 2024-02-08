import React from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import useUser from "@/hooks/useUser";

import PostFeed from "@/components/posts/TimelineFeed";
import AboutMeSection from "@/components/users/AboutMeSection";
import UserShowcase from "@/components/users/UserShowcase";

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: fetchedUser, isLoading } = useUser(userId as string);
  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserShowcase userId={userId as string} />
      <AboutMeSection userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  );
};

export default UserView;
