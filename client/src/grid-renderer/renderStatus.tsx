import * as React from 'react';
import clsx from 'clsx';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Chip from '@material-ui/core/Chip';
import { GridCellParams } from '@material-ui/x-grid';
import { Theme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme();
const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        justifyContent: 'left',
        '& .icon': {
          color: 'inherit',
        },
      },
      open: {
        color: theme.palette.info.dark,
        border: `1px solid ${theme.palette.info.main}`,
      },
      closed: {
        color: theme.palette.success.dark,
        border: `1px solid ${theme.palette.success.main}`,
      },
      draft: {
        color: theme.palette.warning.dark,
        border: `1px solid ${theme.palette.warning.main}`,
      },
    }),
  { defaultTheme },
);

interface StatusProps {
  status: string;
}

const Status = React.memo((props: StatusProps) => {
  const { status } = props;
  let icon: any = null;
  const classes = useStyles();
  if (status === 'closed') {
    icon = <InfoIcon className="icon" />;
  } else if (status === 'draft') {
    icon = <WarningIcon className="icon" />;
  } else if (status === 'open') {
    icon = <AutorenewIcon className="icon" />;
  }
  let label = status;
  return (
    <Chip
      className={clsx(classes.root, classes[status as "open" | "root" | "closed" | "draft"])}
      icon={icon}
      size="small"
      label={label}
      variant="outlined"
    />
  );
});

export function renderStatus(params: GridCellParams) {
  return <Status status={params.value!.toString()} />;
}