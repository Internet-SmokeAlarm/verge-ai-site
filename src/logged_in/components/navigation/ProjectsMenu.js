import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Typography, withStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useState } from 'react';
import '../../../config.js';
import { SelectedProjectContext, ProjectListContext } from '../Contexts';

const styles = theme => ({
    menu: {
        color: theme.palette.common.white
    },
    primaryColorDecoration: {
        textDecoration: "none !important",
        color: theme.palette.primary
    }
});

function getSelectedProjectName(projects, selectedProjectId) {
    for (let project of projects) {
        if (project["id"] === selectedProjectId) {
            return project["name"];
        }
    }

    return "Select Project";
}

function ProjectsMenu(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div>
            <ProjectListContext.Consumer>
                {({ projects }) => (
                    <SelectedProjectContext.Consumer>
                        {({ selectedProject, setSelectedProject }) => (
                            <Button
                                variant="outlined"
                                onClick={(event) => { setAnchorEl(event.currentTarget); }}
                            >
                                <Typography
                                    variant="h5"
                                    className={props.classes.menu}
                                    display="inline"
                                >
                                    {getSelectedProjectName(projects, selectedProject)}
                                </Typography>

                                <ArrowDropDownIcon
                                    className={props.classes.menu}
                                />
                            </Button>
                        )}
                    </SelectedProjectContext.Consumer>
                )}
            </ProjectListContext.Consumer>

            <Dialog
                open={dialogOpen}
                onClose={() => { setAnchorEl(null); setDialogOpen(false); }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">My Projects</DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Last Accessed</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <ProjectListContext.Consumer>
                                    {({ projects }) => (
                                        projects.map((value, index) => {
                                            return (
                                                <TableRow key={value.name}>
                                                    <TableCell component="th" scope="row">
                                                        {value.name}
                                                    </TableCell>
                                                    <TableCell>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Button
                                                        >
                                                            <MoreVertIcon />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </ProjectListContext.Consumer>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setAnchorEl(null); setDialogOpen(false); }} color="primary">
                        Close
                    </Button>

                    <Button onClick={() => { setAnchorEl(null); setDialogOpen(false); }} color="primary">
                        <Link
                          key="new_project"
                          to="/c/new_project/"
                          className={props.classes.linkDecoration}
                        >
                            Create New Project
                        </Link>
                    </Button>

                </DialogActions>
            </Dialog>

            <Menu
                id="projects-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => { setAnchorEl(null); }}
            >
                <MenuItem onClick={() => { setAnchorEl(null); setDialogOpen(true); }}>Manage My Projects</MenuItem>

                <Divider />

                <ProjectListContext.Consumer>
                    {({ projects }) => (
                        <SelectedProjectContext.Consumer>
                            {({ selectedProject, setSelectedProject }) => (
                                Object.keys(projects).map((value, index) => {
                                    return (
                                        <MenuItem
                                            onClick={() => { setAnchorEl(null); setSelectedProject(projects[value]["id"]); }}
                                        >
                                            <Link
                                              key={value}
                                              to={"/c/projects/" + projects[value]["id"] + "/experiments"}
                                              className={props.classes.linkDecoration}
                                            >
                                                {projects[value].name}
                                            </Link>
                                        </MenuItem>
                                    );
                                })
                            )}
                        </SelectedProjectContext.Consumer>
                    )}
                </ProjectListContext.Consumer>
            </Menu>
        </div>
    );
}

export default withStyles(styles)(ProjectsMenu);
