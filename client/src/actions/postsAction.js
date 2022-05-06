import * as api from "../api";
import {
  FETCH_BY_ID,
  FETCH_INITIAL,
  FETCH_MORE,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  START_LOADING,
  END_LOADING,
  CHANGE_HASMORE,
} from "../actions/actionTypes";

// action creators

export const getPost = (id, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_BY_ID, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    navigate("/posts");
    console.log(err.message);
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_INITIAL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err.message);
  }
};

export const addPosts = (startId) => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(startId);
    if (data.length === 0) {
      dispatch({ type: CHANGE_HASMORE, payload: false });
    } else {
      dispatch({ type: FETCH_MORE, payload: data });
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err.message);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data.post });
    navigate(`/posts/${data.post._id}`);
  } catch (err) {
    console.log(err.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data.post });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (err) {
    console.log(err.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

export const changeHasMore = (newValue) => {
  return { type: CHANGE_HASMORE, payload: newValue };
};
