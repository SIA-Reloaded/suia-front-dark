import React, { useEffect} from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import SectionContainer from '../components/dashboard-section';
import { SearchInput } from '../components/input';
import Button from '../components/button';
import GroupModel from '../models/group'

const GroupsLayout = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`

const GroupsTable = styled.table`
  width: 100%;

  tr {
    td {
      &:not(:last-child) {
        padding: 15px 10px 15px 0; 
      }
    }
  }

`

const Groups = (props) => {
  const [mustNavigate, setMustNavigate] = React.useState(false)
  const [rows, setRows] = React.useState([new GroupModel(
    12324,
    "Ingeniaría de software 1",
    "202011",
    {
      "fundametation": 5,
      "disciplinaryObligatory": 28
    },
    3,
    [
      {
        "day": "MO",
        "startHours": "16:00",
        "endHours": "18:00"
      },
      {
        "day": "WE",
        "startHours": "16:00",
        "endHours": "18:00"
      }
    ],
    "El viejo - salón 401",
    [],
    { name: "Alejandro Díaz", id: "123344324123412" }
  )])

  useEffect(() => {
    
  });


  const onCreateGroupClick = () => {
    setMustNavigate(true)
  }

  const handleCourseNameChange = (e) => {
    
  }

  const handleCourseCodeChange = (e) => {

  }

  if (mustNavigate) return <Redirect push to={props.match.url + "/crear-grupo"} />

  return <SectionContainer>
    <GroupsLayout>
      <div>
        <SearchInput onChange={handleCourseNameChange} width='300px' placeholder='Busca por nombre de materia' />
        <SearchInput onChange={handleCourseCodeChange} placeholder='Busca por código' />
      </div>
      <Button withIcon solid onClick={onCreateGroupClick}>
        <i className="material-icons-round">add</i>
        Nuevo grupo
      </Button>
    </GroupsLayout>
    <GroupsTable>
      <thead>
        <tr>
          <th>
            CÓDIGO
          </th>
          <th>
            MATERIA
          </th>
          <th>
            GRUPO
          </th>
          <th>
            HORARIO
          </th>
          <th>
            PROFESOR
          </th>
          <th>
            CUPOS
          </th>
          <th>
            PARTICIPANTES
          </th>
          <th>
          </th>
        </tr>
      </thead>
      <tbody>

        {rows.map(row => {
          return <tr>
            {row.rowRepresentation.map((data) => <td key={data} >{data}</td>)}
          </tr>
        })}
      </tbody>
    </GroupsTable>
  </SectionContainer>
}



export default Groups;
