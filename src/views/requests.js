import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import SideBar from '../components/sidebar'
import { UserContext } from '../providers/user-provider';
import ManageRequests from './manage-requests';
import Overbook from './overbook';

const DashboardContainer = styled.div`
  display: flex;
  height: calc(100% - 80px);
  width: 100%;

`

const Requests = (props) => {

  const user = useContext(UserContext)

  if (user.userData.roles.includes("ADMIN")) {
    return <ManageRequests></ManageRequests>
    
  } else if (user.userData.roles.includes("STUDENT")) {
    return <Overbook></Overbook>
  }

}


export default Requests;
