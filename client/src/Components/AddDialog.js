import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddDialog({ dialogData, setdialogData, open, handleClose, handleAdd }) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleAdd}>
          <DialogTitle>Add</DialogTitle>
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
                  required
                />
              )
            })}
          </DialogContent>
          <DialogActions>
            <Button key="cancel" onClick={handleClose}>Cancel</Button>
            <Button type="submit" key="Add">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}