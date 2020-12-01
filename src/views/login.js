import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../components/input';
import Button from '../components/button';

import IMAGES from '../assets/images/images';

import { Redirect } from 'react-router';
import Loader from '../components/loader';

import { auth } from '../utilities/firebase-helper';

const LoginContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  h2 {
    color: ${(props) => props.theme.colors.gray[2]};

    margin-bottom: 100px;
  }

  form {
    align-items: center;
    display: flex;
    flex-direction: column;

    button {
      width: 300px;
    }

    span {
      color: ${(props) => props.theme.colors.error};
      margin-bottom: 15px;
    }
  }
`

const Login = () => {
  const [credentials, setCredentials] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [mustNavigate, setMustNavigate] = useState(false)
  const [loginError, setLoginError] = useState(null)

  const handleInputChange = (event) => {
    let newCredentials = { ...credentials }
    newCredentials[event.target.name] = event.target.value
    setCredentials(newCredentials)
  }

  useEffect(() => {
    if (loginError) {
      setIsLoading(false)
    }

  }, [loginError])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoginError(false)
    setIsLoading(true)

    const result = await auth.signInWithEmailAndPassword(credentials.email, credentials.password).catch((error) => {
      setLoginError(error)
      return
    })
  }

  if (mustNavigate) return <Redirect to='/dashboard' />

  return <LoginContainer>
    <img src={IMAGES.UNAL_LOGO} alt='Universidad Nacional de Colombia' />
    <h2>
      Sistema <b>Unificado</b> de información <b>académica </b>
      <span>Universidad Nacional de Colombia</span>
    </h2>
    <form onSubmit={handleSubmit}>
      <label>
        Usuario:
          <Input className='margin-bottom' type='text' name='email' onChange={handleInputChange} placeholder='jjdive' required />
      </label>
      <label className='margin-bottom'>
        Password:
          <Input className='margin-bottom' type='password' name='password' onChange={handleInputChange} placeholder='Password' required />
      </label>
      {loginError && <span>Usuario o constraseña incorrectos</span>}
      <Button type="submit" solid>
        Iniciar Sesión
        </Button>
    </form>
    {isLoading && <Loader />}
  </LoginContainer>
}

export default Login;
