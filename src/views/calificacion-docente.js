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

const Card = styled.div`
  display: flex;
  flex-direction: column;
  flex:1 1 auto;
  justify-content: flex-start;
  margin-left:5px;
  margin-bottom:5px;
  margin-top:0;
  background-color:white;
  border: 3px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.gray[4]};
  padding: 20px;
  height: 150px;
  border-radius: 20px;

  line-height: auto;
  h3 {
    margin: 0;
    color: ${(props) => props.theme.colors.secondary};
    font-weight: 600;
  }
`

const TeacherRateBody = styled.div`
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 0;
`

const CalificacionDocente = () => {

  const [cleanedSemesters, setCleanedSemesters] = React.useState([]);
  const [cleanedMaterias, setCleanedMateria] = React.useState([]);
  const [semesterState, setSemesterState] = React.useState("");
  const [nameCourses, setNameCourses] = React.useState([]);
  const [courseSelected, setCourseSelected] = React.useState("");
  const [cleanedRates, setCleanedRates] = React.useState([]);
  const [rates, setRates] = React.useState([]);

  const getSemesters = async () => {
    const responseRates = await awsHelper.getRates("20");
    const academicCalendars = responseRates.map(
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
    setRates(responseRates);
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
 
  //Contexto
  const getCleanedRates = () =>{ 
    console.log("semesterState.id", semesterState.id)
    const responseCleanedRates = rates.filter(
      (rate)=> rate.academicCalendar === semesterState.id && rate.courseID === courseSelected
    );
    console.log("cleanedRates", responseCleanedRates)
    setCleanedRates(responseCleanedRates);
  }

  React.useEffect(
    () => {
      getSemesters();
      //console.log(rates[0].questions)  
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

  React.useEffect(
    ()=>{
      if (courseSelected){
        console.log('courseSelected')
        getCleanedRates();
      }
    }, [courseSelected]
  );



  const semestre = (e) => {
    const selectedSemester = e.target.key;
    setSemesterState(selectedSemester);
  }

  const course = (e) => {
    const selectedCourse = e.target.value;
    console.log("selectedCourse", selectedCourse);
    setCourseSelected(selectedCourse);
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
        <Dropdown 
        width="200px"
        onChange={course}>
        {
          nameCourses.map(
            (cleanedCoursesList) =>
              <option key={cleanedCoursesList.id} value={cleanedCoursesList.id}>{`${cleanedCoursesList.name}`}</option>        
              )
        }
        </Dropdown>
      </Layout>
      <h3
      >{cleanedRates} evaluaciones</h3>
    </Layout>
    <TeacherRateBody>
        {
         /*rates[0].questions.filter(
            (closeQuestion) => closeQuestion.options
          ).map(
            (question) =>
          <Card key={question.id}>
            <h3 >Pregunta # ?</h3>
            {`${question.label}`}</Card>
          )*/
        }
      
    </TeacherRateBody>
  </div>
}

export default CalificacionDocente