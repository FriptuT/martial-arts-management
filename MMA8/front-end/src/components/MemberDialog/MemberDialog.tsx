import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField } from "@mui/material";
import { Membru } from "../../app/models/membru";
import { useAppDispatch } from "../../store/store";
import { memberActions } from "../../store/memberSlice";

interface MemberDialogProps {
    open: boolean;
    currentMember: Membru;
    handleClose: () => void;
    handleSave: (currentMember: Membru) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isEditing: boolean;
}

export default function MemberDialog({ open, handleClose, handleChange, handleSave, isEditing, currentMember }: MemberDialogProps) {

    const dispatch = useAppDispatch();


    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{isEditing ? 'Edit Member' : 'Add Member'}</DialogTitle>
            <DialogContent>
                {/* Form inputs here, similar to the existing ones in the provided MemberList component */}

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
                <Button onClick={() => handleSave(currentMember)}>{isEditing ? 'Save Changes' : 'Add Member'}</Button>
            </DialogActions>
        </Dialog>
    );
}
