import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import Button from "../components/button"
import * as awsHelper from "../utilities/aws-helper";
import { parseDate } from "../utilities/date-helper"

const TeacherCourseDetailContainer = styled.div`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.textTheme.primaryColor};
  h2,h3,p {
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 10px;
  }
`;

const TeacherCourseDetailHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;  
`;

const TeacherCourseDetailBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  * {
    margin-bottom: 20px;
  }
`;

const BackLink = styled(Link)`
  text-decoration: none;
  margin-right: 10px;
  color: ${(props) => props.theme.textTheme.primaryColor};
`

const TeacherCourseGrades = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  .actions {
    display: flex;
  }
`;

const TeacherCourseDetail = (props) => {
  const [course, setCourse] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(
    () => {
      getCourse();
    },
    []
  )

  const getCourse = async () => {
    setLoading(true);
    const courseResponse = await awsHelper.getGroup(props.match.params.courseID);
    setCourse(courseResponse);
    setLoading(false);

  }

  return <TeacherCourseDetailContainer>
      { loading &&
        <TeacherCourseDetailHeader>
          <h2>Cargando...</h2>
        </TeacherCourseDetailHeader>
      }
      { !loading &&
        <TeacherCourseDetailHeader>
          <BackLink to="/dashboard/profesor/mis-cursos">
            <i className="material-icons-round">arrow_left</i>
          </BackLink>
          <div>
            <h2>{course.name}</h2>
            <p>Actualizado el {parseDate(course.update_datetime)}</p>
          </div>
        </TeacherCourseDetailHeader>
      }
    <TeacherCourseDetailBody>
      <TeacherCourseGrades>
          <div>
            <h3>Notas:</h3>
            <p>Actualizado el {parseDate(course.update_datetime)}</p>
          </div>
          <div className="actions">
            <Button withIcon>
              <i className="material-icons-round">face</i>
              Descargar plantilla de notas
            </Button>
            <Button withIcon>
              <i className="material-icons-round">face</i>
              Ver notas
            </Button>
            <Button withIcon solid>
              <i className="material-icons-round">update</i>
              Actualizar notas
            </Button>
          </div>
      </TeacherCourseGrades>
      <p>fgjl</p>
    </TeacherCourseDetailBody>
  </TeacherCourseDetailContainer>
}

export default TeacherCourseDetail;