import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import Button from "../components/button";
import Input from "../components/input";
import * as awsHelper from "../utilities/aws-helper";
import { parseDate, parseShedule } from "../utilities/date-helper";
import Modal from 'react-modal';

const ModalStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const TeacherCourseDetailContainer = styled.div`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.textTheme.primaryColor};
  h2,h3,p {
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 10px;
  }
  .wrapper {
    width: 100%;
    height: 100%;
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
  & > * {
    margin-bottom: 20px;
  }
  .buttons > *:not(:last-child) {
    margin-right: 1em;
  }

  .subtitle {
    font-size: 1.1em;
    color: ${(props) => props.theme.colors.secondary};
  }
  
  .data {
    margin: 0.5em 0.5em 2em 0.5em;
    font-size: 1.2em;
    tr {
      display:flex;
      td {
        padding-right: 5px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }
    }
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
    height: 100%;
    align-items: center;
    align-self: center;
  }
`;

const Grid = styled.div`
  ${(props) => {
    const { columns, margin } = props
    const [vMargin, hMargin] = margin ? margin.split(' ') : []
    const columnMargin = hMargin ? hMargin : `${(columns - 1) / columns}em`
    const rowMargin = vMargin ? vMargin : `2em`

    const columnWidth =
      `calc(100% / ${columns} - ((${columns} - 1) * ${columnMargin} / ${columns}))`

    return `
    display: flex;
    flex-wrap: wrap;

    & > * {
      width: ${columnWidth};
      ${columnMargin && `
        &:not(:nth-child(${columns}n)) {
          margin-right: ${columnMargin};
        }
      `}
      ${rowMargin && `
        margin-bottom: ${rowMargin};
      `}
    }

    @media (max-width: 900px) {
      display: block;
      & > * {
        width: auto;
        margin-right: 0 !important;
        margin-bottom: 2em;
      }
    }
  `
  }}
`


