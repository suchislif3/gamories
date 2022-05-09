import axios from "axios";
import NodeCache from "node-cache";
const myCache = new NodeCache();

const API = axios.create({ baseURL: "https://api.igdb.com/v4" });

const getAccessToken = () =>
  axios.post(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_APP_CLIENT_ID}&client_secret=${process.env.TWITCH_APP_CLIENT_SECRET}&grant_type=client_credentials`
  );

API.interceptors.request.use(
  async (req) => {
    const key = "Access token";
    let accessToken = myCache.get(key);
    if (accessToken == undefined) {
      const { data } = await getAccessToken();
      accessToken = data.access_token;
      const ttl = data.expires_in;
      myCache.set(key, accessToken, [ttl]);
      myCache.on("del", function (key, value) {
        console.log(`${key} '${value}' expired`);
      });
    }
    req.headers = {
      Accept: "application/json",
      "Client-ID": process.env.TWITCH_APP_CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    };
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const searchGameByName = (searchQuery) =>
  API.post("/games", searchQuery);
