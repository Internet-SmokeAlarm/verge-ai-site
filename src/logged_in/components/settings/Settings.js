import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import { Typography, Box, withStyles } from "@material-ui/core";
import Profile from './Profile';

const styles = theme => ({
    wrapper: {
        position: "relative",
        backgroundColor: theme.palette.background.default,
        paddingBottom: theme.spacing(2)
    }
});

class Settings extends PureComponent {
    componentDidMount() {
    }

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <Profile />
            </Fragment>
        );
    }
}

Settings.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(Settings);
