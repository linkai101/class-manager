import React from 'react';
import dayjs from 'dayjs';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  clock: {
    textAlign: "center",
    lineHeight: 1
  }
}));

export default function Clock() {
  const [time, setTime] = React.useState(new Date());
  const styles = useStyles();
  
  React.useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);
  
  return (
    <div className={styles.clock}>
      <h1 style={{margin: 8, fontSize: "6vh"}}>{dayjs(time).format('h:mm A')}</h1>
      <h2 style={{margin: 8}}>{dayjs(time).format('dddd, MMMM D')}</h2>
    </div>
  )
}
