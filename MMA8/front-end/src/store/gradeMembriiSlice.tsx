import { createSlice } from "@reduxjs/toolkit";

const initialGradeMembriiState = {
    gradeMembrii: [],
    currentGradMember:{
        id:0,
        membruId:0,
        idGrad: 0,
        dataObtinerii:''
    },
    openDialog: false,
    isEditing: false,
    grades:[],
    currentGrad: {
        idGrad: 1,
        numeGrad: ''
    }
};


const gradeMembriiSlice = createSlice({
    name: 'gradeMembrii',
    initialState: initialGradeMembriiState,
    reducers:{
        setGradeMembers: (state,action) => {
            state.gradeMembrii = action.payload;
        },
        setCurrentGradMember: (state,action) => {
            state.currentGradMember = action.payload;
        },
        setOpenDialog: (state,action) => {
            state.openDialog = action.payload;
        },
        setIsEditing :(state, action) => {
            state.isEditing = action.payload;
        },
        setCurrentGrad: (state,action) => {
            state.currentGrad = action.payload;
        },
        setGrades: (state,action) => {
            state.grades = action.payload;
        }
    }
});

export const  gradeMembriiActions = gradeMembriiSlice.actions;
export default gradeMembriiSlice.reducer;