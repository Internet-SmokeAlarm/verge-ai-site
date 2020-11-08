import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from "@material-ui/core";

export default function CreateJobs(props) {
    const [numDevices, setNumDevices] = useState(0);
    const [numBackupDevices, setNumBackupDevices] = useState(0);
    const [numJobs, setNumJobs] = useState(1);
    const [deviceSelectionStrategy, setDeviceSelectionStrategy] = useState("RANDOM");
    const [terminationCriteria, setTerminationCriteria] = useState([]);

    function updateTerminationCriteriaType(val, index) {
        let newTerminationCriteria = terminationCriteria.slice();
        newTerminationCriteria[index]["type"] = val;
        newTerminationCriteria[index]["data"] = {};

        setTerminationCriteria(newTerminationCriteria);
    }

    function deleteTerminationCriteria(index) {
        let newTerminationCriteria = terminationCriteria.slice();
        newTerminationCriteria.splice(index, 1);

        setTerminationCriteria(newTerminationCriteria);
    }

    function addTerminationCriteria() {
        let newTerminationCriteria = terminationCriteria.slice();
        newTerminationCriteria.push({
            "type": "TIMEOUT",
            "data": {}
        });

        setTerminationCriteria(newTerminationCriteria);
    }

    function updateTerminationCriteriaData(key, value, index) {
        let newTerminationCriteria = terminationCriteria.slice();
        newTerminationCriteria[index]["data"][key] = value;

        setTerminationCriteria(newTerminationCriteria);
    }

    console.log(terminationCriteria);

    return (
        <Dialog
            open={props.jobDialogOpen}
            onClose={() => {props.setJobDialogOpen(false)}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Add a Job</DialogTitle>
            <DialogContent>
                <form noValidate autoComplete="off">
                    <Grid container spacing={3} direction="row" align="center" alignItems="center">
                        <Grid item xs={6} align="left">
                            <Typography>
                                Number of jobs to create
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Number"
                                variant="outlined"
                                defaultValue="1"
                                onChange={(event) => setNumBackupDevices(event.target.value)}
                            />
                        </Grid>

                        <Grid item xs={6} align="left">
                            <Typography>
                                Number of devices
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Number"
                                variant="outlined"
                                onChange={(event) => setNumDevices(event.target.value)}
                            />
                        </Grid>

                        <Grid item xs={6} align="left">
                            <Typography>
                                Number of backup devices
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Number"
                                variant="outlined"
                                onChange={(event) => setNumBackupDevices(event.target.value)}
                            />
                        </Grid>

                        <Grid item xs={6} align="left">
                            <Typography>
                                Device Selection Strategy
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Select
                                value={deviceSelectionStrategy}
                                onChange={(event) => {setDeviceSelectionStrategy(event.target.value);}}
                            >
                                <MenuItem value={"RANDOM"}>Random</MenuItem>
                                <MenuItem value={"CUSTOM"}>Custom</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={12} />

                        <Grid item xs={6} align="left">
                            <Typography>
                                Termination Criteria
                            </Typography>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => {addTerminationCriteria();}}
                            >
                                + Add Criteria
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <List>
                                {terminationCriteria.map((value, index) => (
                                    <ListItem
                                        key={index}
                                    >
                                        <Grid container spacing={3} direction="row" align="center" alignItems="center">
                                            <Grid item>
                                                <Select
                                                    value={value.type}
                                                    onChange={(event) => {updateTerminationCriteriaType(event.target.value, index);}}
                                                >
                                                    <MenuItem value={"TIMEOUT"}>Timeout</MenuItem>
                                                </Select>
                                            </Grid>

                                            {value.type === "TIMEOUT" && (
                                                <Grid item>
                                                    <TextField
                                                        label="Num Hours"
                                                        variant="outlined"
                                                        onChange={(event) => {updateTerminationCriteriaData("TIMEOUT", event.target.value, index);}}
                                                    />
                                                </Grid>
                                            )}

                                            <Grid item>
                                                <ListItemSecondaryAction>
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="delete"
                                                        onClick={() => {deleteTerminationCriteria(index);}}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {props.setJobDialogOpen(false)}} color="primary">
                    Close
                </Button>
                <Button onClick={() => {props.setJobDialogOpen(false)}} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}
