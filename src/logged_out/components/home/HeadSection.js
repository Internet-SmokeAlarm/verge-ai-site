import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Typography,
  Box,
  withStyles,
  withWidth,
  isWidthUp
} from "@material-ui/core";
import Image from "../../imgs/Union.png";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'blue',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
})(TextField);

const styles = theme => ({
  extraLargeButtonLabel: {
    fontSize: theme.typography.body1.fontSize,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.h6.fontSize
    }
  },
  extraLargeButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    }
  },
  titleText: {
    fontWeight: 500,
    color: theme.palette.common.white
  },
  subtitleText: {
    color: theme.palette.common.white
  },
  wrapper: {
    position: "relative",
    backgroundColor: theme.palette.background.default,
    paddingBottom: theme.spacing(2)
  },
  backgroundImageWrapper: {
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right",
      [theme.breakpoints.up("lg")]: {
        backgroundImage: `url(${Image})`,
      }
  },
  image: {
    maxWidth: "80%",
    verticalAlign: "middle",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4]
  },
  container: {
    marginTop: 0,
    marginBottom: theme.spacing(22),
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(16)
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(10)
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(4)
    }
  },
  containerFix: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "none !important"
    }
  },
  titleContainer: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  stayConnectedButton: {
      background: 'linear-gradient(45deg, #36B4E9 30%, #36B59D 90%)'
  },
  stayConnectedEntry: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      color: theme.palette.common.white
  },
  whiteColor: {
      color: theme.palette.common.white
  }
});

function HeadSection(props) {
  const { classes, theme, width } = props;
  return (
    <Fragment>
      <div className={classNames("lg-p-top", classes.wrapper, classes.backgroundImageWrapper)}>
        <div className={classNames("container-fluid", classes.container)}>
          <Box display="flex" justifyContent="left" className="row">
            <div
                className={classes.titleContainer}
            >
                <Box width="75%">
                    <Typography
                        variant={isWidthUp("lg", width) ? "h3" : "h4"}
                        className={classes.titleText}
                    >
                      Leverage the power of machine learning at the edge
                    </Typography>
                </Box>
            </div>

            <Box pt={6} />

            <div
                className={classes.titleContainer}
            >
                <Box width="60%">
                    <Typography
                        variant={isWidthUp("lg", width) ? "h5" : "h6"}
                        className={classes.subtitleText}
                    >
                      Verge AI is the first open, fully managed Federated Learning system. Sign up below to join our beta and receive updates.
                    </Typography>
                </Box>
            </div>

            <div
                className={classes.titleContainer}
                mt={6}
            >
                <form>
                    <Box className="row" mt={5}>
                        <CssTextField
                            id="standard-basic"
                            label="Email Address"
                            variant="outlined"
                            className={classes.stayConnectedEntry}
                            InputLabelProps={{ className: classes.whiteColor }}
                            InputProps={{ className: classes.whiteColor }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            size="large"
                            endIcon={<ArrowForwardIcon />}
                            className={classes.stayConnectedButton}
                        >
                            Stay Connected
                        </Button>
                    </Box>
                </form>
            </div>
          </Box>
        </div>
      </div>
    </Fragment>
  );
}

HeadSection.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.string,
  theme: PropTypes.object
};

export default withWidth()(
  withStyles(styles, { withTheme: true })(HeadSection)
);
