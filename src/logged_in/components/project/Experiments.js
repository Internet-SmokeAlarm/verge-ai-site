import React, { Fragment, useState, useContext } from "react";
import { Typography, withStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CreateExperiment } from './CreateExperiment';
import CreateJobs from './CreateJobs';
import '../../../config.js';
import { SelectedProjectContext } from '../Contexts';
import { loadProjectInformation } from '../../../shared/functions/api';

const styles = theme => ({
    root: {
      flexGrow: 1,
    }
});

const GreenTextTypography = withStyles({
  root: {
    color: "#16a513"
  }
})(Typography);

const OrangeTextTypography = withStyles({
  root: {
    color: "#c98c09"
  }
})(Typography);

const RedTextTypography = withStyles({
  root: {
    color: "#c90909"
  }
})(Typography);

function Experiments(props) {
    const [experimentDialogOpen, setExperimentDialogOpen] = useState(false);
    const [jobDialogOpen, setJobDialogOpen] = useState(false);

    const selectedProjectContext = useContext(SelectedProjectContext);
    loadProjectInformation(selectedProjectContext, false);

    const project = selectedProjectContext.project;

    let experimentCards = [];
    if (Object.keys(project).length != 0) {
        Object.keys(project.experiments).map((value, index) => {
            const job_info = [];
            for (const [expJobKey, expJobValue] of Object.entries(project.experiments[value].jobs)) {
                job_info.push((<TableRow key={expJobValue.ID}>
                    <TableCell></TableCell>
                    <TableCell>{expJobValue.ID}</TableCell>
                    <TableCell>{expJobValue.ID}</TableCell>
                    <TableCell>{expJobValue.ID}</TableCell>
                    <TableCell>{expJobValue.ID}</TableCell>
                </TableRow>));
            }

            experimentCards.push(<Grid item xs={12}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                    >
                        <Typography>
                            {project.experiments[value].name}
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Grid container>
                            <Grid container spacing={0}>
                                <Grid container xs={8} direction="column">
                                    <Typography>
                                        Description
                                    </Typography>
                                    {project.experiments[value].description}
                                </Grid>
                                <Grid container xs={2} direction="column">
                                    <Typography>
                                        ID
                                    </Typography>
                                    <Typography>
                                        {value}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} align="right">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => {setJobDialogOpen(true)}}
                                    >
                                        + Add Job(s)
                                    </Button>
                                </Grid>
                            </Grid>

                            <Grid container spacing={5} >
                                <Grid item xs={12} />

                                <Grid item xs={12}>
                                    <TableContainer>
                                        <Table size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Status</TableCell>
                                                    <TableCell>Job ID</TableCell>
                                                    <TableCell>Started On</TableCell>
                                                    <TableCell>Time Elapsed</TableCell>
                                                    <TableCell/>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {job_info}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </Grid>

                    </AccordionDetails>

                    <Divider />

                    <AccordionActions>
                    </AccordionActions>
                </Accordion>
            </Grid>);
        });
    }

    return (
        <Fragment>
            <div className={props.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} align="right">
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {setExperimentDialogOpen(true)}}
                        >
                            Create Experiment
                        </Button>
                    </Grid>

                    {experimentCards}
                </Grid>

                <CreateExperiment
                    experimentDialogOpen={experimentDialogOpen}
                    setExperimentDialogOpen={setExperimentDialogOpen} />

                <CreateJobs
                    jobDialogOpen={jobDialogOpen}
                    setJobDialogOpen={setJobDialogOpen}
                    selectedProjectContext={selectedProjectContext} />
            </div>
        </Fragment>
    );
}

export default withStyles(styles, { withTheme: true })(Experiments);
