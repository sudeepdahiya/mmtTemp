import data from "./data";

const getAncelleryData = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res(data);
    }, 1000);
  });
};

export default getAncelleryData;
