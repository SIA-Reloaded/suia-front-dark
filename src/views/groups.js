import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import SectionContainer from '../components/dashboard-section';
import { SearchInput } from '../components/input';
import Button from '../components/button';

const GroupsLayout = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`

const GroupsTable = styled.table`
  width: 100%;
`

const Groups = (props) => {
  const [mustNavigate, setMustNavigate] = React.useState(false)
  
  const onCreateGroupClick = () => {
    setMustNavigate(true)
  }

  const handleCourseNameChange = (e) => {

  }

  const handleCourseCodeChange = (e) => {
  
  }

  if (mustNavigate) return <Redirect push to={props.match.url + "/crear-grupo"}/>

  return <SectionContainer>
    <GroupsLayout>
      <div>
        <SearchInput onChange={handleCourseNameChange} width='300px' placeholder='Busca por nombre de materia'/>
        <SearchInput onChange={handleCourseCodeChange} placeholder='Busca por código'/>
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
    </GroupsTable>
  </SectionContainer>
}



export default Groups;
