import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import ViewListOutlinedIcon from '@material-ui/icons/ViewListOutlined';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import { useSnackbar } from 'notistack';

require('dotenv').config();
const LOCAL_STORAGE_VERSION = process.env.REACT_APP_LOCAL_STORAGE_VERSION;

const useStyles = makeStyles((theme) => ({
  footer: {
    textAlign: "center"
  }
}));

export default function Footer(props) {
  const { setEditOpen, classes, setClasses } = props;
  const [exportDialogOpen, setExportDialogOpen] = React.useState(false);
  const styles = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  function exportData() {
    let filename = `linkaiwu_homeworkmanager_classes.json`;
    let contentType = "application/json;charset=utf-8;";
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify({ version: LOCAL_STORAGE_VERSION, classes: classes })))], { type: contentType });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var a = document.createElement('a');
      a.download = filename;
      a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify({ version: LOCAL_STORAGE_VERSION, classes: classes }));
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    enqueueSnackbar('Export successful!', { variant: 'success' });
  }

  function importData(e) {
    const file = e.target.files[0];
    if (!file) return;

    e.target.value = null;

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
      const data = JSON.parse(reader.result);
      if (!data.version || !data.classes) return enqueueSnackbar('Error while importing data: Invalid file!', { variant: 'error' });
      if (data.version !== LOCAL_STORAGE_VERSION) return enqueueSnackbar('Error while importing data: File data needs to be updated, a future update will support this!', { variant: 'error' });
      setClasses(data.classes);
      enqueueSnackbar('Import successful!', { variant: 'success' });
    };
    reader.onerror = function() {
      return enqueueSnackbar(`Error while importing data: ${reader.error}`, { variant: 'error' });
    };
  }

  return (
    <footer className={styles.footer}>
      <Tooltip title="Edit"><IconButton size="small" onClick={() => setEditOpen(true)}><ViewListOutlinedIcon/></IconButton></Tooltip>
      <Tooltip title="Export Data" onClick={() => setExportDialogOpen(true)}><IconButton size="small"><SaveAltIcon/></IconButton></Tooltip>
      <input accept="application/JSON" type="file" style={{display:"none"}} id="import-data-button" onChange={importData}/>
      <label htmlFor="import-data-button">
        <Tooltip title="Import Data"><IconButton size="small" component="span"><PublishOutlinedIcon/></IconButton></Tooltip>
      </label>

      <Dialog open={exportDialogOpen} onClose={() => setExportDialogOpen(false)}>
        <DialogTitle onClose={() => setExportDialogOpen(false)}>Export Data</DialogTitle>
        <DialogContent>
          Download a JSON file of the classes data. This data can be imported using the Import Data feature.
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => {exportData(); setExportDialogOpen(false)}}>Download</Button>
        </DialogActions>
      </Dialog>
    </footer>
  )
}
