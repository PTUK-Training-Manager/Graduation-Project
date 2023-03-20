import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  password: string;
  [key: string]: string; // index signature
}

interface ValidationError {
  message: string;
  path: (string | number)[];
  type: string;
}

function Sign() {
  const navigate = useNavigate();
  const [errorList, setErrorList] = useState<ValidationError[]>([]);
  const [user, setUser] = useState<User>({ 
    email: '',
    password: '',
  });

  function getUserData(e: React.ChangeEvent<HTMLInputElement>) {
    const myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  async function submitRegister(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    const result = validationReg(user);
    if (result.error) {
      console.log(result.error);
      setErrorList(
        result.error.details.map((err) => ({
          message: err.message,
          path: err.path.map(String),
          type: err.type,
        }))
      );
    } else {
      const { data } = await axios.post('', user);
      if (data.message === 'success') {
        localStorage.setItem('userToken', data.token);
        navigate('./login');
      }
    }
  }

  function validationReg(user: User): Joi.ValidationResult {
    const schema = Joi.object({
      name: Joi.string().min(4).max(20).required(),
      password: Joi.string()
        .required()
        .pattern(/[A-Z][a-z]{3,8}/)
        .message('Invalid password pattern or empty password'),
    });
    return schema.validate(user);
  }

  return (
    <>
      {errorList &&
        errorList.map((err, index) => (
          <div key={index} className="alert alert-danger">
            {err.message}
          </div>
        ))}
      <form onSubmit={submitRegister}>
        <div className="LogIn-Form"></div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            onChange={getUserData}
            name="email"
            type="email"
            className="form-control"
            id="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={getUserData}
            name="password"
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default Sign;
