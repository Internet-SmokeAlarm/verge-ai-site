import React, { Fragment } from "react";
import { Typography, withStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import '../../../config.js';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    demo1: {
      backgroundColor: theme.palette.background.paper,
    }
});

function Devices(props) {
    const [deviceDialogOpen, setDeviceDialogOpen] = useState(false);

    return (
        <Fragment>
                <div className={props.root}>
                    <div className={props.demo1}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} align="right">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                >
                                    Add Device(s)
                                </Button>
                            </Grid>
                        </Grid>
                    </div>

                    <CreateDevice
                        deviceDialogOpen={deviceDialogOpen}
                        setDeviceDialogOpen={setDeviceDialogOpen} />
                </div>
        </Fragment>
    );
}

export default withStyles(styles, { withTheme: true })(Devices);
