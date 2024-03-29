import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, MenuItem, TextField } from "@mui/material";
import { Membru } from "../../app/models/membru";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { memberActions } from "../../store/memberSlice";
import { useEffect, useState } from "react";
import agent from "../../app/connApi/agent";
import { Grade } from "../../app/models/grade";

interface MemberDialogProps {
    open: boolean;
    currentMember: Membru;
    handleClose: () => void;
    handleSave: (currentMember: Membru, selectedGradeId: string) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isEditing: boolean;
    grad: Grade;
}

export default function MemberDialog({ open, handleClose, handleChange, handleSave, isEditing, currentMember, grad }: MemberDialogProps) {

    const dispatch = useAppDispatch();

    const [selectedGradeId, setSelectedGradeId] = useState('');
    const grades = useAppSelector((state) => state.member.grades);

    useEffect(() => {
        const fetchGrades = async () => {
            const fetchedGrades = await agent.Grade.listAll();
            console.log("centuri: ",fetchedGrades);
            dispatch(memberActions.setGrades(fetchedGrades));
        }

        fetchGrades();
    }, []);

    const handleGradeChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const {value} = event.target;
        setSelectedGradeId(value as string);
    };


    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{isEditing ? 'Edit Member' : 'Add Member'}</DialogTitle>
            <DialogContent>

                <TextField
                    autoFocus
                    margin="dense"
                    name="nume"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={currentMember.nume}
                    onChange={handleChange}
                />

                <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={currentMember.email}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="parola"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={currentMember.parola}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="dataNasterii"
                    type="date"
                    fullWidth
                    value={currentMember.dataNasterii.split('T')[0]}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="gen"
                    label="Gender"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={currentMember.gen}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="tipMembru"
                    label="Membership Type"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={currentMember.tipMembru}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="nrLegitimatie"
                    label="Membership ID"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={currentMember.nrLegitimatie}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="varsta"
                    label="Age"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={currentMember.varsta}
                    onChange={handleChange}
                />

                <TextField
                    select
                    label="Grade"
                    name="idGrad"
                    value={selectedGradeId}
                    onChange={handleGradeChange}            
                    fullWidth
                >
                    {grades.map((grade: Grade) => (
                        <MenuItem key={grade.idGrad} value={String(grade.idGrad)}>
                            {grade.numeGrad}
                        </MenuItem>
                    ))}
                </TextField>


                {/* Add other fields here */}
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={currentMember.activ}
                            onChange={(e) => dispatch(memberActions.setCurrentMember({ ...currentMember, activ: e.target.checked }))}
                            name="activ"
                        />
                    }
                    label="Active"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => handleSave(currentMember, selectedGradeId)}>{isEditing ? 'Save Changes' : 'Add Member'}</Button>
            </DialogActions>
        </Dialog>
    );
}
