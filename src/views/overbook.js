import React, { useContext } from 'react'
import SectionContainer from '../components/section-container'
import Dropdown from './../components/drop-down'
import Button from './../components/button'
import Input from './../components/input'
import * as awsHelper from './../utilities/aws-helper'
import styled from 'styled-components'
import { UserContext } from '../providers/user-provider'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const CourseInfo = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
`
const CourseCard = styled.div`
  flex: 0 0 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.colors.gray[4]};
  padding: 20px;
  height: 150px;
  border-radius: 20px;
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

const CoursesContainer = styled.div`
  height: calc(100% - 80px);
  width: 100%;
  padding-top: 10px;
`
const Div = styled.div`
  display: flex;
  flex-direction: column;
  width:50%;
`

const DivSchedule = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
  font-size: 80%;
  color: grey;
`
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Overbook = (props) => {

  const [courses, setCourses] = React.useState([])
  const [courseCode, setCourseCode] = React.useState(null)
  const user = useContext(UserContext)

  const classes = useStyles();
  

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  const getCoursesByCode = async () => {

    setCourses(await awsHelper.getCourseByCode(courseCode))
  }

  const openModal = () => {
    console.log("me abro")
    return (

      <div>
        <button type="button" onClick={handleOpen}>
          react-transition-group
      </button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Transition modal</h2>
              <p id="transition-modal-description">react-transition-group animates me.</p>
            </div>
          </Fade>
        </Modal>
      </div>
    )
  }


  // genera la peticion de sobrecupo
  // faltaria poner el requester id (primer parametro de la funcion)
  const onClickOverbook = async (courseId, courseName) => {
    const body = {
      "requester_id": user.userData.id,
      "courseID": courseId,
      "courseName": courseName,
      "type": "sobrecupo",
      "state": "sin_revisar"
    }
    await awsHelper.putRequest(body)
    return openModal()
  }

  const onClickSearch = async () => {
    getCoursesByCode()
  }

  return (
    <SectionContainer>
      <h1>SobreCupo</h1>

      <h2>Materia</h2>

      <div>Cód. Materia</div>


      <div>
        <Input
          marginTop="40px"
          value={courseCode} onChange={e => setCourseCode(e.target.value)}></Input>
        <Button
          marginTop="20px"
          type='submit' withIcon solid onClick={onClickSearch}>
          <i className="material-icons-round">search</i>
                    Buscar grupo
                </Button>

      </div>
      <CoursesContainer>
        <CourseInfo>
          {
            courses.map(
              (course) => (
                <CourseCard>
                  <h3>{course["name"]}</h3>
                  <CourseCardFooter>
                    <Div>
                      <p className="classroom">{course["classroom"]}</p>
                      {course.schedule.map((schedule) => (
                        <li className={schedule.day}>{schedule.day} {schedule.startHours} {schedule.endHours}</li>
                      )
                      )
                      }
                    </Div>
                    <DivSchedule>
                      <li type="square">Elección Libre - {course.capacityDistribution.freeElection}</li>
                      <li type="square">Fundamentación - {course.capacityDistribution.fundamentation}</li>
                      <li type="square"> Obligatoria Opcional - {course.capacityDistribution.disciplinaryOptional}</li>
                      <li type="square"> Obligatoria Obligatoria - {course.capacityDistribution.disciplinaryObligatory}</li>
                    </DivSchedule>
                  </CourseCardFooter>
                  <Button solid onClick={e => onClickOverbook(course.id, course.name)}>Pedir Sobrecupo</Button>
                </CourseCard>
              )

            )

          }
        </CourseInfo>
      </CoursesContainer>

    </SectionContainer >
  )
}

export default Overbook
