import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditDialog({dialogData,setdialogData,open,handleClose,handleUpdate}) {

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
            {Object.keys(dialogData).map((key) => {
                return (
                    <TextField
                        autoFocus
                        margin="dense"
                        key={key}
                        label={key}
                        type="text"
                        fullWidth
                        value={dialogData[key]}
                        onChange={(e) => {
                            setdialogData({ ...dialogData, [key]: e.target.value });
                        }}
                    />
                )
            })}
        </DialogContent>
        <DialogActions>
          <Button key="cancel" onClick={handleClose}>Cancel</Button>
          <Button key="Update" onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}