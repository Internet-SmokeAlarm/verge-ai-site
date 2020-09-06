import React, { Fragment, PureComponent } from "react";
import { Auth } from 'aws-amplify';
import { Typography, withStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    apiKeysHeader: {
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
    generatedApiKeyText: {
        ...theme.typography.button,
        backgroundColor: theme.palette.common.grey,
        textTransform: 'none',
        padding: theme.spacing(1),
    },
    keyGenerationProgressBar: {
        paddingLeft: theme.spacing(2)
    },
    generateApiKeyButton: {
        textAlign: 'right'
    },
    apiKeyHeader: {
        paddingBottom: theme.spacing(2)
    }
});

class ApiKeys extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            user: null,

            apiKeys: [],

            keyGenerationInProgress: false,
            displayGeneratedApiKeyDialog: false,
            generatedApiKey: ""
        };
    }

    componentDidMount() {
        this.loadUserInfo();
    }

    async loadUserInfo() {
        let user = await Auth.currentAuthenticatedUser({
            bypassCache: true
        });

        this.setState({ user: user });

        this.loadAPIKeyInformation();
    }

    async loadAPIKeyInformation() {
        let jwt = this.state.user.signInUserSession.accessToken.jwtToken;

        fetch("https://cs1fngyhi8.execute-api.us-east-1.amazonaws.com/dev/v1/user/get", {
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
                this.setState({ apiKeys: data["api_keys"] });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    handleGenerateApiKey = (event) => {
        let jwt = this.state.user.signInUserSession.accessToken.jwtToken;

        this.setState({ keyGenerationInProgress: true });

        fetch("https://cs1fngyhi8.execute-api.us-east-1.amazonaws.com/dev/v1/auth/create", {
            method: 'POST',
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
                    generatedApiKey: data["key"],
                    displayGeneratedApiKeyDialog: true,
                    keyGenerationInProgress: false
                });
            })
            .catch((e) => {
                console.log(e);

                this.setState({
                    keyGenerationInProgress: false
                });
            });
    }

    handleClose = () => {
        this.setState({
            generatedApiKey: "",
            displayGeneratedApiKeyDialog: false
        });

        // after the user closes the new API key diagram, we want to update the key
        // list to include the new API key.
        this.loadAPIKeyInformation();
    }

    render() {
        return (
            <Fragment>
                <div className={this.props.classes.wrapper}>
                    <Grid container spacing={3} className={this.props.classes.apiKeyHeader}>
                        <Grid item xs={9}>
                            <Typography
                                varient="h1"
                                className={this.props.classes.apiKeysHeader}
                            >
                                API Keys
                            </Typography>
                        </Grid>

                        <Grid item xs={3} className={this.props.classes.generateApiKeyButton}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleGenerateApiKey}
                            >
                                Generate API Key
                            </Button>
                        </Grid>

                        {this.state.keyGenerationInProgress &&
                            <Grid item xs={12}>
                                <div className={this.props.classes.keyGenerationProgressBar}>
                                    <LinearProgress />
                                </div>
                            </Grid>
                        }

                    </Grid>

                    <Dialog
                        open={this.state.displayGeneratedApiKeyDialog}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">Your New API Key</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Please copy your API Key somewhere safe. After you leave this screen, you will no longer
                                be able to see your full key.
                            </DialogContentText>

                            <div className={this.props.classes.generatedApiKeyText} style={{maxWidth: "100%", overflow: 'auto'}}>{this.state.generatedApiKey}</div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <TableContainer component={Paper}>
                        <Table className={this.props.classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>API Key</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.apiKeys.map((value, index) => {
                                    return (
                                        <TableRow key={value}>
                                            <TableCell component="th" scope="row">
                                                {value}************************************************************************************
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick=""
                                                >
                                                    Deactivate
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Fragment>
        );
    }
}

ApiKeys.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(ApiKeys);
