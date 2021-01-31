import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  main: {
    textAlign: "center",
    '& button': {
      margin: 4
    },
  },
  link: {
    color: "#000000",
    textDecoration: "none"
  }
}));

export default function HomePage() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Helmet>
        <title>Homework Manager</title>
      </Helmet>
      <main className={styles.main}>
        <h3 style={{margin: 8}}>Homework Manager</h3>
        <Link to="/classes" className={styles.link}>
          <Button variant="contained" size="small" disableElevation><strong>Classes</strong></Button>
        </Link>
        <Tooltip title="Coming soon!"><Button variant="contained" size="small" disableElevation><strong>Todo</strong></Button></Tooltip>
        <Tooltip title="Coming soon!"><Button variant="contained" size="small" disableElevation><strong>Grades</strong></Button></Tooltip>
      </main>
    </div>
  );
}