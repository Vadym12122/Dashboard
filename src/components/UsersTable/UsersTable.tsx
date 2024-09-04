import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers } from "../../helpers/usersApi";
import { setFilter } from "../../store/filters.slice";
import { RootState, useAppDispatch } from "../../store/store";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    CircularProgress,
    Typography,
} from "@mui/material";

import styles from "./UsersTable.module.scss";

const UsersTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const usersList = useSelector((state: RootState) => state.users.users);
    const filters = useSelector((state: RootState) => state.filters);
    const loading = useSelector((state: RootState) => state.users.loading);
    const error = useSelector((state: RootState) => state.users.error);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleFilterChange = (field: keyof typeof filters, value: string) => {
        dispatch(setFilter({ field, value }));
    };

    const filteredUsers = usersList.filter((user) =>
        Object.keys(filters).every((key) =>
            user[key as keyof typeof filters]
                .toString()
                .toLowerCase()
                .includes(filters[key as keyof typeof filters].toLowerCase())
        )
    );

    if (loading) return <CircularProgress />;
    if (error)
        return (
            <Typography color="error">Error loading users: {error}</Typography>
        );

    return (
        <TableContainer component={Paper}>
            <div style={{ padding: 16 }} className={styles.table}>
                <TextField
                    label="Filter by Name"
                    variant="outlined"
                    value={filters.name}
                    onChange={(e) => handleFilterChange("name", e.target.value)}
                    sx={{ width: "200px" }}
                    margin="normal"
                />
                <TextField
                    label="Filter by Username"
                    variant="outlined"
                    value={filters.username}
                    onChange={(e) =>
                        handleFilterChange("username", e.target.value)
                    }
                    sx={{ width: "200px" }}
                    margin="normal"
                />
                <TextField
                    label="Filter by Email"
                    variant="outlined"
                    value={filters.email}
                    onChange={(e) =>
                        handleFilterChange("email", e.target.value)
                    }
                    sx={{ width: "200px" }}
                    margin="normal"
                />
                <TextField
                    label="Filter by Phone"
                    variant="outlined"
                    value={filters.phone}
                    onChange={(e) =>
                        handleFilterChange("phone", e.target.value)
                    }
                    sx={{ width: "200px" }}
                    margin="normal"
                />
            </div>
            <Table>
                <TableHead>
                    <TableRow className={styles.table__row}>
                        <TableCell className={styles.table__title}>
                            Name
                        </TableCell>
                        <TableCell className={styles.table__title}>
                            Username
                        </TableCell>
                        <TableCell className={styles.table__title}>
                            Email
                        </TableCell>
                        <TableCell className={styles.table__title}>
                            Phone
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersTable;
