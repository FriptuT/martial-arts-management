import { Button, TableCell, TableRow } from "@mui/material";
import { Grade } from "../../app/models/grade";
import { gradeMembru } from "../../app/models/gradeMembru";
import { useAppSelector } from "../../store/store";

interface GradeTableProps {
    gradMembru: gradeMembru;
    findNumeGradById(idMembru: number, idGrad: number, grade: Grade[], gradeMembrii: gradeMembru[]): string;
    grade: Grade[];
    gradeMembrii: gradeMembru[];
    onEdit: (gradMembru: gradeMembru) => void;
    onDelete: (gradMembru: gradeMembru) => void;
}

export default function GradeTable({ gradMembru, findNumeGradById, grade, gradeMembrii, onEdit, onDelete }: GradeTableProps) {

    const user = useAppSelector(state => state.account.user);


    return (
        <>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                // key={gradMembru.id}
            >
                <TableCell component="th" scope="row">
                    {findNumeGradById(gradMembru.membruId, gradMembru.idGrad, grade, gradeMembrii)}
                    {/* {afisareGrad.numeGrad} */}
                    {/* {tableData?.numeGrad} */}
                </TableCell>
                <TableCell align="right">
                    {gradMembru.dataObtinerii}
                    {/* {tableData?.dataObtinerii} */}
                </TableCell>
                <TableCell align="right">
                    {user?.roles?.includes('Admin') &&
                        <Button color='primary' onClick={() => onEdit(gradMembru)} >Edit</Button>
                    }
                </TableCell>
                <TableCell align="right">
                    {user?.roles?.includes('Admin') && 
                        <Button color='secondary' onClick={() => onDelete(gradMembru)}>Delete</Button>
                    }
                </TableCell>

            </TableRow>
        </>
    );
}