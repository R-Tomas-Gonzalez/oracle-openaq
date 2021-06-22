import './App.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Communities from './Components/Communities';
import Header from './Components/Header';
import Chart from './Components/Chart'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const fetchData = () => {
  return axios.get(`https://api.openaq.org/v2/locations?country=us&parameter_id=2&entity=community`)
    .then(data => {
      return data.data.results;
    })
    .catch(err => console.log(err));
}

const useStyles = makeStyles(() => ({
  container: {
    marginBottom: "25px"
  }
}))

function App() {

  const lessThanArray = [];
  const greaterThanArray = [];

  const [checked, setChecked] = useState(false);
  const [lessThan, setLessThan] = useState("Less than 5 value");

  const toggleChecked = () => {
    setChecked((prev) => !prev);
    if (checked) {
      setLessThan("Less than 5 value")
    } else {
      setLessThan("Greater than 5 value")
    }
  };

  const classes = useStyles();

  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    fetchData().then((communityData => {
      setCommunities(communityData);
    }))
  }, []);

  for (const community of communities) {
    for (const param of community.parameters) {
      if (param.parameterId === 2) {
        let lastValue = Math.round(param.lastValue)
        if (lastValue >= 5) {
          community.lastValue = lastValue
          greaterThanArray.push(community)
        } else {
          community.lastValue = lastValue
          lessThanArray.push(community)
        }
      }
    }
  }
  
  lessThanArray.sort((a, b) => a.lastValue - b.lastValue)
  greaterThanArray.sort((a, b) => a.lastValue - b.lastValue)

  return (
    <div className="App">
      <Header />
      <Chart lessThanArray={lessThanArray} greaterThanArray={greaterThanArray}/>
      <Container className={classes.container}>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={checked} onChange={toggleChecked} />}
            label={lessThan}
          />
        </FormGroup>
        {lessThan === "Less than 5 value" ?
          (
            <>
              <Grid container spacing={2} justify="center">
                {lessThanArray.map((item, key) =>
                  <Grid key={item.id} item xs={12} sm={6} md={3}>
                    <Communities key={key} community={item} />
                  </Grid>)}
              </Grid>
            </>
          ) : (
            <>
              <Grid container spacing={2} justify="center">
                {greaterThanArray.map((item, key) =>
                  <Grid key={item.id} item xs={12} sm={6} md={3}>
                    <Communities key={key} community={item} />
                  </Grid>)}
              </Grid>
            </>
          )}
      </Container>
    </div>
  );
}

export default App;
