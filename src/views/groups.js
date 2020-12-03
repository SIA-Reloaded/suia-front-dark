import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Redirect, Link } from 'react-router-dom';
import SectionContainer from '../components/dashboard-section';
import { SearchInput } from '../components/input';
import Button from '../components/button';

import * as awsHelper from '../utilities/aws-helper';
import Group from '../models/group';

const GroupsLayout = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;

  form {
    display: flex;
    
  }
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
  const [mustNavigate, setMustNavigate] = useState(false)
  const [courseName, setCourseName] = useState('')
  const [courseCode, setCourseCode] = useState('')
  const [rows, setRows] = useState([])

  useEffect(() => {
    awsHelper.getGroups().then((response) => {
      const rows = response.map((group) => new Group(
        group.id,
        group.name,
        group.code,
        group.capacityDistribution,
        group.group,
        group.schedule,
        group.classroom,
        group.students,
        group.teacher
      ))
      setRows(rows)
    }
    );
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const rows = await awsHelper.getGroups(courseName, courseCode);
    setRows(rows)
  }

  const onCreateGroupClick = () => {
    setMustNavigate(true)
  }

  const handleSearchInputChange = (e) => {
    const value = e.target.value
    switch (e.target.name) {
      case 'courseName':
        setCourseName(value)
        break;
      case 'courseCode':
        setCourseCode(value)
        break;
      default:
        break;
    }
  }


  if (mustNavigate) return <Redirect push to={props.match.url + "/crear-grupo"} />

  return <SectionContainer>
    <GroupsLayout>
      <form onSubmit={handleSubmit}>
        <SearchInput onChange={handleSearchInputChange} name='courseName' width='300px' placeholder='Busca por nombre de materia' />
        <SearchInput onChange={handleSearchInputChange} name='courseCode' placeholder='Busca por código' />
        <Button type='submit' withIcon solid onClick={handleSubmit}>
          <i className="material-icons-round">search</i>
        Buscar grupo
      </Button>
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
            {row.rowRepresentation.map((data, i) => <td key={data} >{data}</td>)}
            <td><Link to={
              {
                pathname: props.match.url + '/detalle',
                state: {
                  group: row
                }
              }
            }
            >Ver</Link></td>
          </tr>
        })}
      </tbody>
    </GroupsTable>
  </SectionContainer>
};

export default Groups;
