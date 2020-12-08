import React, { useEffect } from 'react'
import SectionContainer from '../components/section-container'
import Dropdown from './../components/drop-down'
import Button from './../components/button'
import * as awsHelper from './../utilities/aws-helper'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';




const CourseCard = styled.div`
  flex: 0 0 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 10px;
  margin-bottom: 0px;
  background-color: ${(props) => props.theme.colors.gray[4]};
  padding: 5px;
  align-self: start;
  border-radius: 15px;
  h4 {
    margin: 0;
    color: ${(props) => props.theme.colors.secondary};
    font-weight: 600;
  }
`

const RequestsSearchTable = styled.table`
    width: 20%;
    text-align: center;

    tr {
        td {
            &:not(:last-child) {
            padding: 10px 10px 10px 0;
            }
        }
    }
`;

const RequestsTable = styled.table`
    width: 80%;
    text-align: center;
    tr {
        td {
            &:not(:last-child) {
            padding: 15px 10px 15px 0;
            }
        }
    }
`;

const RequestsBody = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
`

const RequestsContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;

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


const Div = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  width: ${(props) => props.width};
  margin-bottom: ${(props) => props.marginBottom};
  margin-top: ${(props) => props.marginBottom};
  align-items: flex-start;
`

const Text = styled.p`
  font-size: ${(props) => props.size};
  margin-left: 15px;
  color: ${(props) => props.color};
`

const ManageRequests = (props) => {

  const types = ["Sobrecupo"]
  const [requests, setRequests] = React.useState([])

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClickSearch = async () => {
    setRequests((await awsHelper.getAllRequests()).Items)
  }

  const onClickAccept = async (id, requester_id, courseID) => {

    const bodyUpdateRequest = {
      id: id,
      state: "aprobado",
      requester_id: requester_id,
      courseID: courseID
    }

    await awsHelper.updateRequest(bodyUpdateRequest).then(response => {
      const bodyPutStudentInCourseGroup = {
        requester_id: requester_id,
        courseID: courseID
      }
      awsHelper.putStudentInCourseGroup(bodyPutStudentInCourseGroup).then(res => {
        console.log("response after putStudnet In courseGroup: |", res)
      })

    })
    handleOpen()


  }

  const onClickDeny = async (id) => {
    const body = {
      id: id,
      state: "rechazado"
    }
    await awsHelper.updateRequest(body)

  }

  useEffect(() => {
    onClickSearch()
  })

  return (
    <SectionContainer>
      <h3>Filtrar por:</h3>
      <Div
        width="100%"
        direction="row"
      >
        <RequestsSearchTable>
          <Div
            width="30%"
            direction="column">
            <th><Text size="19px">Tipo</Text></th>
            <td><Dropdown
              marginLeft="15px">
              {types.map(type => <option>{type}</option>
              )}
            </Dropdown>
            </td>
          </Div>
        </RequestsSearchTable>
        <Button
          marginTop="65px"
          withIcon solid onClick={onClickSearch}>
          <i className="material-icons-round">search</i>
                      Buscar
        </Button>
      </Div>
      <RequestsBody>

        <RequestsContainer>
          {requests.filter((aux) => aux.state == "sin_revisar").map(request => (
            <CourseCard>
              <RequestsTable>
                <tr><h4>Fecha Peticion: </h4>{request.create_datetime.slice(0, 10)}</tr>
                <tr><h4>Hora Peticion: </h4>{request.create_datetime.slice(11, -5)}</tr>
                <tr><h4>Estudiante: </h4>{request.requester_id}</tr>
                <tr><h4>Estado: </h4>{request.state}</tr>
                <tr><h4>Tipo: </h4>{request.type}</tr>
                <tr><h4>Curso: </h4>{request.courseName}</tr>
                <Button solid onClick={e => onClickAccept(request.id, request.requester_id, request.courseID)}>Aceptar</Button>
                <Button solid onClick={e => onClickDeny(request.id)}>Rechazar</Button>
              </RequestsTable>
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
                    <h1 id="transition-modal-title">Confirmación de sobrecupo</h1>
                  </div>
                </Fade>
              </Modal>
            </CourseCard>
          ))}
        </RequestsContainer>
      </RequestsBody>



    </SectionContainer >
  )
}

export default ManageRequests