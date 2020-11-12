import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Redirect, Link } from 'react-router-dom';
import SectionContainer from '../components/dashboard-section';
import { SearchInput } from '../components/input';
import Button from '../components/button';

import * as awsHelper from '../utilities/aws-helper';

const GroupsLayout = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const GroupsTable = styled.table`
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

const Groups = (props) => {
  const [mustNavigate, setMustNavigate] = React.useState(false)
  const [courseCode, setCourseCode] = React.useState(false)
  const [rows, setRows] = React.useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const rows = awsHelper.getGroups(courseCode);
    console.log(rows);
  }

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
      <form onSubmit={handleSubmit}>

        <SearchInput onChange={handleCourseNameChange} width='300px' placeholder='Busca por nombre de materia' />
        <SearchInput onChange={handleCourseCodeChange} placeholder='Busca por código' />
      </form>
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
              <td><Link to={props.match.url + '/detalle'}>Ver</Link></td>
            </tr>
        })}
      </tbody>
    </GroupsTable>
  </SectionContainer>
};

export default Groups;
