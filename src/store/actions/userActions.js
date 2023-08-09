import axios from "axios";
import { apiClient, base_url } from "../../api/client";
export const fetchUserRequest = () => ({
  type: "FETCH_USER_REQUEST",
});

export const fetchUserSuccess = (userInfo) => ({
  type: "FETCH_USER_SUCCESS",
  payload: userInfo,
});

export const fetchUserFailure = (error) => ({
  type: "FETCH_USER_FAILURE",
  payload: error,
});

export const fetchUser = () => {
  return async (dispatch) => {
    dispatch(fetchUserRequest());
    try {
      const res = await apiClient.get("/user/logged-user-details");
      dispatch(fetchUserSuccess(res.data));
    } catch (error) {
      console.error(error);
    }
  };
};
