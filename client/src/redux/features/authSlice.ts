import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserData = {
    name: string;
    email: string;
};
type InitialState = {
    isAuth: boolean;
    userData: null | UserData;
};

const initialState: InitialState = {
    isAuth: false,
    userData: null,
};

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logUser: (state, { payload }: PayloadAction<UserData>) => {
            (state.isAuth = true), (state.userData = payload);
        },
    },
});

export const { logUser } = auth.actions;
export default auth.reducer;
