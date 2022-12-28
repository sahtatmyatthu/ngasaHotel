import { configureStore } from "@reduxjs/toolkit";
import searchReducers from "../features/searchSlice"

export const store = configureStore({
    reducer:{
        search: searchReducers,

    }
})