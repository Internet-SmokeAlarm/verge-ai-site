import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@material-ui/core";

class Settings extends PureComponent {
    componentDidMount() {
        const { selectSettings } = this.props;

        console.log("Hello world!!!!!!!!!");
    }

    render() {
        const {
        } = this.props;

        return (
            <Fragment>
            Hello world!
            </Fragment>
        );
    }
}

Settings.propTypes = {
  selectDashboard: PropTypes.func.isRequired
};

export default Settings;
