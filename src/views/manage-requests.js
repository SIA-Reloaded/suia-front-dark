import React from 'react'
import SectionContainer from '../components/section-container'
import Dropdown from './../components/drop-down'
import Button from './../components/button'
import Input from './../components/input'
import * as awsHelper from './../utilities/aws-helper'
import styled from 'styled-components'
import Requests from './requests'


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
  justify-content: space-between;
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
const RequestsSearchTable = styled.table`
    width: 40%;
    text-align: center;

    tr {
        td {
            &:not(:last-child) {
            padding: 15px 10px 15px 0;
            }
        }
    }
`;

const RequestsTable = styled.table`
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

const RequestsBody = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
`

const ManageRequests = (props) => {

    const types = ["Sobrecupo"]
    const [requests, setRequests] = React.useState([])

    // buscar de un rango de creación
    // buscar de un rango de update
    // buscar por tipo
    // buscar por ID de curso
    
    const onClickSearch = async () => {
        setRequests((await awsHelper.getAllRequests()).Items)
        console.log(requests)
    }

    const onClickAccept = async (id, requester_id, courseID) => {
        console.log(id)
        const bodyUpdateRequest = {
            id: id,
            state: "aprovado"
        }

        await awsHelper.updateRequest(bodyUpdateRequest)

        const bodyPutStudentInCourseGroup = {
            requester_id: requester_id,
            courseID: courseID
        }
        await awsHelper.putStudentInCourseGroup(bodyPutStudentInCourseGroup)
    }

    const onClickDeny = async (id) => {
        const body = {
            id: id,
            state: "rechazado"
        }
        await awsHelper.updateRequest(body)
    }

    return (
        <SectionContainer>
            <h3>Filtrar por:</h3>


            <RequestsSearchTable>

                <tr>
                    <th>Tipo</th>
                    <td><Dropdown>
                        {types.map(type => <option>{type}</option>
                        )}
                    </Dropdown>
                    </td>
                </tr>
                <tr>
                    <th>Año</th>
                    <td>Desde 2000 hasta 2001</td>
                </tr>
                <tr>
                    <th>Mes</th>
                    <td>Desde Enero hasta Noviembre</td>
                </tr>
                <tr>
                    <th>Codigo de curso</th>
                    <td><Input></Input></td>
                </tr>

            </RequestsSearchTable>
            <Button withIcon solid onClick={onClickSearch}>
                <i className="material-icons-round">search</i>
                    Buscar
            </Button>

            <RequestsBody>


                {requests.map(request => (
                    <CourseCard>
                        <RequestsTable>
                            {/* la idea sería traer el nombre del estudiante a partir del id */}

                            <tr>Fecha Peticion: {request.create_datetime.slice(0, 10)}</tr>
                            <tr>Hora Peticion: {request.create_datetime.slice(11, -5)}</tr>
                            <tr>Estudiante: {request.requester_id}</tr>
                            <tr>Estado: {request.state}</tr>
                            <tr>Tipo: {request.type}</tr>
                            <Button solid onClick={e => onClickAccept(request.id, request.requester_id, request.courseID)}>Aceptar</Button>
                            <Button solid onClick={e => onClickDeny(request.id)}>Rechazar</Button>
                        </RequestsTable>
                    </CourseCard>

                ))}


            </RequestsBody>



        </SectionContainer >
    )
}

export default ManageRequests