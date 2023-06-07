import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const pantriesAdapter = createEntityAdapter({});

const initialState = pantriesAdapter.getInitialState();

export const pantriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPantries: builder.query({
            query: () => `/pantries`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedPantries = responseData.map(pantry => {
                    pantry.id = pantry._id;
                    return pantry;
                });
                return pantriesAdapter.setAll(initialState, loadedPantries);
            },
            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: "Pantry", id: "LIST"},
                        ...result.ids.map(id => ({type: "Pantry", id}))
                    ];
                }
                else return [{type: "Pantry", id: "LIST"}];
            }
        }),
    }),
});

export const {
    useGetPantriesQuery,
} = pantriesApiSlice;

// Returns the query result object
export const selectPantriesResult = pantriesApiSlice.endpoints.getPantries.select();

// Creates memoized selector
const selectPantriesData = createSelector(
    selectPantriesResult,
    (pantriesResult) => pantriesResult?.data // normalised state object with ids and entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPantries,
    selectById: selectPantryById,
    selectIds: selectPantryIds,
    // Pass in a selector that returns the pantries slice of state
} = pantriesAdapter.getSelectors((state) => selectPantriesData(state) ?? initialState);