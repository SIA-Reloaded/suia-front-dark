import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import SideBar from '../components/sidebar'
import Overbook from './overbook';
const DashboardContainer = styled.div`
  display: flex;
  height: calc(100% - 80px);
  width: 100%;

`

const Requests = (props) => {
  return (
    <Overbook></Overbook>
  )
}



export default Requests;
