import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { GridCellParams } from '@material-ui/x-grid';
import '@fontsource/roboto';
import Grid from '@material-ui/core/Grid';

export function renderUser(params: GridCellParams) {
  return (
    <Grid container direction="row" alignItems="center" justify="flex-start" spacing={3}>
      <Grid item>
        <Avatar src={(params.value! as any).avatar_url!.toString()} />
      </Grid>
      <Grid item>
        <div>{(params.value! as any).login!.toString()}</div>
      </Grid>
    </Grid>
  );
}