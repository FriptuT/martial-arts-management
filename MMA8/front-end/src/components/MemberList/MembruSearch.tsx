import { TextField, debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { memberActions } from "../../store/memberSlice";
import { useState } from "react";


export default function MembruSearch() {

    const {membruParams} = useAppSelector(state => state.member);
    const [searchTerm, setSearchTerm] = useState(membruParams.searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(memberActions.setMembruParams({searchTerm: event.target.value}))
    }, 1000)

    return (
        <TextField
            label='Search members'
            variant='outlined'
            fullWidth
            value={searchTerm || ''}
            onChange={(event: any) => {
                setSearchTerm(event.target.value);
                debouncedSearch(event);
            }}
        />
    )
}