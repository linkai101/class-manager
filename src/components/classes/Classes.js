import React from 'react'
import { Helmet } from 'react-helmet-async';

import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import Clock from './Clock';
import ClassList from './ClassList';
import ClassDialogs from './ClassDialogs';
import Options from './Options';
import Footer from './Footer';

require('dotenv').config();
const LOCAL_STORAGE_KEY = process.env.REACT_APP_LOCAL_STORAGE_KEY;
const LOCAL_STORAGE_VERSION_KEY = process.env.REACT_APP_LOCAL_STORAGE_VERSION_KEY;
const LOCAL_STORAGE_VERSION = process.env.REACT_APP_LOCAL_STORAGE_VERSION;

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
  const styles = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    enqueueSnackbar('This app is in beta! More features and customizability will come soon!', { variant: 'info' });
    // Read local save
    const storedDataVersion = localStorage.getItem(LOCAL_STORAGE_VERSION_KEY);
    if (storedDataVersion > LOCAL_STORAGE_VERSION)
      return enqueueSnackbar('Error while reading local save: Outdated app version!', { variant: 'error' });
    if (storedDataVersion < LOCAL_STORAGE_VERSION)
      return enqueueSnackbar('Error while reading local save: Local save data needs to be updated, a future update will support this!', { variant: 'error' });  // TODO: Add old data conversion
    const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedData) setClasses(storedData);
  }, [enqueueSnackbar]);

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
        <Footer setOptionsOpen={setOptionsOpen} classes={classes} setClasses={setClasses}/>
      </main>
      <ClassDialogs dialogsOpen={dialogsOpen} setDialogsOpen={setDialogsOpen} classes={classes}/>
      <Options optionsOpen={optionsOpen} setOptionsOpen={setOptionsOpen} classes={classes} setClasses={setClasses}/>
    </div>
  )
}
