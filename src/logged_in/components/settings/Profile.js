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

const styles = theme => ({
    profileHeader: {
        fontFamily: "DIN 2014",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 18,
        paddingBottom: 20,
        textTransform: "uppercase",
        color: "#393A3E"
    },
    textField: {
        paddingBottom: 20
    }
});

class Profile extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            username: "",
            email: "",

            displayVerificationAlertDialog: false,
            verificationCode: ""
        };
    }

    componentDidMount() {
        this.loadUserInfo();
    }

    async loadUserInfo() {
        let user = await Auth.currentAuthenticatedUser({
            bypassCache: true
        });

        this.setState({
            user: user,
            username: user.username,
            email: user.attributes.email
        });
    };

    handleProfileUpdate = (event) => {
        let oldEmail = this.state.user.attributes.email;
        let newEmail = this.state.email;

        // we don't want to call cognito if the email hasn't changed...
        if (oldEmail !== newEmail) {
            let result = Auth.updateUserAttributes(this.state.user, {
                'email': this.state.email,
            }).then(data => {
                console.log("success");
                this.setState({ displayVerificationAlertDialog: true });
            }).catch(err => console.log(err));
        }
    }

    updateUserEmail = (event) => {
        this.setState({ email: event.target.value });
    }

    updateVerificationCode = (event) => {
        this.setState({ verificationCode: event.target.value });
    }

    handleClose = () => {
        this.setState({ displayVerificationAlertDialog: false });
    }

    handleVerificationSubmit = () => {
        let result = Auth.verifyCurrentUserAttributeSubmit('email', this.state.verificationCode)
            .then(data => {
                console.log("success");

                this.setState({ displayVerificationAlertDialog: false });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <Fragment>
                <Dialog
                    open={this.state.displayVerificationAlertDialog}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Please Verify Your New Email"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Enter the verification code sent your new email address.
                        </DialogContentText>

                        <TextField
                            id="verification-code"
                            variant="filled"
                            label="Verification Code"
                            className={this.props.classes.textField}
                            value={this.state.verificationCode}
                            onChange={this.updateVerificationCode} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Skip
                        </Button>
                        <Button onClick={this.handleVerificationSubmit} color="primary">
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>

                <form noValidate autoComplete="off">
                    <Typography
                        varient="h1"
                        className={this.props.classes.profileHeader}
                    >
                        Profile
                    </Typography>

                    <TextField
                        id="name"
                        variant="filled"
                        label="Name"
                        disabled
                        className={this.props.classes.textField}
                        value={this.state.username} />

                    <br />

                    <TextField
                        id="email"
                        variant="filled"
                        label="Email"
                        className={this.props.classes.textField}
                        value={this.state.email}
                        onChange={this.updateUserEmail} />

                    <br />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleProfileUpdate}
                    >
                        Update Profile
                    </Button>
                </form>
            </Fragment>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(Profile);
