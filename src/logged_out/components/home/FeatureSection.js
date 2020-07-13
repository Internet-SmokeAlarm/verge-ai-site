import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, isWidthUp, withWidth } from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";
import LayersIcon from "@material-ui/icons/Layers";
import BuildIcon from "@material-ui/icons/Build";
import BarChartIcon from "@material-ui/icons/BarChart";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import TuneIcon from "@material-ui/icons/Tune";
import CloudIcon from "@material-ui/icons/Cloud";
import PeopleIcon from "@material-ui/icons/People";
import CancelIcon from "@material-ui/icons/Cancel";
import calculateSpacing from "./calculateSpacing";
import FeatureCard from "./FeatureCard";

const iconSize = 60;

const features = [
  {
    color: "#36B59D",
    headline: "Scalability",
    text:
      "Tackle challenges of the greatest size and complexity.",
    icon: <LayersIcon style={{ fontSize: iconSize }} />,
  },
  {
    color: "#6247EB",
    headline: "Flexibility",
    text:
      "Choose how you want to compose your infrastructure at the edge.",
    icon: <TuneIcon style={{ fontSize: iconSize }} />,
  },
  {
    color: "#36B4E9",
    headline: "Collaboration",
    text:
      "Build and train together across teams of any size.",
    icon: <PeopleIcon style={{ fontSize: iconSize }} />,
  },
  {
    color: "#2B54AC",
    headline: "Fully managed",
    text:
      "Robust to failure with leading service up-time.",
    icon: <BuildIcon style={{ fontSize: iconSize }} />,
  }
];

function FeatureSection(props) {
  const { width } = props;
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container-fluid lg-p-top">
        <div className="container-fluid">
          <Grid container spacing={calculateSpacing(width)}>
            {features.map(element => (
              <Grid
                item
                xs={12}
                md={3}
                data-aos="zoom-in-up"
                data-aos-delay={
                  isWidthUp("md", width) ? element.mdDelay : element.smDelay
                }
                key={element.headline}
                align="center"
              >
                <FeatureCard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.headline}
                  text={element.text}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

FeatureSection.propTypes = {
  width: PropTypes.string.isRequired
};

export default withWidth()(FeatureSection);
