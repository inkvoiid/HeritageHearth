import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => `/users`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id;
                    return user;
                });
                return usersAdapter.setAll(initialState, loadedUsers);
            },
            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: "User", id: "LIST"},
                        ...result.ids.map(id => ({type: "User", id}))
                    ];
                }
                else return [{type: "User", id: "LIST"}];
            }
        }),

        // Get a single user by id
        getUserById: builder.query({
            query: (id) => `/users/${id}`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedUser = responseData;
                loadedUser.id = loadedUser._id;
                return usersAdapter.setOne(initialState, loadedUser);
            },
            providesTags: (result, error, arg) => {
                if(result?.id){
                    return [{type: "User", id: result.id}];
                }
                else return [{type: "User", id: "LIST"}];
            }
        }),


        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: `/users`,
                method: 'POST',
                body: {
                    ...initialUserData
                }
            }),
            invalidatesTags: [
                {type: "User", id: "LIST"}
            ]
        }),
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: `/users/${initialUserData.id}`,
                method: 'PUT',
                body: {
                    ...initialUserData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: "User", id: arg.id}
            ]
        }),
        deleteUser: builder.mutation({
            query: ({id}) => ({
                url: `/users/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                {type: "User", id: arg.id}
            ]
        }),
    }),
});

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice;

// Returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// Creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    (usersResult) => usersResult?.data // normalised state object with ids and entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
    // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);