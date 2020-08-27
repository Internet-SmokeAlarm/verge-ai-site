import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@material-ui/core";


class Dashboard extends PureComponent {
  componentDidMount() {
    const { selectDashboard } = this.props;
    selectDashboard();
  }

  render() {
    const {
    } = this.props;

    return (
      <Fragment>
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  selectDashboard: PropTypes.func.isRequired
};

export default Dashboard;
