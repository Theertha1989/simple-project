import { Button, TextField, Container, Grid } from '@material-ui/core';
import React, { Fragment } from 'react';
import axios from 'axios';


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import './Register.css';

export default class Register extends React.Component {

  state = {
    username: '',
    password: '',
    dateOdBirth: '',
    gender1: '',
    age: null,
    enabled: false,
    getListEnabled: false,
    data: [],
    persons: [],
  };

  handleSubmit = (event) => {
    const { username, password, dateOdBirth, gender1, age } = this.state;
    event.preventDefault();
    this.setState({ enabled: true });
    axios.post('http://localhost:3002/register', {
      name: username,
      password: password,
      age: age,
      DOB: dateOdBirth,
      gender: gender1,
    })
    .then((response) => {
      console.log("response", response);
      const persons = response.data;
      this.setState({ persons });
    }, (error) => {
      console.log("error", error);
    });
  }

  componentDidMount() {
    axios.get(`http://localhost:3002/getCustomers`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }

  render() {
    return (
      <Container fixed>
        <h1 className="title">Registration Form</h1>
        <form name="register_form" onSubmit={this.handleSubmit} noValidate>
          <Grid container direction="row" justify="space-evenly" alignItems="center">
            <TextField id="standard-basic" name="username" label="Username" onChange={this.myChangeHandler} />
            <TextField id="standard-basic" name="password" label="Password" onChange={this.myChangeHandler} />
            <TextField id="standard-basic" name="age" label="Age" onChange={this.myChangeHandler} />
            <TextField
              name="dateOdBirth"
              id="date"
              label="Date Of Birth"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.myChangeHandler}
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup aria-label="gender" name="gender1" onChange={this.myChangeHandler} >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>
            <Button variant="contained" type="submit" id="submit" color="primary">Add</Button>
            <Button variant="contained" color="secondary">Cancel</Button>
          </Grid>
        </form>
        <ul>
        { this.state.persons.map(data =>
          <li id={data.id}>{data.name} {data.gender}  {data.DOB}  {data.age}</li> 
        )}
        </ul>
      </Container>
    )
  }
}
