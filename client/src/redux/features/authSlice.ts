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
    isLoading: boolean;
};

const initialState: InitialState = {
    isAuth: false,
    userData: null,
    isLoading: false,
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
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.isAuth = true;
                state.userData = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { logUser, logout } = auth.actions;
export default auth.reducer;
