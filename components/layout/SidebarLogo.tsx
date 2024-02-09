import { useRouter } from "next/router";
import { BsTwitter } from "react-icons/bs";

interface SidebarLogoProps {
  title: string;
}

const SidebarLogo: React.FC<SidebarLogoProps> = ({ title }) => {
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-1 cursor-pointer"
      onClick={() => router.push("/")}
    >
      <div className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10">
        <BsTwitter size={28} color="white" />
      </div>
      <span className="hidden lg:block text-white text-xl capitalize font-extrabold">
        {title}
      </span>
    </div>
  );
};

export default SidebarLogo;
