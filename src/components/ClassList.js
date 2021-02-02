import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ViewListOutlinedIcon from '@material-ui/icons/ViewListOutlined';

const useStyles = makeStyles((theme) => ({
  classlist: {
    paddingTop: 32,
    paddingBottom: 32
  },
  paper: {
    height: "20vh",
    width: "20vh",
    background: "lightgray", /* default color */
    fontSize: "3vh",
    userSelect: "none"
  },
  span: {
    lineHeight: 1,
    color: "white"
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default function ClassList(props) {
  const { classes, dialogsOpen, setDialogsOpen } = props;
  const styles = useStyles();

  function handleClick(classID) {
    setDialogsOpen(dialogsOpen.map(item => (
      {
        id: item.id,
        open: (classID === item.id) ? true : item.open
      }
    )));
  }

  return (
    <div className={styles.classlist}>
      <Grid container justify="center" style={{gap: 6}}>
          {classes.map(classItem => (
            <Grid item key={classItem.id}>
              <Paper className={`${styles.paper} ${styles.center}`} style={{background: classItem.color}} onClick={() => {handleClick(classItem.id)}}>
                <div style={{textAlign:"center"}}>
                  <span className={styles.span}>{classItem.name}</span>
                </div>
              </Paper>
            </Grid>
          ))}
          {classes.length === 0 ? <span>Click on <ViewListOutlinedIcon style={{verticalAlign:"text-bottom"}}/> to add your classes!</span> : null}
      </Grid>
    </div>
  )
}
