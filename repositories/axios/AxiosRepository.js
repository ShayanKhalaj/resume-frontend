import axios from "axios";
import server from "../../configurations/Config.json";
import Cookies from "js-cookie";

export const GET = (url) => {
  return axios.get(`${server.MY_WEBSITE_SERVER_ADDRESS_1}${url}`);
};
export const POST = (url, body) => {
  return axios.post(`${server.MY_WEBSITE_SERVER_ADDRESS_1}${url}`, body, {
    headers: [
      "Content-Type :  application/json",
      `Authorization : ${Cookies.get("token")}`,
    ],
  });
};
export const PUT = (url, body) => {
  return axios.put(`${server.MY_WEBSITE_SERVER_ADDRESS_1}${url}`, body, {
    headers: {
      "Content-Type": "application/json",
      " Authorization": `${Cookies.get("token")}`,
    },
  });
};
export const DELETE = (url) => {
  return axios.delete(`${server.MY_WEBSITE_SERVER_ADDRESS_1}${url}`, {
    headers: {
      "Content-Type": "application/json",
      " Authorization": `${Cookies.get("token")}`,
    },
  });
};


