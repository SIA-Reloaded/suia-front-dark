import React from 'react'
import Dropdown from '../components/drop-down';
import styled from 'styled-components';
import * as awsHelper from '../utilities/aws-helper';
import { UserContext } from '../providers/user-provider'
import { Bar } from 'react-chartjs-2';
import Theme from '../theme/theme';

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
  height: 500px;
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
  const [semesterCourses, setSemesterCourses] = React.useState([]);
  const [semesterSelected, setSemesterSelected] = React.useState("");
  const [courseSelected, setCourseSelected] = React.useState("");
  const [courseRates, setCourseRates] = React.useState([]);
  const [rates, setRates] = React.useState(null);

  const user = React.useContext(UserContext)

  const getSemesters = async () => {
    const responseRates = await awsHelper.getRates(user.userData.id);
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
    setRates(responseRates);
    if (filteredSemesters.length>0) {
      setSemesterSelected(filteredSemesters[0].id)
    }
  }

  const loadCourses = async () => {
    const coursesSemester = rates.filter(
      (rate)=> rate.academicCalendar === semesterSelected
    )

    if (coursesSemester.length > 0) {

      const coursesIDs = [... new Set(coursesSemester.map( 
          (rateSemester) => {
            return rateSemester.courseID;
          }
        )
      )];

      const coursesPromises = coursesIDs.map( 
        (courseID) => {
          return awsHelper.getGroup(courseID);
        }
      )

      const responseCourses = await Promise.all(coursesPromises);
      setSemesterCourses(
        responseCourses
      );
      setCourseSelected(responseCourses.length > 0 ? responseCourses[0] : '')
      console.log(responseCourses.length > 0)
      getCourseRates();
    }
  }

  //Contexto
  const getCourseRates = () =>{
    setCourseRates(
      rates.filter(
        (rate)=> rate.academicCalendar === semesterSelected && rate.courseID === courseSelected.id
      )
    );
  }

  React.useEffect(
    () => {
      console.log('Getting semesters');
      getSemesters();
    }, []
  );

  React.useEffect(
    ()=>{
      if (semesterSelected && rates){
        loadCourses();
      }
    }, [semesterSelected, rates]
  );

  React.useEffect(
    ()=>{
      if (courseSelected && courseSelected !== ''){
        console.log('courseSelected')
        getCourseRates();
      }
    }, [courseSelected]
  );

  React.useEffect(
    ()=>{
      if (courseRates){
        console.log('courseRates', courseRates.length)
      }
    }, [courseRates]
  );

  const getQuestionResults = (question) => {
    const allAnswers = [].concat.apply([] ,(
        courseRates
          .map(
            (rate) => rate.answers
          )
      )
    ).filter(
      (answer) => (answer.questionID === question.id) || (answer.questionId === question.id)
    )
    
    let dataSetArr;

    if (question.questionType === 'options') {
      dataSetArr = question.options.map(
        (option) => {
          let optionWeight = 0;
          console.log("option", option)
          allAnswers.forEach(answer => {
            if (answer.selectedOptions && answer.selectedOptions.includes(option.label)) optionWeight+=1
          });
          return optionWeight;
        }
      );
    } else {
      dataSetArr = question.options.sort((a,b) => a.value-b.value).map((option) => {
          console.log("allAnswers", allAnswers);
          const answerScore = allAnswers.filter(
            (answer) => answer.score === option.value
          ).length
          console.log("answerScore", answerScore);
          return answerScore
        }
      )
    }

    const dataset = {
      label: "Respuestas",
      data: dataSetArr,
      backgroundColor: Theme.colors.primary
    }

    const data = {
      labels: question.options.sort((a,b) => a.value-b.value).map((option) => option.label),
      datasets: [dataset]
    }

    return <Bar data={data} options={{
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }}/>

  }


  return <div>
    <Layout >
      <Layout columns>
        <h3>Semestre</h3>
        <Dropdown
          width="150px"
          onChange={(e) => setSemesterSelected(e.target.value)}
        >
          {
            cleanedSemesters.map(
              (cleanedSemesterList) =>
                <option key={cleanedSemesterList.id} value={cleanedSemesterList.id}>{`${cleanedSemesterList.year}-${cleanedSemesterList.period}`}</option>         
                )
          }

        </Dropdown>
      </Layout>
      <Layout columns>
        <h3>Asignatura</h3>
        <Dropdown 
        width="200px"
        onChange={(e) => setCourseSelected(e.target.value)}>
        {
          semesterCourses.map(
            (cleanedCoursesList) =>
              <option key={cleanedCoursesList.id} value={cleanedCoursesList.id}>{`${cleanedCoursesList.name}`}</option>        
              )
        }
        </Dropdown>
      </Layout>
    </Layout>
    <TeacherRateBody>
      <h3>{courseRates.length + (courseRates.length === 1 ? ' evaluación' : ' evaluaciones')}</h3>
        { ((rates && rates.length > 0) && (courseRates && courseRates.length > 0)) &&
         rates[0].questions.filter(
            (closeQuestion) => closeQuestion.options
          ).map(
            (question, questionIdx) =>
              <Card key={question.id}>
                <h3 >Pregunta # {questionIdx + 1}</h3>
                {`${question.label}`}
                { getQuestionResults(question) }
              </Card>
          )
        }
      
    </TeacherRateBody>
  </div>
}

export default CalificacionDocente