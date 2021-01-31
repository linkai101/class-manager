import React from 'react'
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import ViewListOutlinedIcon from '@material-ui/icons/ViewListOutlined';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Clock from './Clock';
import ClassList from './ClassList';
import ClassDialogs from './ClassDialogs';
import Options from './Options';

const LOCAL_STORAGE_KEY = 'linkaiwu.homeworkManager.classes';
const LOCAL_STORAGE_VERSION_KEY = 'linkaiwu.homeworkManager.classes.version';
const LOCAL_STORAGE_VERSION = "1";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  footer: {
    textAlign: "center"
  },
  modalWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    maxHeight: "80%",
    padding: 32,
    paddingLeft: 48,
    paddingRight: 48,
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
  modalClassRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default function Classes() {
  const [classes, setClasses] = React.useState([]);
  const [optionsOpen, setOptionsOpen] = React.useState(false);
  const [dialogsOpen, setDialogsOpen] = React.useState([]);
  const [snackOpen, setSnackOpen] = React.useState(true);
  const styles = useStyles();

  React.useEffect(() => {
    // Read local save
    const storedDataVersion = localStorage.getItem(LOCAL_STORAGE_VERSION_KEY);
    if (storedDataVersion > LOCAL_STORAGE_VERSION)
      return console.log("Error: Outdated client!");
    if (storedDataVersion < LOCAL_STORAGE_VERSION)
      return console.log("Error: Local storage data needs to be updated, a future update will support this!"); // TODO
    const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedData) setClasses(storedData);
  }, [])

  React.useEffect(() => {
    // Update local save
    const storedDataVersion = localStorage.getItem(LOCAL_STORAGE_VERSION_KEY);
    if (!storedDataVersion) localStorage.setItem(LOCAL_STORAGE_VERSION_KEY, LOCAL_STORAGE_VERSION);
    if (storedDataVersion && storedDataVersion !== LOCAL_STORAGE_VERSION)
      return console.log("Error: Could not store data, invalid version!");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(classes));
    setDialogsOpen(classes.map(classItem => ({ id: classItem.id, open: false })));
  }, [classes]);

  return (
    <div className={styles.root}>
      <Helmet>
        <title>Classes</title>
      </Helmet>
      <main>
        <Clock/>
        <ClassList classes={classes} dialogsOpen={dialogsOpen} setDialogsOpen={setDialogsOpen}/>
        <footer className={styles.footer}>
          <Tooltip title="Home"><Link to="/"><IconButton size="small"><HomeOutlined/></IconButton></Link></Tooltip>
          <Tooltip title="Edit"><IconButton size="small" onClick={() => setOptionsOpen(true)}><ViewListOutlinedIcon/></IconButton></Tooltip>
          <Tooltip title="Download Data (coming soon)"><IconButton size="small"><SaveAltIcon/></IconButton></Tooltip>
          <Tooltip title="Upload Data (coming soon)"><IconButton size="small"><PublishOutlinedIcon/></IconButton></Tooltip>
        </footer>
      </main>
      <ClassDialogs dialogsOpen={dialogsOpen} setDialogsOpen={setDialogsOpen} classes={classes}/>
      <Options optionsOpen={optionsOpen} setOptionsOpen={setOptionsOpen} classes={classes} setClasses={setClasses}/>

      <Snackbar autoHideDuration={5000} open={snackOpen} onClose={(e, reason) => {if (reason !== 'clickaway') setSnackOpen(false)}}>
        <MuiAlert elevation={6} variant="filled" severity="info" onClose={(e, reason) => {if (reason !== 'clickaway') setSnackOpen(false)}}>
          This app is in beta! More features and customizability will come soon!
        </MuiAlert>
      </Snackbar>
    </div>
  )
}
