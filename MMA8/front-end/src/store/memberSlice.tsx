import { createSlice } from '@reduxjs/toolkit';

const initialMemberState = {
    members: [],
    currentMember: {
        membruId: 0,
        email: '',
        parola: '',
        nume: '',
        dataNasterii: '',
        gen: '',
        tipMembru: '',
        nrLegitimatie: 0,
        activ: false,
        varsta: 0,
        poza: ''
    },
    openDialog: false,
    isEditing: false,
    gradMembru: {
        id: 0,
        idMembru: 0,
        idGrad: 0,
        dataObtinerii: ''
    },
    grade: [],
    grad: {
        id: 0,
        numeGrad: ''
    },
    selectedGradeId: null,
};


const memberSlice = createSlice({
    name: 'member',
    initialState: initialMemberState,
    reducers: {
        setMembers: (state, action) => {
            state.members = action.payload;
        },
        setCurrentMember: (state, action) => {
            state.currentMember = action.payload;
        },
        setOpenDialog: (state, action) => {
            state.openDialog = action.payload;
        },
        setIsEditing: (state, action) => {
            state.isEditing = action.payload;
        },
        setGradMembru: (state, action) => {
            state.gradMembru = action.payload;
        },
        setGrade: (state, action) => {
            state.grade = action.payload;
        }
    },
});

export const memberActions = memberSlice.actions;
export default memberSlice.reducer;