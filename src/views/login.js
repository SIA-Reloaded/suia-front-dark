import React, { useEffect } from 'react';
import styled from 'styled-components';
import SectionContainer from '../components/section-container';
import Input from '../components/input';
import Button from '../components/button';

import IMAGES from '../assets/images/images';
import * as awsHelper from '../utilities/aws-helper';

import "firebase/auth";
import "firebase/firestore";
import { Redirect } from 'react-router';

const LoginContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 200px;

  h2 {
    color: ${(props) => props.theme.colors.gray[2]};
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

const Login = (props) => {
  const [credentials, setCredentials] = React.useState({})
  const [mustNavigate, setMustNavigate] = React.useState(false)

  useEffect(() => {
    const user = window.firebase.auth().currentUser
    if (user) getUserData(window.firebase.auth().currentUser.email.split('@')[0])
  });

  

  const handleInputChange = (event) => {
    let newCredentials = { ...credentials }
    newCredentials[event.target.name] = event.target.value
    setCredentials(newCredentials)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    window.firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).catch(function(error) {
      console.log(error)
      alert("user not found")
      return
    });

    const username = credentials.email.split('@')[0];
    getUserData(username)
  }

  const getUserData = async (username) => {
    const user = await awsHelper.getUserData(username)
    if (user) {
      props.setUserData(user)
      setMustNavigate(true)
    };
  } 

  if (mustNavigate) return <Redirect to='/dashboard'/>

  return <SectionContainer>
    <LoginContainer>
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
  </SectionContainer>
}

export default Login;
