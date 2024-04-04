import { IAccess, IProject } from "@/types/database";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
    projectData: (IProject & { access: IAccess }) | null;
};

const initialState: InitialState = {
    projectData: null,
};

export const project = createSlice({
    name: "project",
    initialState,
    reducers: {
        setProject: (
            state,
            { payload }: PayloadAction<IProject & { access: IAccess }>
        ) => {
            state.projectData = payload;
        },
    },
});

export const { setProject } = project.actions;
export default project.reducer;
