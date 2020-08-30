import React from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import Dashboard from "./dashboard/Dashboard";
import Settings from "./settings/Settings";
import PropsRoute from "../../shared/components/PropsRoute";


const styles = theme => ({
    wrapper: {
        margin: theme.spacing(1),
        width: "auto",
        [theme.breakpoints.up("xs")]: {
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4)
        },
        [theme.breakpoints.up("sm")]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto"
        },
        [theme.breakpoints.up("md")]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            width: "82.5%",
            marginLeft: "auto",
            marginRight: "auto"
        },
        [theme.breakpoints.up("lg")]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            width: "70%",
            marginLeft: "auto",
            marginRight: "auto"
        }
    }
});

function Routing(props) {
    const {
        classes
    } = props;

    return (
        <div className={classes.wrapper}>
            <Switch>
                <PropsRoute
                    path="/c/dashboard"
                    component={Dashboard}
                />
                <PropsRoute
                    path="/c/settings"
                    component={Settings}
                />
            </Switch>
        </div>
    );
}

Routing.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Routing);
