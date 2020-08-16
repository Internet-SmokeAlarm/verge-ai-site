import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CardMedia from '@material-ui/core/CardMedia';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Hidden,
  IconButton,
  withStyles
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import NavigationDrawer from "../../../shared/components/NavigationDrawer";
import Image from "../../imgs/logo.png";

const styles = theme => ({
  appBar: {
    backgroundColor: theme.palette.background.default
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  menuButtonText: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    color: theme.palette.common.white
  },
  brandText: {
    fontFamily: "'DIN 2014'",
    fontWeight: 400,
    color: theme.palette.common.white
  },
  noDecoration: {
    textDecoration: "none !important"
  },
  cover: {
    width: "12%",
    height: "12%",
    marginRight: theme.spacing(1)
  },
});

function NavBar(props) {
  const {
    classes,
    handleMobileDrawerOpen,
    handleMobileDrawerClose,
    mobileDrawerOpen,
    selectedTab
  } = props;
  const menuItems = [
    {
      link: "https://internet-smokealarm.github.io/documentation",
      isExternal: true,
      name: "Docs",
      icon: <HomeIcon className="text-white" />
    },
    {
      name: "Sign in",
      isExternal: false,
      link: "/c/dashboard",
      icon: <LockOpenIcon className="text-white" />
    }
  ];
  return (
    <div className={classes.root}>
      <AppBar position="relative" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <CardMedia
                    component="img"
                    className={classes.cover}
                    src={Image}
                />

                <Link
                  key="VergeHome"
                  to="/"
                  className={classes.noDecoration}
                >
                    <Typography
                        variant="h5"
                        className={classes.brandText}
                        display="inline"
                    >
                        Verge AI
                    </Typography>
                </Link>
            </div>
            <div>
            <Hidden mdUp>
              <IconButton
                className={classes.menuButton}
                onClick={handleMobileDrawerOpen}
                aria-label="Open Navigation"
              >
                <MenuIcon color='white' />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              {menuItems.map(element => {
                if (element.link && element.isExternal === false) {
                  return (
                    <Link
                      key={element.name}
                      to={element.link}
                      className={classes.noDecoration}
                      onClick={handleMobileDrawerClose}
                    >
                      <Button
                        color="secondary"
                        size="large"
                        classes={{ text: classes.menuButtonText }}
                      >
                        {element.name}
                      </Button>
                    </Link>
                  );
                }

                if (element.link && element.isExternal === true) {
                  return (
                    <a
                      key={element.name}
                      href={element.link}
                      className={classes.noDecoration}
                      onClick={handleMobileDrawerClose}
                    >
                      <Button
                        color="secondary"
                        size="large"
                        classes={{ text: classes.menuButtonText }}
                      >
                        {element.name}
                      </Button>
                    </a>
                  );
                }

                return (
                  <Button
                    color="secondary"
                    size="large"
                    onClick={element.onClick}
                    classes={{ text: classes.menuButtonText }}
                    key={element.name}
                  >
                    {element.name}
                  </Button>
                );
              })}
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
      <NavigationDrawer
        menuItems={menuItems}
        anchor="right"
        open={mobileDrawerOpen}
        selectedItem={selectedTab}
        onClose={handleMobileDrawerClose}
      />
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleMobileDrawerOpen: PropTypes.func,
  handleMobileDrawerClose: PropTypes.func,
  mobileDrawerOpen: PropTypes.bool,
  selectedTab: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(NavBar);
