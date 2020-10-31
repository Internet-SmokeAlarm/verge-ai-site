import React, { Fragment, PureComponent } from "react";
import { Typography, withStyles } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Auth } from 'aws-amplify';
import { Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import '../../../config.js';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    justifyContent: 'center',
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const styles = theme => ({
    profileHeader: {
        fontFamily: "DIN 2014",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 18,
        paddingBottom: theme.spacing(2),
        textTransform: "uppercase",
        color: "#393A3E"
    },
    textField: {
        paddingBottom: theme.spacing(2)
    },
    wrapper: {
        paddingBottom: theme.spacing(6)
    },
    root: {
      flexGrow: 1,
    },
    padding: {
      padding: theme.spacing(3),
    },
    demo1: {
      backgroundColor: theme.palette.background.paper,
    }
});

class Project extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            user: null,

            project: null,
            tabValue: 0
        }
    }

    componentDidMount() {
        this.loadUserInfo();
    }

    async loadUserInfo() {
        let user = await Auth.currentAuthenticatedUser({
            bypassCache: true
        });

        this.setState({ user: user });

        this.loadProject();
    };

    loadProject = () => {
        let jwt = this.state.user.signInUserSession.accessToken.jwtToken;

        fetch(`${global.config.api.baseUrl}/project/get/${this.props.match.params.id}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Authorization': jwt,
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    project: data
                });

                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    handleChange = (event, newValue) => {
        this.setState({ tabValue: newValue });
    };

    render() {
        return (
            <Fragment>
                    <div className={this.props.root}>
                        <div className={this.props.demo1}>
                            <AntTabs value={this.state.tabValue} onChange={this.handleChange} aria-label="ant example" centered>
                                <AntTab label="Experiments" value={0} />
                                <AntTab label="Devices" value={1} />
                                <AntTab label="Models" value={2} />
                            </AntTabs>
                            <TabPanel value={this.state.tabValue} index={0}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} align="right">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                        >
                                            Create Experiment
                                        </Button>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={this.state.tabValue} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel value={this.state.tabValue} index={2}>
                                Item Three
                            </TabPanel>
                        </div>
                    </div>
            </Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Project);
