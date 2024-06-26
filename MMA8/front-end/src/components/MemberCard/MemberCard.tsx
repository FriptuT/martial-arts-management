import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Membru } from "../../app/models/membru";
import './card.css'
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/store";

interface MemberCardProps {
    member: Membru;
    onEdit: (member: Membru) => void;
    onDelete: (member: Membru) => void;
}


export default function MemberCard({ member, onEdit, onDelete }: MemberCardProps) {
    const user = useAppSelector(state => state.account.user);

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
            </CardContent>

            <CardActions>
                {user?.roles?.includes('Admin') &&
                    <Button color="primary" onClick={() => onEdit(member)}>Edit</Button>
                }
                {user?.roles?.includes('Admin') &&
                    <Button color="secondary" onClick={() => onDelete(member)}>Delete</Button>
                }
                <Button component={Link} to={`/members/${member.membruId}`} size="small">GRADES</Button>
            </CardActions>



        </Card>
    );
}
