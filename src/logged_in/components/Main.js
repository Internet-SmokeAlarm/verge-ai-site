import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Auth } from 'aws-amplify';
import { withStyles } from "@material-ui/core";
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useState } from "react";
import { SelectedProjectContext, ProjectListContext, TabContext } from './Contexts';
import VergeAIAPI from '../../shared/API';

const styles = theme => ({
  main: {
    backgroundColor: theme.palette.common.white,
    marginLeft: theme.spacing(9),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0
    }
  }
});

class Main extends PureComponent {

    setSelectedProject = (id) => {
        var selectedProjectState = {...this.state.selectedProjectState};
        selectedProjectState.selectedProject = id;
        this.setState({ selectedProjectState: selectedProjectState });
    }

    setSelectedValue = (value) => {
        var tabContextState = {...this.state.tabContextState};
        tabContextState.value = value;
        this.setState({ tabContextState: tabContextState });
    }

    addProject = (project_name, project_id) => {
        var projectListState = {...this.state.projectListState};
        projectListState.projects.push({
            "name": project_name,
            "id": project_id
        });
        this.setState({ projectListState: projectListState })
    }

    state = {
        user: null,

        projectListState: {
            projects: [],
            addProject: this.addProject
        },

        selectedProjectState: {
            selectedProject: "",
            setSelectedProject: this.setSelectedProject
        },

        tabContextState: {
            value: 0,
            setSelectedValue: this.setSelectedValue
        }
    }

    componentDidMount() {
        this.setup();
    }

    async setup() {
        let user = await Auth.currentAuthenticatedUser({
            bypassCache: true
        });

        new VergeAIAPI(user).loadProjects()
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                var projectListState = {...this.state.projectListState};
                projectListState.projects = data["projects"];
                this.setState({ projectListState: projectListState });
            })
            .catch((e) => {
                console.log(e);
            });

        this.setState({
            user: user
        });

        // If we are on a project page, we want to load the project information at start
        if (window.location.href.split("/")[3] === "c" && window.location.href.split("/")[4] === "projects") {
            this.setSelectedProject(window.location.href.split("/")[5]);
        }

        if (window.location.href.includes("devices")) {
            this.setSelectedValue(1);
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <ProjectListContext.Provider value={this.state.projectListState}>
                    <SelectedProjectContext.Provider value={this.state.selectedProjectState}>
                        <TabContext.Provider value={this.state.tabContextState}>
                            <NavBar />
                        </TabContext.Provider>

                        <main className={classNames(classes.main)}>
                            <Routing />
                        </main>
                    </SelectedProjectContext.Provider>
                </ProjectListContext.Provider>
            </Fragment>
        );
    }
};

Main.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withAuthenticator(withStyles(styles, { withTheme: true })(Main));
