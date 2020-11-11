import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import schema from './validation/formSchema'
import * as yup from 'yup'
import Form from './Form'

const initialFormValues ={
  //text inputs
  name: '',
  email: '',
  password: '',
  //checkbox
  terms: false,
};
const initialFormErrors = {
  name: "",
  email: '',
  password: '',
}
const initialUsers = [];
const initialDisabled = true;

function App() {
  //States
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState (initialDisabled);

  const getUsers = () => {
    axios
    .get('fakeapidata.com', initialUsers)
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => {
      console.log(err)
    });
  };

  const postNewUser = (newUser) => {
    axios
    .post('fakeapidata.com', newUser)
    .then((res) => {
      setUsers([res.data, ...users]);
      setFormValues(initialFormValues);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  //Event Handlers
  const inputChange = (name, value) => {
    yup.reach(schema, name)
    .validate(value)
    .then(() => {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    })
    .catch((err) => {
      setFormErrors({
        ...formErrors,
        [name]: err.errors[0],
      });
    });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      //agree to terms?
      Agreement: ['terms'].filter((hob) => formValues[hob]),
    };
    postNewUser(newUser);
  };

    //side effects
    useEffect(() => {
      getUsers();
    }, []);

    useEffect(() => {
      schema.isValid(formValues).then((valid) => {
        setDisabled(!valid);
      });
    }, [formValues]);

  return (
    <div className="App">
      <header>
        <h1>User Onboard</h1>
      </header>

      <Form 
      values={formValues}
      change={inputChange}
      submit={formSubmit}
      disabled={disabled}
      errors={formErrors}
      />

    </div>
  );
}

export default App;
