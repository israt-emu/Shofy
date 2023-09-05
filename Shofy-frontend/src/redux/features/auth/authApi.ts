import {api} from "../../api/apiSlice";
import {userLoggedIn} from "./authSlice";
export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              token: result?.data?.data.accessToken,
            })
          );
          dispatch(
            userLoggedIn({
              token: result?.data?.data.accessToken,
            })
          );
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/user/allUsers",
        method: "GET",
      }),
    }),

    getSingleUser: builder.query({
      query: (email) => ({
        url: `/user/getSingleUser/${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const {useLoginMutation, useSignUpMutation} = authApi;
