import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import memberSlice from "./memberSlice";
import gradeMembriiSlice from "./gradeMembriiSlice";
import { accountSlice } from "./accountSlice";

const store = configureStore({
    reducer: {
        member: memberSlice,
        gradeMembrii: gradeMembriiSlice,
        account: accountSlice.reducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector