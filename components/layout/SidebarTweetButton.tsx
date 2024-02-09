import { FaFeather } from "react-icons/fa";
import { useRouter } from "next/router";
import useLoginModal from "@/hooks/useLoginModal";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import { useCallback } from "react";

const SidebarTweetButton = () => {
  const { data: currentUser } = useLoggedInUser();
  const router = useRouter();
  const loginModal = useLoginModal();

  const onClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    router.push("/");
  }, [loginModal, router, currentUser]);

  return (
    <div onClick={onClick}>
      {/* Common styling for both mobile and desktop */}
      <div className="mt-6 rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer lg:hidden">
        <FaFeather size={24} color="white" />
      </div>

      {/* Conditional rendering for responsive design */}
      <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer">
        <p className="text-center font-semibold text-white text-[20px]">
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
