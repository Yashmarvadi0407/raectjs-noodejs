import React from "react";
import Button from "@trenchaant/pkg-ui-component-library/build/Components/Button";
import TextField from "@trenchaant/pkg-ui-component-library/build/Components/TextField";
import Dialog from "@trenchaant/pkg-ui-component-library/build/Components/Dialog";
import DialogActions from "@trenchaant/pkg-ui-component-library/build/Components/DialogActions";
import DialogContent from "@trenchaant/pkg-ui-component-library/build/Components/DialogContent";
import DialogTitle from "@trenchaant/pkg-ui-component-library/build/Components/DialogTitle";
import { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";

import { storage } from "../firebaseConfig";

export default function FormDialog({ updatehan, row }) {
  const [open, setOpen] = React.useState(false);

  const [profile, setProfile] = useState();
  const [user, setUser] = useState(row);
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

  const submithan = (e) => {
    e.preventDefault();
    console.log("submit user", user);
    updatehan({ ...user, profile });
    setOpen(false);
  };

  function handleChange(event) {
    const file = event.target.files[0];
    console.log(event.target.files);
    console.log("FILES : ==========>", URL.createObjectURL(file));
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
      (err) => {
        console.log("ERROR :", err);
      },
      () => {
        // download url
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log("AVATAR URL : ------------->", url);
          console.log(user, "/");
          setProfile(url, "uuuuuuuuuuuuuuurleeeeeeeeeee");
        });
      }
    );
  }
  return (
    <>
      <EditIcon onClick={handleClickOpen} style={{ marginLeft: 10 }}></EditIcon>

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
    </>
  );
}
