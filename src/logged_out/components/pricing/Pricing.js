import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Grid,
  Typography,
  isWidthUp,
  withWidth,
  withStyles
} from "@material-ui/core";
import PriceCard from "./PriceCard";
import Box from '@material-ui/core/Box';

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);

const styles = theme => ({
  containerFix: {
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6)
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    overflow: "hidden",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  cardWrapper: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 340
    }
  },
  cardWrapperHighlighted: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 360
    }
  }
});

function Pricing(props) {
    return (
        <div style={{ backgroundColor: "#05173E" }}>
            <Box pt={15} />

            <div className={classNames("container-fluid", props.containerFix)}>
                <WhiteTextTypography variant="h3">
                    Pay as you go pricing
                </WhiteTextTypography>

                <Box pb={5} />

                <WhiteTextTypography variant="h5">
                    You only pay for resources you consume.
                </WhiteTextTypography>
            </div>

            <Box mb={5} />

            <div className={classNames("container-fluid", props.containerFix)}>
                <Grid
                    container
                    spacing={5}
                    className={props.gridContainer}
                >
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        lg={4}
                        className={props.cardWrapper}
                        data-aos="zoom-in-up"
                    >
                        <PriceCard
                            title="Model Upload Requests"
                            pricing={
                                <span>
                                $0.005
                                <Typography display="inline"> / request</Typography>
                                </span>
                            }
                            features={[]}
                        />
                    </Grid>

                    <Grid
                        item
                        className={props.cardWrapper}
                        xs={12}
                        sm={8}
                        lg={4}
                        data-aos="zoom-in-up"
                        data-aos-delay="200"
                    >
                        <PriceCard
                            title="Model Storage"
                            pricing={
                                <span>
                                    $2.00
                                    <Typography display="inline"> / GB per month</Typography>
                                </span>
                            }
                            features={[]}
                        />
                    </Grid>

                    <Grid
                        item
                        className={props.cardWrapper}
                        xs={12}
                        sm={8}
                        lg={4}
                        data-aos="zoom-in-up"
                      >
                        <PriceCard
                            title="Model Size"
                            pricing={
                                <span>
                                    $5.00
                                    <Typography display="inline"> / GB</Typography>
                                </span>
                            }
                            features={[]}
                        />
                    </Grid>
                </Grid>
            </div>

            <Box pb={15} />
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(Pricing);
