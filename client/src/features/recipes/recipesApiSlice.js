import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const recipesAdapter = createEntityAdapter({});

const initialState = recipesAdapter.getInitialState();

export const recipesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecipes: builder.query({
            query: () => `/recipes`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedRecipes = responseData.map(recipe => {
                    recipe.id = recipe._id;
                    return recipe;
                });
                return recipesAdapter.setAll(initialState, loadedRecipes);
            },
            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: "Recipe", id: "LIST"},
                        ...result.ids.map(id => ({type: "Recipe", id}))
                    ];
                }
                else return [{type: "Recipe", id: "LIST"}];
            }
        }),
    }),
});

export const {
    useGetRecipesQuery,
} = recipesApiSlice;

// Returns the query result object
export const selectRecipesResult = recipesApiSlice.endpoints.getRecipes.select();

// Creates memoized selector
const selectRecipesData = createSelector(
    selectRecipesResult,
    (recipesResult) => recipesResult?.data // normalised state object with ids and entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllRecipes,
    selectById: selectRecipeById,
    selectIds: selectRecipeIds,
    // Pass in a selector that returns the recipes slice of state
} = recipesAdapter.getSelectors((state) => selectRecipesData(state) ?? initialState);