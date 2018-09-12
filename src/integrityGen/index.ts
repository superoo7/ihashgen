import axios from "axios";
import SHA384 from "crypto-js/sha384";
import Base64 from "crypto-js/enc-base64";

const intergrityGen = (url: string) => {
  return axios.get(url).then(d => Base64.stringify(SHA384(d.data)));
};

export default intergrityGen;
