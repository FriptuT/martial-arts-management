import { Button, Container } from "@mui/material";
import { useEffect } from "react";
import agent from "../../app/connApi/agent";
import { Membru } from "../../app/models/membru";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { memberActions } from "../../store/memberSlice";
import { gradeMembru } from "../../app/models/gradeMembru";
import MemberCard from "../MemberCard/MemberCard";
import MemberDialog from "../MemberDialog/MemberDialog";


export default function MemberList() {
  const dispatch = useAppDispatch();
  const members = useAppSelector((state) => state.member.members);
  const currentMember = useAppSelector((state) => state.member.currentMember);
  const open = useAppSelector((state) => state.member.openDialog);
  const isEditing = useAppSelector((state) => state.member.isEditing);
  const grade = useAppSelector((state) => state.member.grade);
  const gradMembru = useAppSelector((state) => state.member.gradMembru);


  useEffect(() => {
    loadMembers();
    fetchGrades();
  }, []);


  const fetchGrades = async () => {
    try {
      const gradesData = await agent.Grade.listAll();
      dispatch(memberActions.setGrade(gradesData))
    } catch (error) {
      console.error("Error fetching grades: ", error);
    }
  };

  const loadMembers = async () => {
    try {
      const fetchedMembers = await agent.Membrii.getAll();
      console.log("members fetched: ", fetchedMembers);

      const serializedMembers = fetchedMembers.map((member: Membru) => ({
        ...member,
        dataNasterii: new Date(member.dataNasterii).toISOString(),
      }));

      dispatch(memberActions.setMembers(serializedMembers));
    } catch (error) {
      console.error('Error loading members:', error);
    }
  };

  const handleOpen = (member?: Membru) => {
    if (member) {
      dispatch(memberActions.setIsEditing(true));
      dispatch(memberActions.setCurrentMember(member));
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
    }
  };




  const handleSave = async (currentMember: Membru) => {
    try {
      
      if (isEditing) {
        await agent.Membrii.editMembru(currentMember.membruId, currentMember);
      } else {
        await agent.Membrii.addMembru(currentMember);
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
          key={member.membruId}
          member={member}
          onEdit={handleOpen}
          onDelete={handleDelete}
        />
      ))}

      <MemberDialog
        open={open}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSave={handleSave}
        isEditing={isEditing}
        currentMember={currentMember}
      />
    </Container>

  );


}