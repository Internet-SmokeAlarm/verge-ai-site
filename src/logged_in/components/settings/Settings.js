import React, { Fragment, useContext } from "react";
import { withStyles } from "@material-ui/core";
import Profile from './Profile';
import ApiKeys from './ApiKeys';

const styles = theme => ({
    wrapper: {
        position: "relative",
        backgroundColor: theme.palette.background.default,
        paddingBottom: theme.spacing(2)
    }
});

function Settings(props) {
    return (
        <Fragment>
            <Profile />
            <ApiKeys />
        </Fragment>
    );
}

export default withStyles(styles, { withTheme: true })(Settings);
