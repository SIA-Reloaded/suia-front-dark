import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import IMAGES from '../assets/images/images';
import { UserContext } from '../providers/user-provider'
import Popover from '@material-ui/core/Popover';
import {ListButton} from './button';

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

const UserMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`

const RolesToString = {
  ADMIN: 'administrador',
  PROFESSOR: 'docente',
  STUDENT: 'estudiantes'
}

const Header = () => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useContext(UserContext)

  const buildUserMenu = () => {
    return <UserMenu>
      {user.userData.roles.map((role) => {if (user.currentRole !== role) return <ListButton key={role} onClick={() => changeRole(role)}>Entrar como  {RolesToString[role]}</ListButton>})}
      <ListButton onClick={signOut}>Cerrar sesión</ListButton>
    </UserMenu>
  }

  const changeRole = (role) => {
    user.setCurrentRole(role)
  }

  const signOut = () => {
    auth.signOut()
  }

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((op) => !op)
  };

  return <HeaderContainer>
    <div className='home-button'>
      <img src={IMAGES.UNAL_LOGO} alt='Universidad Nacional de Colombia' />
      <div>
        <p>
          Sistema <b>Unificado</b> de<br />información <b>académica</b><br />
          <span>Universidad Nacional de Colombia</span>
        </p>
      </div>
    </div>
    {user.userData &&
      <button className='user-control' onClick={handlePopoverOpen}>
        <i className="material-icons-round">  </i>
        <p>{`${user.userData.basicData.firstName} ${user.userData.basicData.lastName}`}<br /><span>{user.currentRole}</span></p>
        <i className="material-icons-round">arrow_drop_down</i>
        <Popover
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          anchorEl={anchorEl}
          open={open}
        >
          {buildUserMenu()}
        </Popover>
      </button>
    }
  </HeaderContainer>
}



export default Header;
