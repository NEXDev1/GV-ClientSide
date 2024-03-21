import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:4000/api";

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }: { getState: any }) => {
        const userTokenString = localStorage.getItem("userToken");
        console.log(getState);
        
        type token = {
            token: string;
        };

        if (userTokenString) {
            const userTokenObject: token | null = userTokenString
                ? JSON.parse(userTokenString)
                : null;
            if (userTokenObject?.token) {
                headers.set("authorization", `Bearer ${userTokenObject?.token}`);
            }
        }
        return headers;
    },
});


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery,
    tagTypes: ["user"],
    endpoints: (builder) => ({
        userLogin: builder.mutation<any, any>({
            query: (data) => ({
                url: "/auth",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["user"],
        }),
        example: builder.mutation<any, any>({
            query: (data) => ({
                url: "/auth",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["user"],
        }),
    })
})