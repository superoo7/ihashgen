import axios from "axios";
import SHA384 from "crypto-js/sha384";
import Base64 from "crypto-js/enc-base64";

export type cdnType = "css" | "js";
export type algoType = "sha384";

const intergrityGen = async (url: string, type?: cdnType, algo?: algoType) => {
  // TODO: support more hashing algorithm

  if (!algo) {
    algo = "sha384";
  }

  if (!type) {
    type = url.endsWith("css") ? "css" : url.endsWith("js") ? "js" : undefined;
  }
  if (type === undefined) throw new Error("must specify type for cdn (css/js)");

  const { hash, data } = await axios
    .get(url)
    .then(d => ({ hash: Base64.stringify(SHA384(d.data)), data: d.data }));
  return {
    hash: hash,
    html: template(type, url, hash, algo),
    byte: byteSize(data)
  };
};

export const template = (
  type: cdnType,
  url: string,
  hash: string,
  algo: algoType
) => {
  if (type !== "css" && type !== "js")
    throw new Error("must specify type for cdn (css/js)");

  return type === "css"
    ? `<link rel="stylesheet" href="${url}" integrity="${algo}-${hash}" crossorigin="anonymous">`
    : `<script src="${url}" integrity="${algo}-${hash}" crossorigin="anonymous"></script>`;
};

export const byteSize: (data: string) => number = (data: string) => {
  return Buffer.byteLength(data, "utf8");
};

export default intergrityGen;
