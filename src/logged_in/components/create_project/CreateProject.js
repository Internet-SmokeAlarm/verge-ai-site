import React, { Fragment, PureComponent } from "react";
import { Typography, withStyles } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Auth, Cache } from 'aws-amplify';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import VergeAIAPI from '../../../shared/API';
import '../../../config.js';
import { loadUserFromCache } from '../../../shared/functions/auth';

const styles = theme => ({
    profileHeader: {
        fontFamily: "DIN 2014",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 18,
        paddingBottom: theme.spacing(2),
        textTransform: "uppercase",
        color: "#393A3E"
    },
    textField: {
        paddingBottom: theme.spacing(2)
    },
    wrapper: {
        paddingBottom: theme.spacing(6)
    }
});

function CreateProject(props) {
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [redirect, setRedirect] = useState(null);
    const [newProjectId, setNewProjectId] = useState(null);

    async function createNewProject() {
        const api = new VergeAIAPI(await loadUserFromCache());
        api.createProject(name, description)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setNewProjectId(data["ID"]);
                setRedirect(true);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    // When we create a new project, we want to redirect to the project page
    if (redirect) {
        return <Redirect to={'c/projects/' + newProjectId}  />
    }

    return (
        <Fragment>
            <div className={props.classes.wrapper}>
                <form noValidate autoComplete="off">
                    <Typography
                        className={props.classes.profileHeader}
                    >
                        Create new project
                    </Typography>


                    <TextField
                        id="name"
                        variant="filled"
                        label="Name"
                        className={props.classes.textField}
                        onChange={(event) => setName(event.target.value)} />

                    <br />

                    <TextField
                        id="description"
                        variant="filled"
                        label="Description"
                        className={props.classes.textField}
                        onChange={(event) => setDescription(event.target.value)} />

                    <br />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={createNewProject}
                    >
                        Create Project
                    </Button>
                </form>
            </div>
        </Fragment>
    );
}

export default withStyles(styles, { withTheme: true })(CreateProject);
