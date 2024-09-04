import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./users.slice";
import filtersSlice from "./filters.slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        users: usersSlice, // стан і редуктор
        filters: filtersSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
