import React from 'react';
import styled from 'styled-components';
import IMAGES from '../assets/images/images';

const HeaderContainer = styled.div`
  align-items: center;
  display: flex;
  height: 80px;
  padding: 4px 25px;
  width: 100%;

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
`

const Header = (props) => {
  
  return <HeaderContainer>
    <img src={IMAGES.UNAL_LOGO} alt='Universidad Nacional de Colombia'/>
    <div>
      <p>
        Sistema <b>Unificado</b> de<br/>información <b>académica</b><br/>
        <span>Universidad Nacional de Colombia</span>
      </p>

    </div>
  </HeaderContainer>
}



export default Header;
