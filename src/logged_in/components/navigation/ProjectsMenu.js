import React from "react";
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

function ProjectsMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const projects = [
        {
            "key": "Project1",
            "to": "/c/projects/1",
            "text": "Project 1",
            "onClick": null
        }
    ]

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                variant="outlined"
                onClick={handleClick}
            >
                <Typography
                    variant="h5"
                    className={props.projectsMenu}
                    display="inline"
                >
                    My First Project
                </Typography>

                <ArrowDropDownIcon
                    className={props.projectsMenu}
                />
            </Button>

            <Menu
                id="projects-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {projects.map((value, index) => {
                    return (
                        <Link
                          key={value.key}
                          to={value.to}
                          className={props.linkDecoration}
                          onClick={value.onClick}
                        >
                            <MenuItem onClick={handleClose}>{value.text}</MenuItem>
                        </Link>
                    );
                })}
            </Menu>
        </div>
    );
}

export default ProjectsMenu
