import React, { PureComponent, Fragment } from "react";
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
    withStyles,
    isWidthUp,
    withWidth
} from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Image from "../../../shared/imgs/white_logo.png";
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


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
    }
});

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

function UserActionsMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const links = [
        {
            "key": "Dashboard",
            "to": "/c/dashboard",
            "text": "Dashboard",
            "onClick": null
        },
        {
            "key": "Settings",
            "to": "/c/settings",
            "text": "Settings",
            "onClick": null
        },
        {
            "key": "Logout",
            "to": "/",
            "text": "Logout",
            "onClick": signOut
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
                    variant="inherit"
                    className={props.userActionsMenu}
                    display="inline"
                >
                    {props.username}
                </Typography>
            </Button>

            <Menu
                id="user-options-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {links.map((value, index) => {
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

class NavBar extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            username: ""
        };
    }

    async getUsername() {
        let user = await Auth.currentAuthenticatedUser({
            bypassCache: true
        });

        this.setState({ username: user.username });
    };

    componentDidMount() {
        this.getUsername();
    }

    render() {
        return (
            <Fragment>
                <AppBar position="sticky" className={this.props.classes.appBar}>
                    <Toolbar className={this.props.classes.appBarToolbar}>
                        <Box display="flex" alignItems="center">
                            <Hidden xsDown>
                                <CardMedia
                                    component="img"
                                    className={this.props.classes.cover}
                                    src={Image}
                                />

                                <ProjectsMenu
                                    projectsMenu={this.props.classes.menu}
                                    linkDecoration={this.props.classes.noDecoration}
                                />
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
                                className={classNames(this.props.classes.iconListItem, this.props.classes.smBordered)}
                            >
                                <UserActionsMenu
                                    username={this.state.username}
                                    userActionsMenu={this.props.classes.menu}
                                    linkDecoration={this.props.classes.noDecoration}
                                />
                            </ListItem>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Fragment>
        );
    }
}

NavBar.propTypes = {
    selectedTab: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
};

export default withWidth()(withStyles(styles, { withTheme: true })(NavBar));
