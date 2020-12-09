import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import SideBar from '../components/sidebar'
import Groups from './groups';
import Requests from './requests';
import CreateGroup from './create-group';
import GroupDetails from './group-details';
import CalificacionDocente from './calificacion-docente';
import TeacherCourses from './teacher-courses';
import Overbook from './overbook';
import TeacherCourseDetail from './teacher-course-detail';
import StudentCourses from './student-courses';

const DashboardContainer = styled.div`
  display: flex;
  height: calc(100% - 80px);
  width: 100%;
`

const Dashboard = (props) => {
  return <DashboardContainer>
    <SideBar {...props} />
    <Route exact path={props.match.url + "solicitudes"} component={Requests} />
    <Route exact path={props.match.url + "solicitudes/sobrecupo"} component={Overbook} />
    <Route exact path={props.match.url + "grupos"} component={Groups} />
    <Route exact path={props.match.url + "grupos/crear-grupo"} component={CreateGroup} />
    <Route exact path={props.match.url + "grupos/detalle"} component={GroupDetails} />
    <Route exact path={props.match.url + "calificacion-docente"} component={CalificacionDocente} />
    <Route exact path={props.match.url + "profesor/mis-cursos"} component={TeacherCourses} />
    <Route exact path={props.match.url + "profesor/curso/:courseID"} component={TeacherCourseDetail} />
    <Route exact path={props.match.url + "student/mis-cursos"} component={StudentCourses} />
  </DashboardContainer>
}



export default Dashboard;

