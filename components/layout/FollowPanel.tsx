import useUsers from "@/hooks/useUsers";
import Avatar from "../Avatar";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";

const FollowPanel = () => {
  const { data: users = [] } = useUsers();
  const router = useRouter();

  const handleUserClick = (userId: string) => {
    router.push(`/users/${userId}`);
  };

  return users.length > 0 ? (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => (
            <div
              key={user.id}
              className="flex flex-row gap-4 cursor-pointer"
              onClick={() => handleUserClick(user.id)}
            >
              <Avatar userId={user.id} key={user.id} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

export default FollowPanel;
