import axios from "axios";

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
    return async(dispatch) => {
        dispatch(fetchUserRequest());
        try {
            var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
            const res = await axios.get(
                "http://34.227.65.157/user/logged-user-details", {
                    headers: {
                        Authorization: `Bearer ${typ.accessToken}`,
                    },
                }
            );
            console.log(res.data.userDetails);
            dispatch(fetchUserSuccess(res.data.userDetails));
        } catch (error) {
            console.error(error);
        }
    };
};