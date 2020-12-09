import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ScheduleSelectContainer = styled.div`
  display: flex;
  margin-bottom: 10px;

  select {
    margin-right: 15px;
  }
`

const StyledSelect = styled.select`
  border: 1px solid black;
  border-radius: 8px;
  height: ${(props) => props.height || "30px"};
  padding: 4px 12px;
  width: ${(props) => props.width || "auto"};
  margin-top: ${(props) => props.marginTop};
`

const DaysOfTheWeek = {
  MO: 'Lunes',
  TU: 'Martes',
  WE: 'Miércoles',
  TH: 'Jueves',
  FR: 'Viernes',
  SA: 'Sábado',
  SU: 'Domingo',
}

const HoursOfTheDay = [
  '00:00',
  '1:00',
  '2:00',
  '3:00',
  '4:00',
  '5:00',
  '6:00',
  '7:00',
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
]

const ScheduleSelect = (props) => {
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    props.onChange(schedule, props.id)
  }, [schedule])

  const onSelectorChange = (e) => {
    setSchedule((oldSchedule) => {
      const newSchedule = { ...oldSchedule }
      newSchedule[e.target.name] = e.target.value;
      return newSchedule;
    })
  }


  const daysOptions = []

  for (const day in DaysOfTheWeek) {
    daysOptions.push(<option key={day} value={day}>{DaysOfTheWeek[day]}</option>)
  }

  return <ScheduleSelectContainer>
    <StyledSelect name={`day`} onChange={onSelectorChange}>
      <option value=''>Día de la sesión</option>
      {daysOptions}
    </StyledSelect>
    <StyledSelect name={`startHours`} onChange={onSelectorChange}>
      <option value=''>Hora inicio</option>
      {HoursOfTheDay.map((hour) => <option key={hour} value={hour}>{hour}</option>)}
    </StyledSelect>
    <StyledSelect name={`endHours`} onChange={onSelectorChange}>
      <option value=''>Hora fin</option>
      {HoursOfTheDay.map((hour) => <option key={hour} value={hour}>{hour}</option>)}
    </StyledSelect>
  </ScheduleSelectContainer>
}

export default ScheduleSelect;