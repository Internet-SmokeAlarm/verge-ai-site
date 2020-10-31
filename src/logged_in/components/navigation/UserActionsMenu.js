import React from "react";
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function UserActionsMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const links = [
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

    async function signOut() {
        try {
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

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

export default UserActionsMenu;
