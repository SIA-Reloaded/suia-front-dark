import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { UserContext } from '../providers/user-provider'

const MainMenuContainer = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundDark};
  display: flex;
  flex-direction: column;
  min-width: 300px;
  padding: 20px 12px 0px 50px;
  width: 300px;

`

const StyledLink = styled(Link)`
  align-items: center;
  color: ${(props) => props.theme.colors.gray[1]};
  display: flex;
  padding: 15px 0 15px 20px;
  text-decoration: none;

  i {
    font-size: 24px;
    margin-right: 10px;
  }

  &.active {
    border-radius: ${(props) => props.theme.universalBorderRadius};
    background-color: ${(props) => props.theme.colors.gray[5]};
    color: ${(props) => props.theme.colors.gray[0]};
  }

`;

const RolesToString = {
  ADMIN: 'administrador',
  PROFESSOR: 'docente',
  STUDENT: 'estudiantes'
}


const SideBar = (props) => {
  const user = useContext(UserContext)

  const buildOptions = () => {
    switch (user.currentRole) {
      case "ADMIN":
        return <React.Fragment>
          <StyledLink className={props.location.pathname === '/solicitudes' ? 'active' : ''} to={props.match.url + 'solicitudes'}>
            <i className="material-icons-round">question_answer</i>
            Solicitudes
          </StyledLink>
          <StyledLink className={props.location.pathname === '/grupos' ? 'active' : ''} to={props.match.url + 'grupos'}>
            <i className="material-icons-round">group_work</i>
            Grupos
          </StyledLink>
        </React.Fragment>
      case "PROFESSOR":
        return <React.Fragment>
          <StyledLink className={props.location.pathname === '/grupos' ? 'active' : ''} to={props.match.url + 'grupos'}>
            <i className="material-icons-round">group_work</i>
            Grupos
          </StyledLink>
          <StyledLink className={props.location.pathname === '/calificacion-docente' ? 'active' : ''} to={props.match.url + 'calificacion-docente'}>
            <i className="material-icons-round">stars</i>
            Calificacion Docente
          </StyledLink>
          <StyledLink className={props.location.pathname === '/profesor/mis-cursos' ? 'active' : ''} to={props.match.url + 'profesor/mis-cursos'}>
            <i className="material-icons-round">question_answer</i>
            Mis cursos
          </StyledLink>
        </React.Fragment>
      case "STUDENT":
        return <React.Fragment>
          <StyledLink className={props.location.pathname === '/solicitudes' ? 'active' : ''} to={props.match.url + 'solicitudes'}>
            <i className="material-icons-round">question_answer</i>
            Solicitudes
          </StyledLink>
          <StyledLink className={props.location.pathname === '/grupos' ? 'active' : ''} to={props.match.url + 'grupos'}>
            <i className="material-icons-round">group_work</i>
            Grupos
          </StyledLink>
          <StyledLink className={props.location.pathname === '/calificacion-docente' ? 'active' : ''} to={props.match.url + 'calificacion-docente'}>
            <i className="material-icons-round">stars</i>
            Calificacion Docente
          </StyledLink>
        </React.Fragment>
      default:
        break;
    }
  }




  const buildAdminSideBar = () => {
    return <MainMenuContainer>
      <h3>Servicios {RolesToString[user.currentRole]}</h3>
      {buildOptions()}
    </MainMenuContainer>
  }

  return buildAdminSideBar()
}

export default SideBar;