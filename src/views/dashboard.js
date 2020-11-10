import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import MainMenu from '../components/main-menu'
import Customer from './customer';
import CustomerLoans from './customer-loans';
import FailedPayments from './failed-payments';
import Loans from './loans';
import ProspectCustomer from './prospect-customer';
import Reports from './reports';

const DashboardContainer = styled.div`
  display: flex;
  height: calc(100% - 80px);
  width: 100%;

`

const Dashboard = (props) => {
  return <DashboardContainer>
    <MainMenu {...props}/>
    <Route path={props.match.url + "/prospect-customer"} component={ProspectCustomer} />
    <Route path={props.match.url + "/customer"} component={Customer} />
    <Route path={props.match.url + "/customer-loans"} component={CustomerLoans} />
    <Route path={props.match.url + "/loans"} component={Loans} />
    <Route path={props.match.url + "/failed-payments"} component={FailedPayments} />
    <Route path={props.match.url + "/reports"} component={Reports} />
  </DashboardContainer>
}



export default Dashboard;
