import React, { useContext, useEffect } from 'react'
import SectionContainer from '../components/section-container'
import Dropdown from './../components/drop-down'
import Button from './../components/button'
import * as awsHelper from './../utilities/aws-helper'
import styled from 'styled-components'

import { UserContext } from '../providers/user-provider'


const CourseCard = styled.div`
  flex: 0 0 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 10px;
  margin-bottom: 0px;
  background-color: ${(props) => props.theme.colors.gray[4]};
  padding: 5px;
  height: 250px;
  border-radius: 15px;
  h4 {
    margin: 0;
    color: ${(props) => props.theme.colors.secondary};
    font-weight: 600;
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

const RequestsContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;
`

const ManageRequests = (props) => {

    const types = ["Sobrecupo"]
    const [requests, setRequests] = React.useState([])
    const user = useContext(UserContext)

    // buscar de un rango de creación
    // buscar de un rango de update
    // buscar por tipo
    // buscar por ID de curso

    const onClickSearch = async () => {
        await setRequests((await awsHelper.getAllRequests()).Items)
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

    useEffect(() => {
        onClickSearch()
    })

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
                {/* <tr>
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
                </tr> */}

            </RequestsSearchTable>
            <Button withIcon solid onClick={onClickSearch}>
                <i className="material-icons-round">search</i>
                    Buscar
            </Button>

            <RequestsBody>

                <RequestsContainer>
                    {requests.filter((aux) => aux.state == "sin_revisar").map(request => (
                        <CourseCard>
                            <RequestsTable>
                                {/* la idea sería traer el nombre del estudiante a partir del id */}

                                <tr><h4>Fecha Peticion: </h4>{request.create_datetime.slice(0, 10)}</tr>
                                <tr><h4>Hora Peticion: </h4>{request.create_datetime.slice(11, -5)}</tr>
                                <tr><h4>Estudiante: </h4>{request.requester_id}</tr>
                                <tr><h4>Estado: </h4>{request.state}</tr>
                                <tr><h4>Tipo: </h4>{request.type}</tr>
                                <Button solid onClick={e => onClickAccept(request.id, request.requester_id, request.courseID)}>Aceptar</Button>
                                <Button solid onClick={e => onClickDeny(request.id)}>Rechazar</Button>
                            </RequestsTable>
                        </CourseCard>

                    ))}

                </RequestsContainer>
            </RequestsBody>



        </SectionContainer >
    )
}

export default ManageRequests