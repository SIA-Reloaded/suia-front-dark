import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import SideBar from '../components/sidebar'
import Groups from './groups';
import Request from './requests';
import CreateGroup from './create-group';

const DashboardContainer = styled.div`
  display: flex;
  height: calc(100% - 80px);
  width: 100%;

`

const Dashboard = (props) => {
  return <DashboardContainer>
    <SideBar {...props}/>
    <Route exact path={props.match.url + "/solicitudes"} component={Request} />
    <Route exact path={props.match.url + "/grupos"} component={Groups} />
    <Route exact path={props.match.url + "/grupos/crear-grupo"} component={CreateGroup} />
  </DashboardContainer>
}



export default Dashboard;
