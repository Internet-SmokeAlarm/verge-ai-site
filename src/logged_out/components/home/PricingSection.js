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
import calculateSpacing from "./calculateSpacing";
import Box from '@material-ui/core/box';

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

function PricingSection(props) {
  const { width, classes } = props;
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
        <Box mt={20} />

        <Typography variant="h3" align="center" className="">
            Pay as you go pricing
        </Typography>

        <Box mb={5} />

        <div className={classNames("container-fluid", classes.containerFix)}>
            <Grid
                container
                spacing={calculateSpacing(width)}
                className={classes.gridContainer}
            >
            <Grid
                item
                xs={16}
                sm={8}
                lg={4}
                className={classes.cardWrapper}
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
            className={classes.cardWrapper}
            xs={16}
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
            className={classes.cardWrapper}
            xs={16}
            sm={8}
            lg={4}
            data-aos="zoom-in-up"
            data-aos-delay={isWidthUp("md", width) ? "400" : "0"}
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
    </div>
  );
}

PricingSection.propTypes = {
  width: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(
  withWidth()(PricingSection)
);
