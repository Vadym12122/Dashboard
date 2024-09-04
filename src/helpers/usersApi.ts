import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../interfaces/user.interface";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
});
