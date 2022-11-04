import fetcher from "../utils/fetcher";
import { fetcherWithParams } from "../utils/fetcher";
import useSWR from "swr";

const useSpaces = (page: number, isActiveOnly: boolean) => {
  const params: any = {
    page,
    isPrivate: false,
    sortBy: "userCount:desc",
  };

  if (isActiveOnly) {
    params.isActive = true;
  }

  const { data, error } = useSWR(
    { url: "/v1/spaces", params },
    fetcherWithParams
  );

  return {
    spaces: data?.results,
    totalPages: data?.totalPages,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useSpaces;
