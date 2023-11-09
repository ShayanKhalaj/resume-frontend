import axios, * as others from 'axios';
import Server from "../../configurations/Config.json";
import Cookies from "js-cookie";


export const GET =  (url) => {
  return axios.get(`${Server.MY_WEBSITE_SERVER_ADDRESS_1}${url}`);
};

export const POST = (url, body) => {
  return axios.post(`${Server.MY_WEBSITE_SERVER_ADDRESS_1}${url}`, body, {
    headers: [
      "Content-Type: application/json",
      `Authorization : ${Cookies.get("token")}`,
    ],
  });
};

export const DELETE= (url)=>{
    return axios.delete(`${Server.MY_WEBSITE_SERVER_ADDRESS_1}${url}`,{
        headers:[
            "Content-Type: application/json",
            `Authorization: ${Cookies.get('token')}`
        ]
    })
}

export const PUT = (url,body)=>{
    return axios.put(`${Server.MY_WEBSITE_SERVER_ADDRESS_1}${url}`,body,{
      headers: [
        "Content-Type: application/json",
        `Authorization : ${Cookies.get("token")}`,
      ],
    })
}
