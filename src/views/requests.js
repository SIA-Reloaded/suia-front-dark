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

  switch (user.currentRole) {
    case 'ADMIN':
      return <ManageRequests></ManageRequests>
    case 'STUDENT':
      return <Overbook></Overbook>
    default:
  }

}


export default Requests;
