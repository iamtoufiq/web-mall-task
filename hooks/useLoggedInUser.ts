import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useLoggedInUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useLoggedInUser;
