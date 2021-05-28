import * as React from 'react';
import Chip from '@material-ui/core/Chip';
import { GridCellParams } from '@material-ui/x-grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import Button from '@material-ui/core/Button';

export interface LabelData {
  name: string;
  color: string;
  description: string;
}
interface LabelsArray {
  arr: Array<LabelData>;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }),
);

const Labels = React.memo((props: LabelsArray) => {
  const classes = useStyles();
  const { arr } = props;
  const [openDialog, setDialogOpen] = React.useState(false);
  const [currentDialogData, setCurrentDialogData] = React.useState<LabelData>();
  const openDescDialog = (data: LabelData) => {
    setDialogOpen(true);
    setCurrentDialogData(data);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };
  return (
    <Box display="flex" flexDirection="row" alignItems="center" justifyItems="flex-start" flexWrap="nowrap">
      {arr.map((data, index) => {
        return (
          <Box key={index.toString()}>
            <Chip
              color='primary' style={{ backgroundColor: "#" + data.color }}
              label={data.name}
              className={classes.chip}
              onClick={() => openDescDialog(data)}
            />
          </Box>
        );
      })}
      {currentDialogData && (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openDialog}>
          <DialogTitle id="customized-dialog-title">
            {currentDialogData.name}
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              {currentDialogData.description}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Close
                  </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>


  );
});

export function renderLabels(params: GridCellParams) {
  let labels = params.value as Array<LabelData>
  return <Labels arr={labels} />;
}