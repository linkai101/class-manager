import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ClassDialogs(props) {
  const { dialogsOpen, setDialogsOpen, classes } = props;

  function isOpen(classID) {
    if (dialogsOpen.find(item => item.id === classID)) {
      return dialogsOpen.find(item => item.id === classID).open;
    } else return false;
  }

  function handleClose(classID) {
    setDialogsOpen(dialogsOpen.map(item => (
      {
        id: item.id,
        open: (classID === item.id) ? false : item.open
      }
    )));
  }

  function handleClick(classID) {
    handleClose(classID);
    window.open(classes.find(classItem => classItem.id === classID).meetingURL, "_blank");
  }

  return (
    <>
    {classes.map(classItem => (
      <Dialog key={classItem.id} open={isOpen(classItem.id)} onClose={() => handleClose(classItem.id)}>
        <DialogTitle onClose={() => handleClose(classItem.id)}>{classItem.name}</DialogTitle>
        <DialogContent>
          { classItem.meetingURL !== '' ? <span><strong>Meeting URL:</strong> {classItem.meetingURL}<br/></span> : null}
          <i>{classItem.notes}</i>
        </DialogContent>
        <DialogActions>
        {classItem.meetingURL !== '' ? <Button color="primary" onClick={() => handleClick(classItem.id)}>Join Class</Button> : null}
        </DialogActions>
      </Dialog>
    ))}
    </>
  )
}
