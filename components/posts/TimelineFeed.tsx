import usePosts from "@/hooks/usePosts";

import ContentCard from "./ContentCard";

interface TimelineFeedProps {
  userId?: string;
}

const TimelineFeed: React.FC<TimelineFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <ContentCard userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};

export default TimelineFeed;
