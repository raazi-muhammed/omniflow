import { IUser } from "@/types/database";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
    isAuth: boolean;
    userData: null | IUser;
};

const initialState: InitialState = {
    isAuth: false,
    userData: null,
};

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logUser: (state, { payload }: PayloadAction<IUser>) => {
            (state.isAuth = true), (state.userData = payload);
        },
        logout: (state) => {
            state.isAuth = false;
            state.userData = null;
        },
    },
});

export const { logUser, logout } = auth.actions;
export default auth.reducer;
