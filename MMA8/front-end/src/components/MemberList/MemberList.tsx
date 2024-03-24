import { Button, Card, CardActions, CardContent, CardMedia, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/connApi/agent";
import { Membru } from "../../app/models/membru";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { memberActions } from "../../store/memberSlice";
import { Grade } from "../../app/models/grade";
import { gradeMembru } from "../../app/models/gradeMembru";


export default function MemberList() {
  const dispatch = useAppDispatch();
  const members = useAppSelector((state) => state.member.members);
  const currentMember = useAppSelector((state) => state.member.currentMember);
  const open = useAppSelector((state) => state.member.openDialog);
  const isEditing = useAppSelector((state) => state.member.isEditing);
  const grade = useAppSelector((state) => state.member.grade);
  const gradMembru = useAppSelector((state) => state.member.gradMembru);
  const grad = useAppSelector((state) => state.member.grad);
  const selectedGradeId = useAppSelector((state) => state.member.selectedGradeId);


  /**
    SPLIT THIS COMPONENT INTO MORE COMPONENTS !!!
  */


  useEffect(() => {
    loadMembers();
    fetchGrades();
  }, []);

  // useEffect(() => {
  //   fetchGrades();
  // }, [])

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
      if (grade && gradMembru) {

        const gradMembruData: gradeMembru = {
          id: gradMembru.id,
          idMembru: currentMember.membruId,
          idGrad: gradMembru.idGrad,
          dataObtinerii: gradMembru.dataObtinerii
        };
        console.log(gradMembruData);

        await agent.GradeMembrii.addGradMembru(gradMembruData);
      }

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



  // Render member cards with unique images
  const renderMemberCards = () => {
    return members.map((member: Membru) => {
      return (

        <Card key={member.membruId} sx={{ display: 'flex', marginBottom: 2 }}>

          {member.poza && (
            <CardMedia
              component="img"
              src={member.poza}
              alt="Selected image"
              height="110"
              width="100"
            />)}
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
              type: {member.tipMembru}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Activ: {member.activ ? 'Yes' : 'No'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button color="primary" onClick={() => handleOpen(member)}>Edit</Button>
            <Button color="secondary" onClick={() => handleDelete(member)}>Delete</Button>
          </CardActions>
        </Card>
      )
    });
  };



  return (
    <Container>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Member
      </Button>

      {renderMemberCards()}

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
            label="Birth Date"
            type="date"
            fullWidth
            variant="outlined"
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
            margin="dense"
            name="grade"
            label="Grade"
            select
            fullWidth
            variant="outlined"
            value={selectedGradeId}
            onChange={(e) =>
              dispatch(memberActions.setSelectedGradeId(e.target.value))
            }
          >
            {grade.map((grade: Grade) => (
              <MenuItem key={grade.id} value={grade.numeGrad}>
                {grade.numeGrad}
              </MenuItem>
            ))}
          </TextField>
          <br />

          <FormControlLabel
            control={
              <Checkbox
                checked={currentMember.activ}
                onChange={e => dispatch(memberActions.setCurrentMember({ ...currentMember, activ: e.target.checked }))}
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
    </Container>
  );

}