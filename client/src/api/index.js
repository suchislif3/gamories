import axios from "axios";
import store from "../store/store";
import { logout } from "../actions/authAction";
import { openSnackBar } from "../actions/feedbackAction";

const { dispatch } = store;

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

API.interceptors.request.use(
  (req) => {
    if (localStorage.getItem("profile")) {
      req.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  },
  (err) => {
    dispatch(openSnackBar("Something went wrong. Please try again later."));
    return Promise.reject(err);
  }
);

API.interceptors.response.use(
  (res) => {
    if (res?.data?.message) dispatch(openSnackBar(res.data.message));
    return res;
  },
  (err) => {
    if (
      err?.response?.status === (400 || 404) &&
      err?.response?.data?.message
    ) {
      dispatch(openSnackBar(err.response.data.message));
    } else if (err?.response?.status === 401) {
      dispatch(logout());
      dispatch(
        openSnackBar(
          `${
            err?.response?.data?.message === "jwt expired"
              ? "Token expired. "
              : ""
          }Please sign in.`
        )
      );
    } else {
      dispatch(openSnackBar("Something went wrong. Please try again later."));
    }
    return Promise.reject(err);
  }
);

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (startId) =>
  API.get(`/posts${startId ? "?startId=" + startId : ""}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchTerm=${searchQuery.searchTerm || "none"}&tags=${
      searchQuery.tags || "none"
    }`
  );
export const createPost = (newPost, base64Image) =>
  API.post("/posts", { post: newPost, base64Image });

export const updatePost = (id, updatedPost, base64Image) =>
  API.patch(`/posts/${id}`, { post: updatedPost, base64Image });

export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/like`);

export const commentPost = (id, comment) =>
  API.post(`/posts/${id}/comment`, { comment });

export const fetchGamesBySearch = (searchTerm) =>
  API.get(`/games/search?searchTerm=${searchTerm}`);

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
