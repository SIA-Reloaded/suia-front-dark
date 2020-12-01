import React, { useContext } from 'react';
import styled from 'styled-components';
import IMAGES from '../assets/images/images';
import { UserContext } from '../providers/user-provider'

import { auth } from '../utilities/firebase-helper';

const HeaderContainer = styled.div`
  align-items: center;
  display: flex;
  height: 80px;
  justify-content: space-between;
  padding: 4px 25px;
  width: 100%;

  .home-button {
    align-items: center;
    display: flex;
    height: 100%;

    p {
      color: ${(props) => props.theme.colors.primaryDark};
      font-weight: 300;
      font-size: 15px;
  
      span {
        color: ${(props) => props.theme.colors.gray[3]};
        font-style: italic;
        font-size: 14px;
      }
    }
  
    img {
      height: 90%;
      margin-right: 20px;
      width: auto;
    }
  }

  .user-control {
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;

    i {
      font-size: 30px;
    }

    p {
      font-weight: 300;
      margin: 0 12px;

      span {
        color: ${(props) => props.theme.colors.primaryDark};
        font-weight: 400;
      }
    }
  }
`

const Header = () => {

  const user = useContext(UserContext)

  const signOut = () => {
    auth.signOut()
  }

  console.log(user)

  return <HeaderContainer>
    <div className='home-button'>
      <img src={IMAGES.UNAL_LOGO} alt='Universidad Nacional de Colombia'/>
      <div>
        <p>
          Sistema <b>Unificado</b> de<br/>información <b>académica</b><br/>
          <span>Universidad Nacional de Colombia</span>
        </p>
      </div>
    </div>
    {user.userData && 
    <button className='user-control' onClick={signOut}>
      <i className="material-icons-round">account_circle</i>
      <p>{`${user.userData.basicData.firstName} ${user.userData.basicData.lastName}`}<br/><span>{user.userData.roles[0]}</span></p>
      <i className="material-icons-round">arrow_drop_down</i>
    </button>
    }
  </HeaderContainer>
}



export default Header;
