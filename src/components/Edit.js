import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const useStyles = makeStyles((theme) => ({
  dialog: {
    maxHeight: "80%",
    padding: 24,
    background: "#ffffff",
    overflow: "auto",
    textAlign: "center",
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    },
    '& .MuiButton-root': {
      margin: theme.spacing(1),
      alignItems: "center"
    },
  },
  dialogClassRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default function Edit(props) {
  const { editOpen, setEditOpen, classes, setClasses } = props;
  const [tempClasses, setTempClasses] = React.useState([]);
  const styles = useStyles();

  React.useEffect(() => {
    setTempClasses(classes);
  }, [classes]);

  function addBlankClass() {
    setTempClasses([...tempClasses, { id: uuidv4(), name: "", meetingURL: "", notes: "", color: "" }]);
  }

  function handleFieldChange(classItem, key, value) {
    setTempClasses(tempClasses.map(item => (
      {
        id: item.id,
        name: (classItem.id === item.id && key === "name") ? value : item.name,
        meetingURL: (classItem.id === item.id && key === "meetingURL") ? value : item.meetingURL,
        notes: (classItem.id === item.id && key === "notes") ? value : item.notes,
        color: (classItem.id === item.id && key === "color") ? value : item.color 
      }
    )));
  }

  function handleDeleteClass(classID) {
    setTempClasses(tempClasses.filter(classItem => classItem.id !== classID));
  }

  function handleOnClose() {
    setClasses(tempClasses);
    setEditOpen(false);
  }

  return (
    <Dialog open={editOpen} onClose={handleOnClose} maxWidth="md">
      <DialogContent>
        <div className={styles.dialog}>
          {tempClasses.map((classItem) => (
            <form autoComplete="off" key={classItem.id}>
              <div className={styles.dialogClassRow}>
                <TextField variant="filled" size="small" label="Name" defaultValue={classItem.name} onChange={(e) => handleFieldChange(classItem, "name", e.target.value)}/>
                <TextField variant="filled" size="small" label="Meeting URL" defaultValue={classItem.meetingURL} onChange={(e) => handleFieldChange(classItem, "meetingURL", e.target.value)}/>
                <TextField variant="filled" size="small" label="Notes" defaultValue={classItem.notes} onChange={(e) => handleFieldChange(classItem, "notes", e.target.value)}/>
                <TextField variant="filled" size="small" label="Color" defaultValue={classItem.color} onChange={(e) => handleFieldChange(classItem, "color", e.target.value)}/>
                <IconButton size="small" color="secondary" onClick={() => handleDeleteClass(classItem.id)}><DeleteOutlinedIcon/></IconButton>
              </div>
            </form>
          ))}
          <IconButton size="small" onClick={addBlankClass}><AddCircleOutlineOutlinedIcon/></IconButton>
          <div><small>Note: All data is saved locally.</small></div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
