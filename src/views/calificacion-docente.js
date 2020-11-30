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
  // rateList

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
    /*console.log(filteredSemesters)*/
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
   // const courses = await awsHelper.getGroup("0fa0cce0-25ef-11eb-9c41-7b8105682f18");
  const coursesPromise = cleanedMaterias.map(
    (course) => {
      return awsHelper.getGroup(course);
    } 
  ); 

  const courses = await Promise.all(coursesPromise);
    console.log(courses)
    setNameCourses(courses);
  }

  React.useEffect(
    () => {
      getSemesters();
      loadCoursesId();
      courses();
    }, []
  );

  const semestre = (e) => {
    const selectedSemester = e.target.key;
    setSemesterState(selectedSemester);
  }

  console.log(semesterState.id)
  console.log(cleanedMaterias)


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