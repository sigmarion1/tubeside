import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

type urlProps = {
  url: string;
  params: any;
};

export const youtubeIdParser = (url: string) => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};

// export default fetcher;
