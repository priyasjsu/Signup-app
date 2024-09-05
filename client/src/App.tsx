import React, {FC, useState, ChangeEvent, FormEvent} from 'react';
import { ReactComponent as Logo } from "./logo.svg";
import { getData } from "./utils/data-utils";
import FormInput from './components/form-input/form-input';

import './App.css';

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
}

const defaultFormFields = {
  email: '',
  password: '',
}

const App = () => {

  const [user, setUser] = useState<User | any>()
  const [formFields, setFormFields] = useState<Omit<User, 'id'| 'name'>>(defaultFormFields)

  const resetFormFields = (): void => setFormFields(defaultFormFields)

  //handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormFields({...formFields, [name]: value})
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formFields)
    const res = getData('/login', formFields.email, formFields.password).then((data) => {
      console.log(data)
      setUser(data);
    })
    resetFormFields();
  };

  const reload = () => {
    setUser(null);
    resetFormFields()
  };

  return (
    <div className='App-header'>
      <h1>
        { user && `Welcome! ${user.name}`}
      </h1>
      <div className="card">
        <Logo className="logo" />
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            required
            name="email"
            value={formFields.email}
            onChange={handleChange}
          />
          <FormInput
            label="Password"
            type='password'
            required
            name='password'
            value={formFields.password}
            onChange={handleChange}
          />
          <div className="button-group">
            <button type="submit">Sign In</button>
            <span>
              <button type="button" onClick={reload}>Clear</button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;