import axios from "axios";
import history from "../history";

// API Server 주소
const API_URL = "http://localhost:3001/api";

// 액션 타입 지정
export const PRESERVE_TOKEN = "PRESERVE_TOKEN";
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const GET_POST_FETCH = "GET_POST_FETCH";
export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
export const CREATE_POST = "CREATE_POST";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const EDIT_POST = "EDIT_POST";
export const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS";
export const DELETE_POST = "DELETE_POST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const GET_POST_DETAIL_FETCH = "GET_POST_DETAIL_FETCH";
export const GET_POST_DETAIL_SUCCESS = "GET_POST_DETAIL_SUCCESS";

export function preserveToken(token) {
  return {
    type: "PRESERVE_TOKEN",
    token
  };
}

export function login(username, password) {
  return function(dispatch) {
    axios
      .post(`${API_URL}/auth/login`, { username, password })
      .then(res => {
        dispatch(loginSuccess(res.data, username));
        // const token = res.data.token;
        // //console.log(token);
        // axios.defaults.headers.common["Authorization"] = token;
        dispatch(preserveToken(res.data.token));
        history.push("/");
      })
      .catch(err => {
        if (err.response.status === 401) {
          dispatch(loginFailure(err));
        }
      });
  };
}

export function loginSuccess(data, username) {
  return {
    type: "LOGIN_SUCCESS",
    data,
    username
  };
}

export function loginFailure(data) {
  return {
    type: "LOGIN_FAILURE",
    data
  };
}

export function getPostFetch(current) {
  return function(dispatch) {
    axios
      .get(`${API_URL}/post/pages/` + current)
      .then(res => {
        // post를 정상적으로 불러오면 Success 함수를 실행
        dispatch(getPostSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function getPostSuccess(posts) {
  return {
    type: "GET_POST_SUCCESS",
    // 여기서 받은 값을 리듀서로
    posts
  };
}

export function createPost(title, writer, content) {
  return function(dispatch) {
    axios
      .post(`${API_URL}/post`, { title, writer, content })
      .then(res => {
        dispatch(createPostSuccess(res.data));
        // 함수 실행하고나서 "/" 경로로 이동
        history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function createPostSuccess(post) {
  return {
    type: "CREATE_POST_SUCCESS",
    post
  };
}

export function editPost(title, writer, content, postId) {
  return function(dispatch) {
    axios
      .put(`${API_URL}/post/` + postId, { title, writer, content })
      .then(res => {
        dispatch(editPostSuccess(res.data));
        history.push("/post/" + postId);
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function editPostSuccess(post) {
  return {
    type: "EDIT_POST_SUCCESS",
    post
  };
}

export function deletePost(postId) {
  return function(dispatch) {
    axios
      .delete(`${API_URL}/post/` + postId)
      .then(res => {
        dispatch(deletePostSuccess(res.data));
        history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function deletePostSuccess(post) {
  return {
    type: "DELETE_POST_SUCCESS",
    post
  };
}

export function getPostDetailFetch(postId) {
  return function(dispatch) {
    axios
      .get(`${API_URL}/post/` + postId)
      .then(res => {
        dispatch(getPostDetailSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function getPostDetailSuccess(post) {
  return {
    type: "GET_POST_DETAIL_SUCCESS",
    post
  };
}
