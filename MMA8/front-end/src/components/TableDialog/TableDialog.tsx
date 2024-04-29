import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from "@mui/material";
import { Membru } from "../../app/models/membru";
import { gradeMembru } from "../../app/models/gradeMembru";
import { Grade } from "../../app/models/grade";

interface TableDialogProps {
    open: boolean;
    currentGradMember: gradeMembru;
    handleClose: () => void;
    handleSave: (currentGradMembru: gradeMembru) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isEditing: boolean;
    member: Membru;
    grades: Grade[];
    currentGrad: Grade;
    members: Membru[];
    // id: string;
}

export default function TableDialog({ open, handleClose, handleSave, handleChange, isEditing, currentGradMember, grades, currentGrad, member }: TableDialogProps) {


    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{isEditing ? 'Edit' : 'Add Grade'}</DialogTitle>
            <DialogContent>
                <TextField
                    type="text"
                    label="ID MEMBRU"
                    variant="outlined"
                    name="membruId"
                    value={currentGradMember.membruId}
                    onChange={handleChange}
                    fullWidth
                    sx={{marginTop: 1}}
                />
                <TextField
                    type="text"
                    label="ID GRAD"
                    variant="outlined"
                    name="idGrad"
                    value={currentGradMember.idGrad}
                    onChange={handleChange}
                    fullWidth
                    sx={{marginTop: 1}}
                />

                <TextField
                    margin="dense"
                    name="dataObtinerii"
                    type="date"
                    fullWidth
                    variant="outlined"
                    value={currentGradMember.dataObtinerii}
                    onChange={handleChange}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => handleSave(currentGradMember)}>{isEditing ? 'Save' : 'Add Grade'}</Button>
            </DialogActions>
        </Dialog>
    );
}