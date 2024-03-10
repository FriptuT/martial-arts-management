import { Button, Card, CardActions, CardContent, CardMedia, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import agent from "../../app/connApi/agent";
import { Membru } from "../../app/models/membru";



export default function MemberList() {
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState<Membru>({
    membruId: 0,
    email: '',
    parola: '',
    nume: '',
    dataNasterii: new Date(),
    gen: '',
    tipMembru: '',
    nrLegitimatie: 0,
    activ: false,
    varsta: 0,
    poza: ''
  });

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    const fetchedMembers = await agent.Membrii.getAll();
    console.log("members fetched: ", fetchedMembers);
    setMembers(fetchedMembers);
  };

  const handleOpen = (member?: Membru) => {
    if (member) {
      setIsEditing(true);
      setCurrentMember(member);
    } else {
      setIsEditing(false);
      setCurrentMember({
        membruId: 0,
        email: '',
        parola: '',
        nume: '',
        dataNasterii: new Date(),
        gen: '',
        tipMembru: '',
        nrLegitimatie: 0,
        activ: false,
        varsta: 0,
        poza: ''
      });
    }
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // Special handling for birth date
    if (name === 'dataNasterii') {
      const birthDate = new Date(value);
      const ageDiffMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDiffMs); // miliseconds from epoch
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);

      setCurrentMember(prev => ({
        ...prev,
        dataNasterii: birthDate,
        varsta: calculatedAge // Update the age based on the birth date
      }));
    }
    else {
      setCurrentMember(prev => ({
        ...prev,
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

  // Add picture
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUrlChange = (event: any) => {
    setImageUrl(event.target.value);
    setCurrentMember(prev => ({
      ...prev,
      poza: event.target.value // Set the image URL for the current member
    }));
  };


  // Render member cards with unique images
  const renderMemberCards = () => {
    return members.map((member: Membru) => (
      <Card key={member.membruId} sx={{ display: 'flex', marginBottom: 2 }}>
        {member.poza && (
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={member.poza} // Display member's unique image
            alt="preview"
          />
        )}
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
    ));
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
            value={currentMember.dataNasterii instanceof Date ? currentMember.dataNasterii.toISOString().split('T')[0] : currentMember.dataNasterii}
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
            label="Image URL"
            variant="outlined"
            value={imageUrl}
            onChange={handleImageUrlChange}
          />
          <br />

          <FormControlLabel
            control={
              <Checkbox
                checked={currentMember.activ}
                onChange={e => setCurrentMember({ ...currentMember, activ: e.target.checked })}
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