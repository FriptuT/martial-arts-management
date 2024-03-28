import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Membru } from "../../app/models/membru";
import { Grade } from "../../app/models/grade";

interface MemberCardProps {
    member: Membru;
    onEdit: (member: Membru) => void;
    onDelete: (member: Membru) => void;
    grade: Grade;
}


export default function MemberCard({ member, onEdit, onDelete, grade }: MemberCardProps) {

    

    return (
        <Card sx={{ display: 'flex', marginBottom: 2 }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                    {member.nume}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    Age: {member.varsta}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    Gen: {member.gen}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    Type: {member.tipMembru}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    Active: {member.activ ? 'Yes' : 'No'}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    Centura: {grade.numeGrad}
                </Typography>
            </CardContent>

            <CardActions>
                <Button color="primary" onClick={() => onEdit(member)}>Edit</Button>
                <Button color="secondary" onClick={() => onDelete(member)}>Delete</Button>
            </CardActions>

            

        </Card>
    );
}
