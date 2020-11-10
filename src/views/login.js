import React from 'react';
import styled from 'styled-components';

import SectionContainer from '../components/section-container';
import Input from '../components/input';
import Button from '../components/button';

import IMAGES from '../assets/images/images';
import * as awsHelper from '../utilities/aws-helper';

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

  const handleInputChange = (event) => {
    let newCredentials = { ...credentials }
    newCredentials[event.target.name] = event.target.value
    setCredentials(newCredentials)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
      
    props.setUser(awsHelper.getUserData(credentials.username))
  }

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
          <Input className='margin-bottom' type='text' name='username' onChange={handleInputChange} placeholder='jjdive' required />
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
