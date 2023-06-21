import data from "./data";

const getAncelleryData = async () => {
  try {

  
  const data2 = await fetch("https://supportz.makemytrip.com/api/ancillaryDetails/v3/NF62WJHVV4Q2PDCH5816?region=in&currency=inr&language=eng", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "content-type": "application/json",
      "currency": "inr",
      "emailid": "",
      "language": "eng",
      "logging-trackinfo": "{\"userId\":\"\",\"uniqueId\":\"NF62WJHVV4Q2PDCH5816\",\"uniqueIdType\":\"\",\"source\":\"DESKTOP\",\"loginSource\":\"Desktop\",\"agentId\":\"\",\"clientIp\":\"122.15.80.194, 23.58.93.142, 23.63.110.21, 122.15.80.194\",\"siteDomain\":\"IN\",\"affiliate_id\":\"\"}",
      "mmt-auth": "MAT137d79a10343edb1de1af9d80cfbf197cefa74440e969f3d689aeed315e53344d52af0c7e5a2d2535d79adf5b1e5b38feP",
      "region": "in",
      "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin"
    },
    "method": "GET",
  });
  let json = await data2.json();
  return json;
} catch (e) {
  console.log('errorooope',e)
  return new Promise((res) => {
    setTimeout(() => {
      res(data);
    }, 1000);
  });
}

  
};



export default getAncelleryData;
