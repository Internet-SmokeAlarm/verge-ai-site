import React, { Fragment } from "react";
import Box from '@material-ui/core/Box';
import { Grid, Typography, withStyles } from "@material-ui/core";
import LayersIcon from "@material-ui/icons/Layers";
import BuildIcon from "@material-ui/icons/Build";
import TuneIcon from "@material-ui/icons/Tune";
import PeopleIcon from "@material-ui/icons/People";

const iconSize = 300;

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);

const features = [
  {
    color: "#36B59D",
    headline: "Scalable",
    text:
      "Tackle challenges of the greatest size and complexity.",
    icon: <LayersIcon style={{ fontSize: iconSize, color: "#36B59D" }} />,
  },
  {
    color: "#6247EB",
    headline: "Flexible",
    text:
      "Choose how you compose your infrastructure.",
    icon: <TuneIcon style={{ fontSize: iconSize, color: "#6247EB" }} />,
  },
  {
    color: "#36B4E9",
    headline: "At the edge, and the data center",
    text:
      "Run ML across clouds, technology stacks, and training location.",
    icon: <PeopleIcon style={{ fontSize: iconSize, color: "#36B4E9" }} />,
  },
  {
    color: "#2B54AC",
    headline: "Enterprise Ready",
    text:
      "Robust to failure with leading service up-time.",
    icon: <BuildIcon style={{ fontSize: iconSize, color: "#2B54AC" }} />,
  }
];

function FeatureSection(props) {
    const { width } = props;
    return (
        <Fragment>
            <div style={{ backgroundColor: "#05173E" }}>
                {features.map(element => (
                    <Grid container spacing={3} direction="row" align="center" alignItems="center">
                        <Grid item xs={6}>
                            {element.icon}
                        </Grid>
                        <Grid item xs={6}>
                            <Box mb={5} align="left">
                                <WhiteTextTypography
                                    variant="h3"
                                >
                                    {element.headline}
                                </WhiteTextTypography>
                            </Box>

                            <Box align="left">
                                <WhiteTextTypography
                                    variant="h5"
                                >
                                    {element.text}
                                </WhiteTextTypography>
                            </Box>
                        </Grid>
                    </Grid>
                ))}

                <Box pb={10} />
            </div>
        </Fragment>
    );
}

export default FeatureSection;
