import { Button, Container } from "@mui/material";
import { useEffect } from "react";
import agent from "../../app/connApi/agent";
import { Membru } from "../../app/models/membru";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { memberActions } from "../../store/memberSlice";
import MemberCard from "../MemberCard/MemberCard";
import MemberDialog from "../MemberDialog/MemberDialog";
import { Grade } from "../../app/models/grade";
import { gradeMembru } from "../../app/models/gradeMembru";


export default function MemberList() {
  const dispatch = useAppDispatch();
  const members = useAppSelector((state) => state.member.members);
  const currentMember = useAppSelector((state) => state.member.currentMember);
  const open = useAppSelector((state) => state.member.openDialog);
  const isEditing = useAppSelector((state) => state.member.isEditing);
  const grades = useAppSelector((state) => state.member.grades);
  const grad = useAppSelector((state) => state.member.grad);

  

  useEffect(() => {
    loadMembers();
    // fetchGrades();
  }, []);


  const loadMembers = async () => {
    try {
      const fetchedMembers = await agent.Membrii.getAll();
      console.log("members fetched: ", fetchedMembers);

      const gradeAssociations = await agent.GradeMembrii.getAll();
      console.log("grade-membrii", gradeAssociations);

      const serializedMembers = fetchedMembers.map((member: Membru) => ({
        ...member,
        dataNasterii: new Date(member.dataNasterii).toISOString(),
      }));

      const membersWithGrades = serializedMembers.map((member: Membru) => {
        const gradeAssociation = gradeAssociations.find((ga: gradeMembru) => ga.idMembru === member.membruId);
        const grade = grades.find((g: Grade) => g.idGrad === gradeAssociation?.idGrad);
        return { ...member, grade};
      });

      dispatch(memberActions.setMembers(membersWithGrades));
    } catch (error) {
      console.error('Error loading members:', error);
    }
  };

  const handleOpen = (member?: Membru) => {
    if (member) {
      dispatch(memberActions.setIsEditing(true));
      dispatch(memberActions.setCurrentMember(member));
      // dispatch(memberActions.setGrad(grad));
    } else {
      dispatch(memberActions.setIsEditing(false));
      dispatch(memberActions.setCurrentMember({
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
      }));
      // dispatch(memberActions.setGrad({
      //   idGrad: 0,
      //   numeGrad: ''
      // }));
      /////////////////////////////////// aici posibil sa setam gradul 
    }
    dispatch(memberActions.setOpenDialog(true));
  };


  const handleClose = () => {
    dispatch(memberActions.setOpenDialog(false));
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // Special handling for birth date
    if (name === 'dataNasterii') {
      const birthDate = new Date(value);
      const isoDateString = birthDate.toISOString().split('T')[0];
      const ageDiffMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDiffMs); // miliseconds from epoch
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);


      dispatch(memberActions.setCurrentMember({
        ...currentMember,
        [name]: isoDateString,
        varsta: calculatedAge
      }));
    }
    else {
      dispatch(memberActions.setCurrentMember({
        ...currentMember,
        [name]: value
      }));
      dispatch(memberActions.setGrad({      ////////////last_commit, fa legatura intre Membru si Grade
        ...grad,
        [name]: value
      }));
    }
  };




  const handleSaveWithGrade = async (currentMember: Membru, gradMembru: gradeMembru, grade: Grade) => {
    try {
      let savedMember;
      if (isEditing) {
        savedMember = await agent.Membrii.editMembru(currentMember.membruId, currentMember);
        await agent.GradeMembrii.editGradMembru(gradMembru.id, gradMembru);
      } else {
        savedMember = await agent.Membrii.addMembru(currentMember);
      }

      if (gradMembru.id) {
        await agent.GradeMembrii.addGradMembru({
          id: gradMembru.id,
          idMembru: savedMember.membruId,
          idGrad: grade.idGrad,
          dataObtinerii: new Date().toISOString(),
        });
      }


      await loadMembers(); // Ensure that members are reloaded after saving
      handleClose();
    } catch (error) {
      console.error('Error saving member:', error);
    }
  };

  const handleDelete = async (member: Membru) => {
    console.log("Deleting member with ID: ", member.membruId);
    await agent.Membrii.deleteMembru(member.membruId);
    await loadMembers();

  };

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Member
      </Button>

      {members.map((member: Membru) => (
        <MemberCard
          grade={grades}
          key={member.membruId}
          member={member}
          onEdit={handleOpen}
          onDelete={handleDelete}
        />

      ))}

      <MemberDialog
        grad={grad}
        open={open}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSave={handleSaveWithGrade}
        isEditing={isEditing}
        currentMember={currentMember}

      />
    </Container>

  );


}