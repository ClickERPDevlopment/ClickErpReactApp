/* eslint-disable @typescript-eslint/no-explicit-any */
import reducer from "./reducer";
import { thunk } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

// const middleware = [thunk]; // Define an array of middleware

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk) as any, // Use getDefaultMiddleware
});

export default store;
