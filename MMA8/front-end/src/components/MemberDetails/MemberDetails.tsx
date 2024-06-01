import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import agent from "../../app/connApi/agent";
import { memberActions } from "../../store/memberSlice";
import { useEffect } from "react";
import { gradeMembriiActions } from "../../store/gradeMembriiSlice";
import GradeTable from "../GradeTable/GradeTable";
import TableDialog from "../TableDialog/TableDialog";
import { gradeMembru } from "../../app/models/gradeMembru";
import { Grade } from "../../app/models/grade";

export default function MemberDetails() {
    const dispatch = useAppDispatch();
    const { id } = useParams<string>();
    const member = useAppSelector((state) => state.member.currentMember);
    const gradeMembrii = useAppSelector((state) => state.gradeMembrii.gradeMembrii);
    const gradMembru = useAppSelector((state) => state.gradeMembrii.currentGradMember);
    const open = useAppSelector((state) => state.gradeMembrii.openDialog);
    const isEditing = useAppSelector((state) => state.gradeMembrii.isEditing);
    const grade = useAppSelector((state) => state.gradeMembrii.grades);
    const currentGrad = useAppSelector((state) => state.gradeMembrii.currentGrad);
    const members = useAppSelector((state) => state.member.members);
    const user = useAppSelector(state => state.account.user);



    const getMemberById = async (id: any) => {
        try {
            const fetchedMember = await agent.Membrii.getOne(id);
            dispatch(memberActions.setCurrentMember(fetchedMember));
        } catch (error) {
            console.log('Error loading grades:', error);
        }
    }

    const getGradeById = async (id: any) => {
        try {
            const fetchedGrade = await agent.Grades.listOne(id);
            dispatch(gradeMembriiActions.setCurrentGrad(fetchedGrade));
        } catch (error) {
            console.log(error);
        }
    }
    const getGradeMembrii = async () => {
        try {
            const gradeMembrii = await agent.GradeMembrii.getAll();
            dispatch(gradeMembriiActions.setGradeMembers(gradeMembrii));
        } catch (error) {
            console.log('Error loading GradeMembrii: ', error);
        }
    }

    useEffect(() => {
        getMemberById(id);
        getGradeMembrii();
        getGradeById(currentGrad.idGrad);

        // incarcarea gradelor
        agent.Grades.listAll().then(dataGrade => {
            dispatch(gradeMembriiActions.setGrades(dataGrade));
        });


    }, [id]);

    /*
    begin
    ==================
    Part for the modal
    ==================
    */

    const handleClose = () => {
        dispatch(gradeMembriiActions.setOpenDialog(false));
    };

    const handleSave = async (currentGradMember: gradeMembru) => {
        try {
            if (isEditing) {
               await agent.GradeMembrii.editGradMembru(currentGradMember.id, currentGradMember);
            } else {
               await agent.GradeMembrii.addGradMembru(currentGradMember);
            }

            await getGradeMembrii();
            handleClose();
        } catch (error) {
            console.log('Error saving member:', error);
        }
    }

    const handleOpen = (gradMembru?: gradeMembru) => {
        if (gradMembru) {
            dispatch(gradeMembriiActions.setIsEditing(true));
            dispatch(gradeMembriiActions.setCurrentGradMember(gradMembru));
        } else {
            dispatch(gradeMembriiActions.setIsEditing(false));
            dispatch(gradeMembriiActions.setCurrentGradMember({
                id: 0,
                membruId: 0,
                idGrad: 0,
                dataObtinerii: ''
            }));
        }
        dispatch(gradeMembriiActions.setOpenDialog(true));
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        if (name === 'idGrad') {

            dispatch(gradeMembriiActions.setCurrentGradMember({
                ...gradMembru,
                [name]: value
            }));
        }
        else if (name === 'membruId') {
            dispatch(gradeMembriiActions.setCurrentGradMember({
                ...gradMembru,
                [name]: value
            }));
        }
        else {
            dispatch(gradeMembriiActions.setCurrentGradMember({
                ...gradMembru,
                [name]: value
            }));
        }
    };


    const handleDelete = async (gradMembru: gradeMembru) => {
        console.log("Deleting GradMember with ID: ", gradMembru.id);
        await agent.GradeMembrii.deleteGradMembru(gradMembru.id);
        await getGradeMembrii();
    };



    /*
    end
    ==================
    Part for the modal
    ==================
    */


    /*
    begin
    ====================================
    Functionalitate pt afisarea gradului
    ====================================
    */


    const findNumeGradById = (idMembru: number, idGrad: number, grade: Grade[], gradeMembrii: gradeMembru[]): string => {

        const gradeMembruForMembru = gradeMembrii.filter(gm => gm.membruId === idMembru);

        if (gradeMembruForMembru.length === 0) {
            return 'Necunoscut';
        }

        const grad = grade.find(g => g.idGrad === idGrad);
        return grad ? grad.numeGrad : 'Necunoscut';
    }


    /*
    end
    ====================================
    Functionalitate pt afisarea gradului
    ====================================
    */


    return (
        <Container>
            <Typography variant="h3" color='primary'>{member ? member.nume : 'waiting for'}</Typography>

            {user?.roles?.includes('Admin') &&
                <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                    Add Grade
                </Button>
            }
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>GRAD</TableCell>
                            <TableCell align="right">Date of Obtainment</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gradeMembrii.map((gradMembru: gradeMembru) => (
                            <GradeTable
                                key={gradMembru.id}
                                gradMembru={gradMembru}
                                findNumeGradById={findNumeGradById}
                                grade={grade}
                                gradeMembrii={gradeMembrii}
                                onEdit={handleOpen}
                                onDelete={handleDelete}
                            />
                        ))}


                    </TableBody>
                </Table>
            </TableContainer>

            <TableDialog
                open={open}
                handleClose={handleClose}
                handleChange={handleChange}
                handleSave={handleSave}
                isEditing={isEditing}
                currentGradMember={gradMembru}
                grades={grade}
                currentGrad={currentGrad}
                members={members}
                member={member}
            // id={id}
            />

        </Container>
    );
}