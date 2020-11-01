import React from "react";
import PropTypes from "prop-types";
import { Typography, Box, withStyles } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

const styles = theme => ({
    card: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        marginTop: theme.spacing(2),
        border: `2px solid #36B59D`,
        borderRadius: theme.shape.borderRadius * 2
    },
    title: {
        color: theme.palette.common.white
    }
});

function PriceCard(props) {
    const { classes, theme, title, pricing, features } = props;
    return (
        <div className={classes.card}>
            <Box mb={2}>
                <Typography
                    variant="h6"
                    className={classes.title}
                >
                    {title}
                </Typography>
            </Box>
            <Box mb={2}>
                <Typography
                    variant="h4"
                    className={classes.title}
                >
                    {pricing}
                </Typography>
            </Box>

            {features.map((feature, index) => (
                <Box display="flex" alignItems="center" mb={1} key={index}>
                    <CheckIcon style={{ color: theme.palette.primary.dark }} />

                    <Box ml={1}>
                        <Typography
                            variant="body1"
                        >
                            {feature}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </div>
    );
}

PriceCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    pricing: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired
};

export default withStyles(styles, { withTheme: true })(PriceCard);
