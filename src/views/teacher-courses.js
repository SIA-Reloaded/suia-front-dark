import React from "react";
import styled from "styled-components";
import Dropdown from '../components/drop-down';
import { Link } from 'react-router-dom';
import * as awsHelper from "../utilities/aws-helper";
import { UserContext } from '../providers/user-provider'

const TeacherCoursesContainer = styled.div`
  width: 100%;
  height: 100%;
`

const TeacherCoursesHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  * {
    padding-right: 10px;
  }
`

const TeacherCoursesBody = styled.div`
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-left: 0;
`

const CourseCard = styled.div`
  display: flex;
  flex-direction: column;
  flex:1 1 auto;
  justify-content: space-between;
  margin-left:5px;
  margin-bottom:5px;
  margin-top:0;
  background-color: ${(props) => props.theme.colors.gray[4]};
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

const CourseCardFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  .groups {
    flex: 0 0 100%;
  }
  .students, .code {
    flex: 0 0 50%;
  }
  p {
    margin-top: 5px;
    margin-bottom: 0;
  }
`

const TeacherCourses = (props) => {
  const [semesters, setSemesters] = React.useState([]);
  const [selectedSemester, setSelectedSemester] = React.useState('');
  const [semesterCourses, setSemesterCourses] = React.useState([]);
  const [teacherGroups, setTeacherGroups] = React.useState([]);

  const user = React.useContext(UserContext)

  React.useEffect(
    () => {
      getSemesters();
      getTeacherGroups();
      getCurrentSemester();
    },
    []
  )

  React.useEffect(
    () => {
      getSemesterCourses();
    },
    [selectedSemester]
  )

  const getSemesters = async () => {
    setSemesters(await awsHelper.getSemestersList());
  }

  const getCurrentSemester = async () => {
    const currentSemester = await awsHelper.getCurrentAcademicCalendar();
    setSelectedSemester(currentSemester.id)
  }

  const setSemester = (e) => {
    console.log(e.target.value);
    setSelectedSemester(e.target.value);
  }

  const getTeacherGroups = async () => {
    setTeacherGroups(
      await awsHelper.getTeacherGroups(user.userData.id)
    )
  }

  const getSemesterCourses = () => {
    const semesterGroups = teacherGroups.filter((group) => group.academicCalendar === selectedSemester)
    setSemesterCourses(
      semesterGroups
    )
  }

  return <TeacherCoursesContainer>
    <TeacherCoursesHeader>
      <h2>Mis cursos del semestre</h2>
      <Dropdown
        width="150px"
        onChange={setSemester}
      >
        {
          semesters.map(
            (semester) => <option key={semester.id} value={semester.id}>{`${semester.year}-${semester.period}`}</option>
          )
        }
      </Dropdown>
    </TeacherCoursesHeader>
      <h4>{ semesterCourses.length } resultado{semesterCourses.length>1 ? 's' : ''}</h4>
    <TeacherCoursesBody>
      {
        semesterCourses.map(
          (course) => (
            <CourseCard>
              <Link to={`/profesor/curso/${course.id}`}><h3>{course.name}</h3></Link>
              <CourseCardFooter>
                <p className="groups">2 grupos</p>
                <p className="students">{course.students.length} estudiantes</p>
                <p className="code">{ course.code }</p>
              </CourseCardFooter>
            </CourseCard>
          )
        )
      }
    </TeacherCoursesBody>
  </TeacherCoursesContainer>
}

export default TeacherCourses;