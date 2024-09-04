import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Filters } from "../interfaces/filters.interface";

const initialState: Filters = {
    name: "",
    username: "",
    email: "",
    phone: "",
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilter(
            state,
            action: PayloadAction<{ field: keyof Filters; value: string }>
        ) {
            state[action.payload.field] = action.payload.value;
        },
        resetFilters(state) {
            state.name = "";
            state.username = "";
            state.email = "";
            state.phone = "";
        },
    },
});

export const { setFilter, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
