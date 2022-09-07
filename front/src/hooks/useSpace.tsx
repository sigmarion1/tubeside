import fetcher from "../utils/fetcher";
import useSWR, { useSWRConfig } from "swr";

const useSpace = (id: string) => {
  const url = `/v1/spaces/${id}`;
  const { data, error } = useSWR(url, fetcher);
  const { mutate } = useSWRConfig();

  return {
    space: data,
    isLoading: !error && !data,
    isError: error,
    mutate: () => mutate(url),
  };
};

export default useSpace;
