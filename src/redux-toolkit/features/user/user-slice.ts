import {createSlice} from "@reduxjs/toolkit";

interface User {
    id: string;
    username: string;
    accessToken: string;
    expirationTime: number;
    role: string;
    isLoggedIn: boolean;

}

const initialState: User = {
    id: '',
    username: '',
    accessToken: '',
    expirationTime: 0,
    role: '',
    isLoggedIn: false,

};

interface SetId {
    payload: string;
}

interface SetUsername {
    payload: string;
}

interface SetAccessToken {
    payload: string;
}

interface SetExpirationTime {
    payload: number;
}

interface SetRole {
    payload: string;
}

interface SetIsLoggedIn {
    payload: boolean;
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setId: (state, action: SetId) => {
            state.id = action.payload;
        },
        setUsername: (state, action: SetUsername) => {
            state.username = action.payload;
        },
        setAccessToken: (state, action: SetAccessToken) => {
            state.accessToken = action.payload;
        },
        setExpirationTime: (state, action: SetExpirationTime) => {
            state.expirationTime = action.payload;
        },
        setRole: (state, action: SetRole) => {
            state.role = action.payload;
        },
        setIsLoggedIn: (state, action: SetIsLoggedIn) => {
            state.isLoggedIn = action.payload;
        },
    },
});

export const {
    setId,
    setUsername,
    setAccessToken,
    setExpirationTime,
    setRole,
    setIsLoggedIn,

} = userSlice.actions;