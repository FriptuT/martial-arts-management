import { Box, Button, FormControl, FormControlLabel, Grid, Pagination, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import { useEffect } from "react";
import agent from "../../app/connApi/agent";
import { Membru } from "../../app/models/membru";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchMembersAsync, memberActions, memberSelectors } from "../../store/memberSlice";
import MemberCard from "../MemberCard/MemberCard";
import MemberDialog from "../MemberDialog/MemberDialog";
import { gradeMembriiActions } from "../../store/gradeMembriiSlice";
import MembruSearch from "./MembruSearch";


const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'varstaDesc', label: 'Age - Old to Young' },
  { value: 'varsta', label: 'Age - Young to Old' }
];


export default function MemberList() {
  const dispatch = useAppDispatch();
  // const members: Membru[] = useAppSelector((state) => state.member.members);
  const currentMember = useAppSelector((state) => state.member.currentMember);
  const open = useAppSelector((state) => state.member.openDialog);
  const isEditing = useAppSelector((state) => state.member.isEditing);
  const { membersLoaded } = useAppSelector(state => state.member);
  const members = useAppSelector(memberSelectors.selectAll);



  // hook pentru incarcarea gradelor si a membrilor
  useEffect(() => {

    if (!membersLoaded) {
      dispatch(fetchMembersAsync());
    }

    loadGrades();
  }, [membersLoaded]);

  // functie pentru incarcarea gradelor
  const loadGrades = async () => {
    try {
      const fetchedGrades = await agent.Grades.listAll();
      console.log("MemberList - grade: ", fetchedGrades);
      dispatch(gradeMembriiActions.setGrades(fetchedGrades));
    } catch (error) {
      console.log('Error loading grades:', error);
    }
  }

  

  // functie pentru incarcarea membrilor
  // const loadMembers = async () => {
  //   try {
  //     const fetchedMembers = await agent.Membrii.getAll();

  //     const serializedMembers = fetchedMembers.map((member: Membru) => ({
  //       ...member,
  //       dataNasterii: new Date(member.dataNasterii).toISOString(),
  //     }));

  //     dispatch(memberActions.setMembers(serializedMembers));
  //   } catch (error) {
  //     console.error('Error loading members:', error);
  //   }
  // };

  // functie pentru deschiderea modalului
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


  // functie pentru inchiderea modalului
  const handleClose = () => {
    dispatch(memberActions.setOpenDialog(false));
  };

  // functie pentru cand un camp din modal sufera schimbari
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // calcularea varstei
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

  // functie pentru salvarea modalului cu input-ul respectiv
  // si implicit trimiterea acestora catre server
  const handleSaveWithGrade = async (currentMember: Membru) => {
    try {
      if (isEditing) {
        await agent.Membrii.editMembru(currentMember.membruId, currentMember);
      } else {
        await agent.Membrii.addMembru(currentMember);
      }

      // await loadMembers(); // Ensure that members are reloaded after saving
      dispatch(fetchMembersAsync());

      handleClose();
    } catch (error) {
      console.error('Error saving member:', error);
    }
  };

  // functie pentru stergerea unui membru
  const handleDelete = async (member: Membru) => {
    console.log("Deleting member with ID: ", member.membruId);
    await agent.Membrii.deleteMembru(member.membruId);
    // await loadMembers();
    dispatch(fetchMembersAsync());


  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <MembruSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl>
            <RadioGroup>
              {sortOptions.map(({ value, label }) => (
                <FormControlLabel value={value} control={<Radio />} label={label} />

              ))}
            </RadioGroup>
          </FormControl>
        </Paper>

      </Grid>

      <Grid item xs={9}>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add Member
        </Button>

        <Grid container spacing={1}>
          {members.map((member: Membru) => (
            <Grid item xs={12} key={member.membruId}>
              <MemberCard
                key={member.membruId}
                member={member}
                onEdit={handleOpen}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={3} />
      <Grid item xs={9}>
        <Box display='flex' justifyContent='space-between' alignItems={'center'}>
          <Typography>
            Displaying 1-6 of 22 items
          </Typography>
          <Pagination
            color="secondary"
            size="large"
            count={10}
            page={2}
          />
        </Box>
      </Grid>




      <MemberDialog
        open={open}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSave={handleSaveWithGrade}
        isEditing={isEditing}
        currentMember={currentMember}
      />
    </Grid>

  );


}