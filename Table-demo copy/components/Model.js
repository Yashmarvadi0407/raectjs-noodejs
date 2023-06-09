import React from "react";
import Button from "@trenchaant/pkg-ui-component-library/build/Components/Button";
import TextField from "@trenchaant/pkg-ui-component-library/build/Components/TextField";
import Dialog from "@trenchaant/pkg-ui-component-library/build/Components/Dialog";
import DialogActions from "@trenchaant/pkg-ui-component-library/build/Components/DialogActions";
import DialogContent from "@trenchaant/pkg-ui-component-library/build/Components/DialogContent";
import DialogTitle from "@trenchaant/pkg-ui-component-library/build/Components/DialogTitle";
import { useState } from "react";
import { storage } from "../firebaseConfig";
export default function FormDialog({
  user,
  setUser,
  table,
  setTable,
  addUser,
  getdata,arr,setArr
}) {
  const [open, setOpen] = React.useState(false);
  const [profile, setProfile] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let name, value;
  const changehan = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const submithan =async (e) => {
    e.preventDefault();
    await addUser({ ...user, profile });
    await getdata().then((data) => {
      setArr(data.user);
  })

    // console.log("SUBMIT", user);
    setTable([...table, user]);
    setUser({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
    });
    setOpen(false);
  };
  function handleChange(event) {
    const file = event.target.files[0];

    setUser({ ...user, profile }); //
    if (!file) {
      alert("Please upload an image first!");
    }

    const uploadTask = storage.ref(`/files/${file.name}`).put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        console.log(percent);
      },
      (err) => {},
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log("AVATAR URL : ------------->", url);
          setProfile(url, "uuuuuuuuuuuuuuurleeeeeeeeeee");
        });
      }
    );
  }
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        style={{
          marginTop: "0",
          marginLeft: "52%",
          marginBottom: "0%",
          backgroundColor: "#ADD8E6",
          border: "1px solid"
        }}
      >
        ADD USER
      </Button>
      <form>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">User Details</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="profile"
              label="choose your profile"
              type="file"
              value={user.profile}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="firstname"
              label="Enter First name"
              type="text"
              value={user.firstname}
              onChange={changehan}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="lastname"
              label="Enter Last name"
              type="text"
              value={user.lastname}
              onChange={changehan}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              value={user.email}
              onChange={changehan}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="phone"
              label="Enter Phone Number"
              type="text"
              value={user.phone}
              onChange={changehan}
              fullWidth
            />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={submithan} color="primary" type="submit">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
