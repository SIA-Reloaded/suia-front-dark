import React from 'react';
import styled from 'styled-components';
import Input from '../components/input';
import Button from '../components/button';

import IMAGES from '../assets/images/images';

import { Redirect } from 'react-router';
import { CenteredLoader } from '../components/loader';

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
  }
`

const Login = () => {
  const [credentials, setCredentials] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(false)
  const [mustNavigate, setMustNavigate] = React.useState(false)

  const handleInputChange = (event) => {
    let newCredentials = { ...credentials }
    newCredentials[event.target.name] = event.target.value
    setCredentials(newCredentials)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const result = await auth.signInWithEmailAndPassword(credentials.email, credentials.password).catch(function (error) {
      console.log(error)
      alert("user not found")
      return
    });

    if (result) { // User logged in succesfuly
      setMustNavigate(true)
    }
  }

  if (mustNavigate) return <Redirect to='/dashboard' />

  if (isLoading) return CenteredLoader({ height: '100%' })

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
      <Button type="submit" solid>
        Iniciar Sesión
        </Button>
    </form>
  </LoginContainer>
}

export default Login;
