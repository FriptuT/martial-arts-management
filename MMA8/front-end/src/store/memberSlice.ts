import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Membru, MembruParams } from '../app/models/membru';
import agent from '../app/connApi/agent';
import { RootState } from './store';


interface MemberState {
    members: Membru[];
    currentMember: Membru;
    openDialog: boolean;
    isEditing: boolean;
    membruParams: MembruParams;
    membersLoaded: boolean;
    status: string;
}



const membersAdapter = createEntityAdapter<Membru>({
    selectId: membru => membru.membruId,
})

function getAxiosParams(membruParams: MembruParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', membruParams.pageNumber.toString());
    params.append('pageSize', membruParams.pageSize.toString());
    params.append('orderBy', membruParams.orderBy);
    if (membruParams.searchTerm) params.append('searchTerm', membruParams.searchTerm);

    return params;
}

export const fetchMembersAsync = createAsyncThunk<Membru[], void, {state: RootState}>(
    'member/fetchMembersAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().member.membruParams);
        try {
            return await agent.Membrii.getAll(params);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 3,
        orderBy: 'name'
    }
}

// const initialMemberState: MemberState = {
//     members: [],
//     currentMember: {
//         membruId: 0,
//         email: '',
//         parola: '',
//         nume: '',
//         dataNasterii: '',
//         gen: '',
//         tipMembru: '',
//         nrLegitimatie: 0,
//         activ: false,
//         varsta: 0,
//         poza: ''
//     },
//     openDialog: false,
//     isEditing: false,
//     membruParams: initParams(),
//     membersLoaded: false,
//     status:'idle'
// };


export const memberSlice = createSlice({
    name: 'member',
    initialState: membersAdapter.getInitialState<MemberState>({
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
        membruParams: initParams(),
        membersLoaded: false,
        status: 'idle'
    }),
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
        setMembruParams: (state, action) => {
            state.membersLoaded = false;
            state.membruParams = { ...state.membruParams, ...action.payload };
        },
        resetMembruParams: (state) => {
            state.membruParams = initParams();
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchMembersAsync.pending, (state) => {
            state.status = 'pendingFetchMembers';
        });
        builder.addCase(fetchMembersAsync.fulfilled, (state, action) => {
            membersAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.membersLoaded = true;
        });
        builder.addCase(fetchMembersAsync.rejected, (state) => {
            state.status = 'idle';
        });
    })
});

export const memberActions = memberSlice.actions;
export default memberSlice.reducer;


export const memberSelectors = membersAdapter.getSelectors((state: RootState) => state.member);