const TeacherCourseDetail = (props) => {
  const [course, setCourse] = React.useState(undefined);
  const [teacher, setTeacher] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);
  const [downloadTemplateModalIsOpen,setDownloadTemplateIsOpen] = React.useState(false);
  const [gradeItems, setGradeItems] = React.useState([
    { name: "", percentage: 0 },
  ]);
  const [students, setStudents] = React.useState(undefined);

  function openDownloadTemplateModal() {
    setDownloadTemplateIsOpen(true);
  }

  function closeDownloadTemplateModal(){
    setDownloadTemplateIsOpen(false);
  }

  React.useEffect(
    () => {
      getCourse();
    },
    []
  )

  React.useEffect(
    () => {
      setLoading(false);
      if (course) {
        getStudents();
      }
    },
    [course]
  );

  const getCourse = async () => {
    setLoading(true);
    const courseResponse = await awsHelper.getGroup(props.match.params.courseID);
    setCourse(courseResponse);
  }

  const getStudents = async () => {
    const studentsPromises = course.students.map(
      (student) => awsHelper.getUserData(student)
    );
    Promise.all(studentsPromises)
      .then(
        (studentsInfo) => {
          setStudents(
            studentsInfo
          )
        }
      )
  }

  const onItemChange = (e) => {
    setGradeItems((oldItems) => {
      const itemId = parseInt(e.target.name.split("-")[2]);
      const itemKey = e.target.name.split("-")[1];
      const newItes = [...oldItems];
      newItes[itemId][itemKey] = e.target.value;
      return newItes;
    });
  };

  return <TeacherCourseDetailContainer>
    { !course &&
      <TeacherCourseDetailHeader>
        <h2>Cargando...</h2>
      </TeacherCourseDetailHeader>
    }
    { course &&
      <div className="wrapper">
        <TeacherCourseDetailHeader>
          <BackLink to="/dashboard/profesor/mis-cursos">
            <i className="material-icons-round">arrow_left</i>
          </BackLink>
          <div>
            <h2>{course.name}</h2>
            <p>Actualizado el {parseDate(course.update_datetime)}</p>
          </div>
        </TeacherCourseDetailHeader>
        <TeacherCourseDetailBody>
          <TeacherCourseGrades>
              <div>
                <h3>Notas:</h3>
                <p>Actualizado el {parseDate(course.update_datetime)}</p>
              </div>
              <div className="actions">
                <Button withIcon onClick={openDownloadTemplateModal}>
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
          <Grid columns={2}>
            <div>
              <b className='subtitle'>Código:</b>
              <p className='data'>{course.code}</p>

              <b className='subtitle'>Materia:</b>
              <p className='data'>{ course.name }</p>

              <b className='subtitle'>Cupos:</b>
              <table className='data'>
                <tr>
                  <td>Disc. obligatoria:</td>
                  <td>{ course.capacityDistribution.disciplinaryObligatory }</td>
                </tr>
                <tr>
                  <td>Disc. optativa:</td>
                  <td>{ course.capacityDistribution.disciplinaryOptional }</td>
                </tr>
                <tr>
                  <td>Fundamentación:</td>
                  <td>{ course.capacityDistribution.fundamentation }</td>
                </tr>
                <tr>
                  <td>Libre elección:</td>
                  <td>{ course.capacityDistribution.freeElection }</td>
                </tr>
                <tr>
                  <td><b>Total:</b></td>
                  <td><b>{
                    (parseInt(course.capacityDistribution.disciplinaryObligatory) || 0) +
                    (parseInt(course.capacityDistribution.disciplinaryOptional) || 0) +
                    (parseInt(course.capacityDistribution.fundamentation) || 0) +
                    (parseInt(course.capacityDistribution.freeElection) || 0)
                  }</b></td>
                </tr>
              </table>
            </div>

            <div>
            <b className='subtitle'>Horarios:</b>
              <table className='data'>
                {
                  parseShedule(course.schedule).map(
                    (date) => (
                      <tr>
                        <td>{date.day}</td>
                        <td>{date.hours}</td>
                      </tr>
                    )
                  )
                }
              </table>

              <b className='subtitle'>Participantes:</b>
              <table className='data'>
                <tr>
                  <td>Profesor:</td>
                  <td>Alejandro Díaz</td>
                </tr>
                <tr>
                  <td>Estudiantes:</td>
                  <td>{
                    course.students.length <= 0
                      ? "Aún no hay estudiantes en este grupo"
                      : (
                        students
                        ? students.map(
                          (student) => (
                            <div>
                              <span>{student.username}</span>
                            </div>
                          )
                        )
                        : "Cargando..."
                      )
                  }</td>
                </tr>
              </table>
            </div>
          </Grid>
        </TeacherCourseDetailBody>
      </div>
    }
    <Modal
      isOpen={downloadTemplateModalIsOpen}
      onRequestClose={closeDownloadTemplateModal}
      style={ModalStyles}
      contentLabel="Example Modal"
    >
      <h2>Descargar plantilla de notas</h2>
      <h3>Items de evaluación</h3>
      {gradeItems.map((row, idx) => (
        <div class="form-group">
          <Input
            type="text"
            smallBorder
            placeholder="Nombre"
            name={"item-name-" + idx}
            onChange={onItemChange}
          />
          <Input
            type="number"
            smallBorder
            withIcon
            placeholder="Porcentaje"
            name={"item-percentage-" + idx}
            onChange={onItemChange}
          />
        </div>
      ))}
      <hr />
      <div className="modal-actions">
        <Button
          alt
          onClick={() => setGradeItems([...gradeItems, { name: "", percentage: 0 }])}
        >
          Añadir item
        </Button>
        <Button
          solid
          onClick={() => setGradeItems([...gradeItems, { name: "", percentage: 0 }])}
        >
          Descargar plantilla
        </Button>
      </div>
    </Modal>
  </TeacherCourseDetailContainer>
}

export default TeacherCourseDetail;