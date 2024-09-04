import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/user.interface";
import { fetchUsers } from "../helpers/usersApi";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [] as User[],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchUsers.fulfilled,
                (state, action: PayloadAction<User[]>) => {
                    state.loading = false;
                    state.users = action.payload;
                }
            )
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch users";
            });
    },
});

export default usersSlice.reducer;
