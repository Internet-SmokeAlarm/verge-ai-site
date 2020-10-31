import React, { PureComponent, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
import PropTypes from "prop-types";
import classNames from "classnames";
import {
    AppBar,
    Toolbar,
    Typography,
    Avatar,
    Drawer,
    List,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Hidden,
    Tooltip,
    Box,
    withStyles
} from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Image from "../../../shared/imgs/white_logo.png";
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import UserActionsMenu from './UserActionsMenu';
import ProjectsMenu from './ProjectsMenu';
import { loadUserFromCache } from '../../../shared/functions/auth';

const styles = theme => ({
    appBar: {
        boxShadow: theme.shadows[6],
        backgroundColor: theme.palette.blue.blue1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.down("xs")]: {
            width: "100%",
            marginLeft: 0
        }
    },
    appBarToolbar: {
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        },
        [theme.breakpoints.up("md")]: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3)
        },
        [theme.breakpoints.up("lg")]: {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4)
        }
    },
    drawerPaper: {
        height: "100%vh",
        whiteSpace: "nowrap",
        border: 0,
        width: theme.spacing(7),
        overflowX: "hidden",
        marginTop: theme.spacing(8),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9)
        },
        backgroundColor: theme.palette.common.black
    },
    smBordered: {
        [theme.breakpoints.down("xs")]: {
            borderRadius: "50% !important"
        }
    },
    iconListItem: {
        width: "auto",
        borderRadius: theme.shape.borderRadius,
        paddingTop: 11,
        paddingBottom: 11,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    mobileItemSelected: {
        backgroundColor: `${theme.palette.primary.main} !important`
    },
    username: {
      paddingLeft: 0,
      paddingRight: theme.spacing(2),
      color: theme.palette.common.white
    },
    justifyCenter: {
        justifyContent: "center"
    },
    permanentDrawerListItem: {
        justifyContent: "center",
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    cover: {
        width: "12%",
        height: "12%",
        marginRight: theme.spacing(1)
    },
    menu: {
        color: theme.palette.common.white
    },
    noDecoration: {
        textDecoration: "none !important",
        color: theme.palette.common.black
    },
    primaryColorDecoration: {
        textDecoration: "none !important",
        color: theme.palette.primary
    }
});

function NavBar(props) {
    const [username, setUsername] = useState(null);

    loadUserFromCache()
        .then((data) => {
            setUsername(data.username);
        })
        .catch((e) => {
            console.log(e);
        });

    return (
        <Fragment>
            <AppBar position="sticky" className={props.classes.appBar}>
                <Toolbar className={props.classes.appBarToolbar}>
                    <Box display="flex" alignItems="center">
                        <Hidden xsDown>
                            <CardMedia
                                component="img"
                                className={props.classes.cover}
                                src={Image}
                            />

                            <ProjectsMenu />
                        </Hidden>
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center"
                        width="100%"
                    >
                        <ListItem
                            disableGutters
                            className={classNames(props.classes.iconListItem, props.classes.smBordered)}
                        >
                            <UserActionsMenu
                                username={username}
                                userActionsMenu={props.classes.menu}
                                linkDecoration={props.classes.noDecoration}
                            />
                        </ListItem>
                    </Box>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(NavBar);
