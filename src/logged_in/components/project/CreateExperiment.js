import React, { useState, useContext } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from "@material-ui/core";
import { loadUserFromCache } from '../../../shared/functions/auth';
import { loadProjectInformation } from '../../../shared/functions/api';
import VergeAIAPI from '../../../shared/API';
import { SelectedProjectContext } from '../Contexts';

export function CreateExperiment(props) {
    const [name, setName] = useState(null);
    const [waiting, setWaiting] = useState(false);

    const selectedProjectContext = useContext(SelectedProjectContext);

    async function submit() {
        setWaiting(true);

        const api = new VergeAIAPI(await loadUserFromCache());
        api.createExperiment(name, selectedProjectContext.selectedProject)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setWaiting(false);
                props.setExperimentDialogOpen(false);
                loadProjectInformation(selectedProjectContext, true);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <Dialog
            open={props.experimentDialogOpen}
            onClose={() => {props.setExperimentDialogOpen(false)}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Create a new Experiment
            </DialogTitle>

            <DialogContent>
                {waiting && (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <LinearProgress />
                        </Grid>
                        <Grid item xs={12} />
                    </Grid>
                )}

                <form noValidate autoComplete="off">
                    <Grid container spacing={3} direction="row" align="center" alignItems="center">
                        <Grid item xs={6}>
                            <Typography>
                                Name
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                onChange={(event) => setName(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {props.setExperimentDialogOpen(false)}} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => submit()}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}
