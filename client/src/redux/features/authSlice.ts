import { UserService } from "@/services/api/user.service";
import { IUser } from "@/types/database";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCurrentUser = createAsyncThunk(
    "authReducer/userData/fetchCurrentUser",
    async () => {
        const service = new UserService();
        const response = await service.getCurrentUser().exec();
        return response.data;
    }
);

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
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            console.log("reducer");

            (state.isAuth = true), (state.userData = action.payload);
        });
    },
});

export const { logUser, logout } = auth.actions;
export default auth.reducer;
