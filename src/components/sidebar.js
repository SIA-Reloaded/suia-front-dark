import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MainMenuContainer = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundDark};
  display: flex;
  flex-direction: column;
  min-width: 300px;
  padding: 50px 12px 0px 50px;
  width: 300px;

`

const StyledLink = styled(Link)`
  align-items: center;
  color: white;
  display: flex;
  padding: 15px 0 15px 20px;
  text-decoration: none;

  i {
    font-size: 24px;
    margin-right: 10px;
  }

  ${(props) => {
    
  }}
`;



const MainMenu = (props) => {
  return <MainMenuContainer>
    <StyledLink to={props.match.url + '/prospect-customer'}>
    <i className="material-icons-round">star_border</i>
      Prospect Customer
    </StyledLink>
    <StyledLink to={props.match.url + '/customer'}>
      <i className="material-icons-round">perm_identity</i>
      Customers
    </StyledLink>
    <StyledLink to={props.match.url + '/loans'}>
      <i className="material-icons-round">payment</i>
      Loans
    </StyledLink>
    <StyledLink to={props.match.url + '/customer-loans'}>
      <i className="material-icons-round">local_atm</i>
      Customer Loans
    </StyledLink>
    <StyledLink to={props.match.url + '/failed-payments'}>
      <i className="material-icons-round">report</i>
      Failed Payments
    </StyledLink>
    <StyledLink to={props.match.url + '/reports'}>
      <i className="material-icons-round">plagiarism</i>
      Reports
    </StyledLink>
    <StyledLink to={props.match.url + '/manage-team'}>
      <i className="material-icons-round">groups</i>
      Manage Team
    </StyledLink>
  </MainMenuContainer>
  
}

