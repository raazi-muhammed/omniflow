import { IProject } from "@/types/database";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
    projectData: IProject | null;
};

const initialState: InitialState = {
    projectData: null,
};

export const project = createSlice({
    name: "project",
    initialState,
    reducers: {
        setProject: (state, { payload }: PayloadAction<IProject>) => {
            state.projectData = payload;
        },
    },
});

export const { setProject } = project.actions;
export default project.reducer;
