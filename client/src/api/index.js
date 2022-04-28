import axios from "axios";
import store from "../store/store";
import { logout } from "../actions/authAction";
import { openSnackBar } from "../actions/feedbackAction";

const { dispatch } = store;

const API = axios.create({ baseURL: "http://localhost:5000" });

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
    if (err?.response?.status === 400 && err?.response?.data?.message) {
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

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchTerm=${searchQuery.searchTerm || "none"}&tags=${searchQuery.tags || "none"}`
  );
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likepost`);

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
