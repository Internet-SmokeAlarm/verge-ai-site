import React, { Fragment, useContext } from "react";
import { Typography, withStyles } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Auth, Cache } from 'aws-amplify';
import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import VergeAIAPI from '../../../shared/API';
import '../../../config.js';
import { ProjectListContext, SelectedProjectContext } from '../Contexts';
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

    const selectedProjectContext = useContext(SelectedProjectContext);
    const projectListContext = useContext(ProjectListContext);
    let history = useHistory();

    async function createNewProject() {
        const api = new VergeAIAPI(await loadUserFromCache());
        api.createProject(name, description)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                projectListContext.addProject(data["name"], data["ID"]);
                selectedProjectContext.setSelectedProject(data["ID"]);
                history.push('/c/projects/' + data["ID"] + '/experiments');
            })
            .catch((e) => {
                console.log(e);
            });
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
