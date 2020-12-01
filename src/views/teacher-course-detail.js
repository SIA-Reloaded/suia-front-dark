import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import Button from "../components/button";
import Input from "../components/input";
import * as awsHelper from "../utilities/aws-helper";
import { parseDate, parseShedule } from "../utilities/date-helper";
import Modal from 'react-modal';
import Excel from "exceljs/dist/es5/exceljs.browser";

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
`;

const GradesTable = styled.table`
  width: 100%;
  text-align: center;

  tr {
    td {
      &:not(:last-child) {
        padding: 15px 10px 15px 0;
      }
    }
  }
`;


const TeacherCourseDetail = (props) => {
  const [course, setCourse] = React.useState(undefined);
  const [teacher, setTeacher] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);
  const [grades, setGrades] = React.useState(undefined);
  const [lastGrades, setLastGrades] = React.useState(undefined);
  const [downloadTemplateModalIsOpen,setDownloadTemplateIsOpen] = React.useState(false);
  const [gradesModalIsOpen,setGradesIsOpen] = React.useState(false);
  const [gradeItems, setGradeItems] = React.useState([
    { name: "", percentage: 0 },
  ]);
  const [students, setStudents] = React.useState(undefined);

  function openDownloadTemplateModal() {
    setGradeItems([
      { name: "", percentage: 0 },
    ]);
    setDownloadTemplateIsOpen(true);
  }

  function closeDownloadTemplateModal(){
    setDownloadTemplateIsOpen(false);
  }

  function openGradesModal() {
    setGradesIsOpen(true);
  }

  function closeGradesModal(){
    setGradesIsOpen(false);
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
        getGrades();
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

  const getGrades = async () => {
    const responseGrades = await awsHelper.getGroupGrades(props.match.params.courseID);
    setGrades(responseGrades);
    setLastGrades(
      responseGrades.reduce(
        (x, y) => x.update_datetime > y.update_datetime ? x : y
      )
    );
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

  const getColumnLetter = (idx) => String.fromCharCode(65 + idx);

  const downloadTemplate = () => {
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet('Grades');
    const padding = 5;
    sheet.columns = [
      {header: 'ID', key: 'id'},
      {header: 'Nombre', key: 'name'},
      ...gradeItems.map(
        (gradeItem) => ({
          header: `${gradeItem.name} - ${gradeItem.percentage}%`,
          key: gradeItem.name.replace(/\s/g, '').toLowerCase(),
          width: `${gradeItem.name} - ${gradeItem.percentage}%`.length + padding
        })
      ),
      {header: 'Total', key: 'total'},
    ];
    let maxIDWidth=0, maxNameWidth=0;
    students.forEach((student, idx) => {
      const currentRow = idx+2;
      const gradeFormulas = gradeItems.map((item, idx2) => `(${getColumnLetter(idx2+2)}${currentRow}*${parseFloat(item.percentage)/100})`);
      const name = student.basicData.firstName + ' ' + student.basicData.lastName;
      maxIDWidth = student.id.length > maxIDWidth ? student.id.length : maxIDWidth;
      maxNameWidth = name.length > maxNameWidth ? name.length : maxNameWidth;
      
      sheet.addRow({
        id: student.id,
        name,
        total: {
          formula: `=${ gradeFormulas.join('+') }`
        }
      })
    });
    sheet.getColumn('id').width = maxIDWidth + padding;
    sheet.getColumn('name').width = maxNameWidth + padding;
    workbook.xlsx.writeBuffer().then(function (data) {
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      const blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = "grades.xslx";
      a.click();
      window.URL.revokeObjectURL(url);
      closeDownloadTemplateModal();
    });
  }

  const renderGradesTable = () => {
    const studentGrades = lastGrades.grades.map(
      (grade) => {
        const newGrade = {...grade};
        newGrade.student = students.find(
          (student) => student.id === newGrade.student_id
        )
        return newGrade;
      }
    );
    return <GradesTable>
      <thead>
        <tr>
          <th>Nombre</th>
          {
            lastGrades.grade_items.map(
              (item) => <th>{item.label} - {item.percentage}%</th>
            )
          }
        </tr>
        { studentGrades.map(
            (student) => <tr>
                <td>{student.student.basicData.firstName + ' ' + student.student.basicData.lastName}</td>
                {
                  student.grades.map(
                    (grade) => <td>{grade.grade}</td>
                  )
                }
              </tr>
          )
        }
      </thead>
    </GradesTable>
  }

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
                <p>{lastGrades ? `Actualizado el ${parseDate(lastGrades.update_datetime)}` : "Cargando"}</p>
              </div>
              <div className="actions">
                <Button withIcon onClick={openDownloadTemplateModal}>
                  <i className="material-icons-round">face</i>
                  Descargar plantilla de notas
                </Button>
                <Button withIcon onClick={openGradesModal}>
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
      contentLabel="Descargar plantilla"
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
          onClick={downloadTemplate}
        >
          Descargar plantilla
        </Button>
      </div>
    </Modal>
    <Modal
      isOpen={gradesModalIsOpen}
      onRequestClose={closeGradesModal}
      style={ModalStyles}
      contentLabel="Notas"
    >
      <h2>Notas</h2>
      {lastGrades && renderGradesTable()}
    </Modal>
  </TeacherCourseDetailContainer>
}

export default TeacherCourseDetail;