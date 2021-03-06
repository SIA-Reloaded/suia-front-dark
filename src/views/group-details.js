import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Button from '../components/button'
import { UserContext } from '../providers/user-provider';

const GroupDetails = (props) => {
  const { group } = props.location.state
  const user = React.useContext(UserContext)

  console.log(group)
  console.log(group.rowRepresentation)

  return <GroupDetailsContainer>
    <Grid columns={2}>
      <div>
        <h2><b>GRUPO 3:</b> Ingeniaría de software 1</h2>
      </div>

      <div className='buttons'>
        {user.currentRole !== 'PROFESSOR' && <>
          <Button alt>Eliminar</Button>
          <Button alt>Editar</Button>
        </>}

      </div>
    </Grid>

    <Grid columns={2}>
      <div>
        <b className='subtitle'>Código:</b>
        <p className='data'>{group.code}</p>

        <b className='subtitle'>Materia:</b>
        <p className='data'>{group.name}</p>

        <b className='subtitle'>Cupos:</b>
        <table className='data'>
          <tr>
            <td>Disc. obligatoria:</td>
            <td>{group.capacityDistribution.disciplinaryObligatory}</td>
          </tr>
          <tr>
            <td>Disc. optativa:</td>
            <td>{group.capacityDistribution.disciplinaryOptional}</td>
          </tr>
          <tr>
            <td>Fundamentación:</td>
            <td>{group.capacityDistribution.freeElection}</td>
          </tr>
          <tr>
            <td>Libre elección:</td>
            <td>{group.capacityDistribution.fundamentation}</td>
          </tr>
          <tr>
            <td><b>Total:</b></td>
            <td><b>{group.totalCapacity}</b></td>
          </tr>
        </table>
      </div>

      <div>
        <b className='subtitle'>Horarios:</b>
        <table className='data'>
          <tr>
            <td>Lunes:</td>
            <td>16:00 - 18:00</td>
          </tr>
          <tr>
            <td>Miércoles:</td>
            <td>16:00 - 18:00</td>
          </tr>
        </table>

        <b className='subtitle'>Participantes:</b>
        <table className='data'>
          <tr>
            <td>Profesor:</td>
            <td>Alejandro Díaz</td>
          </tr>
          <tr>
            <td>Estudiantes:</td>
            <td>Aún no hay estudiantes en este grupo</td>
          </tr>
        </table>
      </div>
    </Grid>
  </GroupDetailsContainer>
}

const GroupDetailsContainer = styled.div`${(props) => `
  height: calc(100% - 80px);
  width: 100%;

  .buttons > *:not(:last-child) {
    margin-right: 1em;
  }

  .subtitle {
    font-size: 1.1em;
    color: ${props.theme.colors.secondary};
  }
  
  .data {
    margin: 0.5em 0.5em 2em 0.5em;
    font-size: 1.2em;
  }
`}`

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

export default GroupDetails;
