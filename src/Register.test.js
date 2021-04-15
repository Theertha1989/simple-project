import { render, screen } from '@testing-library/react';
import React from 'react';
import { shallow } from "enzyme";
import * as axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Register from "./Register";

describe("Register", () => {

  const GET_URL = 'http://localhost:3002/getCustomers';
  const POST_URL = 'http://localhost:3002/register';

  const data = [{
    "id": 1,
    "name": "Prasad",
    "Age": 18,
    "DOB": "23/04/2012",
    "gender": "Male"
  },
  {
    "id": 2,
    "name": "Roopa",
    "Age": "28",
    "DOB": "22/03/1920",
    "gender": "Female"
  },];

  it("should render a Headline of register application", () => {
    const register = shallow(<Register />);
    expect(register.find('h1').length).toEqual(1)
  });

  it("should render a Username", () => {
    render(<Register />);
    const username = screen.getByText(/Username/i);
    expect(username).toBeInTheDocument();
  });

  it("should render a Password", () => {
    render(<Register />);
    const password = screen.getByText(/Password/i);
    expect(password).toBeInTheDocument();
  });

  it("should render a Date if birth", () => {
    render(<Register />);
    const dateOfBirth = screen.getByText(/Date Of Birth/i);
    expect(dateOfBirth).toBeInTheDocument();
  });

  it("should render a Gender", () => {
    render(<Register />);
    const gender = screen.getByText(/Gender/i);
    expect(gender).toBeInTheDocument();
  });

  it("should render a Add button", () => {
    render(<Register />);
    const add = screen.getByText(/Add/i);
    expect(add).toBeInTheDocument();
  });

  it("should render a Cancel button", () => {
    render(<Register />);
    const cancel = screen.getByText(/Cancel/i);
    expect(cancel).toBeInTheDocument();
  });

  it("should render Register Component", () => {
    const wrapper = shallow(<Register />);
    wrapper.setState({
      persons: data,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should display existing added users', () => {
    const mock = new MockAdapter(axios);
    const wrapper = shallow(<Register />);
    const resp = {data: data};
    mock.onGet(GET_URL).reply(200, resp);
    // eslint-disable-next-line jest/valid-expect-in-promise
    axios.get(GET_URL).then(function (response) {
      expect(resp).toEqual(response.data);
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('shouldnot display existing added users', () => {
    const mock = new MockAdapter(axios);
    const wrapper = shallow(<Register />);
    const resp = {data: data};
    mock.onGet(GET_URL).networkError();
    // eslint-disable-next-line jest/valid-expect-in-promise
    axios.get(GET_URL).then(function (response) {
      expect(resp).toEqual(response.data);
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should click on handle submit and user should get registerd', () => {
    const mock = new MockAdapter(axios);
    const wrapper = shallow(<Register />);
    const instance = wrapper.instance();
    const body = { name: 'Prasad', password: 'prassad@123', age: 18, DOB: '23/04/2012', gender: 'Male'};

    const resp = {data: data};
    mock.onPost('POST_URL', body).reply(200, resp);
    // eslint-disable-next-line jest/valid-expect-in-promise
    axios.post(POST_URL, body).then(function (response) {
      console.log(response.data);
      expect(resp).toEqual(response.data);
    });
    instance.handleSubmit({preventDefault: () => {}});
  });

  it('should click on my change handler', () => {
    const wrapper = shallow(<Register />);
    const instance = wrapper.instance();
    instance.myChangeHandler({ target: {
      name: 'username',
      value: 'abc'
    }});
  });
});