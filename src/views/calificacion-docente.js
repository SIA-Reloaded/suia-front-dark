import React from 'react'
import Dropdown from '../components/drop-down';
import styled from 'styled-components';
import * as awsHelper from '../utilities/aws-helper';

const Layout = styled.div`
    width:600px;
    padding-top: 10px;
    display: flex;
    margin-bottom: 30px;
    flex-direction: ${props => props.columns ? "column" : "row"};
`;

const CalificacionDocente = () => {

  const [cleanedSemesters, setCleanedSemesters] = React.useState([]);
  const [cleanedMaterias, setCleanedMateria] = React.useState([]);
  const [semesterState, setSemesterState] = React.useState("");
  const [nameCourses, setNameCourses] = React.useState([]);
  const [ratesTeacher, setRatesTeacher] = React.useState([])
  

  const getRatesTeacher = async () =>{
    const rates = await awsHelper.getRates("20");
    setRatesTeacher(rates)
  }
  

  const getSemesters = async () => {
    const rates = await awsHelper.getRates("20");
    const academicCalendars = rates.map(
      (rate) => {
        return rate.academicCalendar;
      }
    ); 

    const semesters = await awsHelper.getSemestersList();
    const filteredSemesters = semesters.filter(
      (semester) => {
        return academicCalendars.includes(semester.id)
      }
    )
    setCleanedSemesters(filteredSemesters)
    setSemesterState(filteredSemesters[0])
  }

  const loadCoursesId = async () => {
    const rates = await awsHelper.getRates("20"); 
    const semesterCourses = rates.filter(
      (rate)=> rate.academicCalendar === semesterState.id
    );

    const courses = semesterCourses.map( 
        (course) => {
          return course.courseID;
        }
      )
    setCleanedMateria(courses);
  }

  const courses = async () => {
  const coursesPromise = cleanedMaterias.map(
    (course) => {
      return awsHelper.getGroup(course);
    } 
  ); 

  const courses = await Promise.all(coursesPromise);
    setNameCourses(courses);
  }

  React.useEffect(
    () => {
      getSemesters();  
    }, []
  );

  React.useEffect(
    ()=>{
      if (semesterState){
        loadCoursesId();
      }
    }, [semesterState]
  );

  React.useEffect(
    ()=>{
      if (nameCourses){
        courses();
      }
    }, [nameCourses]
  );

  const semestre = (e) => {
    const selectedSemester = e.target.key;
    setSemesterState(selectedSemester);
  }

  return <div>
    <Layout >
      <Layout columns>
        <h3>Semestre</h3>
        <Dropdown
          width="150px"
          onChange={semestre}
        >
          {
            cleanedSemesters.map(
              (cleanedSemesterList) =>
                <option key={cleanedSemesterList.id}>{`${cleanedSemesterList.year}-${cleanedSemesterList.period}`}</option>         
                )
          }

        </Dropdown>
      </Layout>
      <Layout columns>
        <h3>Asignatura</h3>
        <Dropdown width="200px">
        {
          nameCourses.map(
            (cleanedCoursesList) =>
              <option key={cleanedCoursesList.id}>{`${cleanedCoursesList.name}`}</option>         
              )
        }
        </Dropdown>
      </Layout>

    </Layout>
  </div>
}

export default CalificacionDocente