import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

type urlProps = {
  url: string;
  params: any;
};

export const fetcherWithParams = ({ url, params }: urlProps) =>
  axios.get(url, { params }).then((res) => res.data);

export default fetcher;
