import React from 'react';
import { Helmet } from 'react-helmet-async';

import { makeStyles } from '@material-ui/core/styles';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  notfound: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default function NotFound() {
  const styles = useStyles();
  const location = useLocation();

  return (
    <div className={styles.notfound}>
      <Helmet>
        <title>404</title>
      </Helmet>
      <span style={{marginRight:8}}><strong>{location.pathname}</strong> was not found.</span>
      <Link to="/" style={{ color: '#000000' }}>Go home</Link>
    </div>
  );
}