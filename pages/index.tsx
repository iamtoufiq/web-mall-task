import Form from "@/components/Form";
import Header from "@/components/Header";
import TimelineFeed from "@/components/posts/TimelineFeed";

export default function Home() {
  return (
    <div>
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      <TimelineFeed />
    </div>
  );
}
