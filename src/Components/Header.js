import React from 'react';
import '../App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import { IconContext } from 'react-icons';
import { SiOracle } from 'react-icons/si';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const useStyles = makeStyles((theme) => ({
  appBarStyle: {
    backgroundColor: '#3b3532',
  },
  root: {
    flexGrow: 1,
  },
  box: {[theme.breakpoints.down('xs')] : { flexGrow: 1}
  }
}));

const Header = (props) => {
  const classes = useStyles();
  
  return (
    <React.Fragment>
        <CssBaseline />
        <HideOnScroll {...props}>
        <AppBar className={classes.appBarStyle}>
      <Container>
          <Toolbar>
            <Box edge="start" className={classes.box}>
              <IconContext.Provider value={{ size: "2.5em"}}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "215px", fontFamily: "Helvetica Neue"}}><SiOracle /><h2>Oracle | Opower</h2></div>
              </IconContext.Provider>
            </Box>
          </Toolbar>
      </Container>
        </AppBar>
        </HideOnScroll>
        <Toolbar />
        <Toolbar />
    </React.Fragment>
  );
}

export default Header;