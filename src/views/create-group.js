import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../components/input";
import Button from "../components/button.js";
import GroupModel from "../models/group";

import * as awsHelper from '../utilities/aws-helper';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { CenteredLoader } from '../components/loader';
import { Redirect } from "react-router";
import ScheduleSelect from "../components/schedule-selector";

const CreateGroupLayout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 30px;
  .actions {
    display: flex;
    justify-content: center;
    button {
      margin: 10px;
    }
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  .column {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    justify-content: flex-start;
    flex: 1;
    padding: 20px;

    .form-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      input {
        max-width: 32%;
        margin-bottom: 10px;
      }

      h4 {
        margin: 0;
      }
    }
  }

  #auto-complete-input {
    height: 30px;
  }
`;

const AutocompleteContainer = styled.div`
  display: flex;

  div {
    margin-right: 15px;
  }
`

const EmptyCouse = {
  code: "",
  name: "",
}

const CreateGroup = (props) => {
  const [courses, setCourses] = useState([EmptyCouse]);
  const [selectedCourse, setSelectedCourse] = useState(EmptyCouse);
  const [selectedCourseCode, setselectedCourseCode] = useState(EmptyCouse);
  const [discObli, setDiscObli] = useState(0);
  const [discOpta, setDiscOpta] = useState(0);
  const [fund, setFund] = useState(0);
  const [libre, setLibre] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mustNavigate, setMustNavigate] = useState(false);
  const [schedule, setSchedule] = useState([
    { day: "", startHours: "", endHours: "" },
  ]);
  const [teachers, setTeachers] = useState('');
  const [students, setStudents] = useState('');

  useEffect(() => {
    awsHelper.getCourses().then((data) => {
      setCourses([EmptyCouse, ...data])
    });
  }, [])

  const onSelectChange = (schedule, id) => {
    setSchedule((oldSchedule) => {
      const newSchedule = [...oldSchedule];
      newSchedule[id] = schedule;
      return newSchedule;
    });
  }

  const saveGroup = async () => {

    let splitedStudents = []
    let splitedTeacher = []

    if(students) splitedStudents = students.split(',')
    if(teachers) splitedTeacher = teachers.split(',')

    console.log(splitedStudents)

    setIsLoading(true)
    const group = new GroupModel(
      null,
      selectedCourse.name,
      selectedCourseCode.code,
      {
        disciplinaryObligatory: parseInt(discObli),
        disciplinaryOptional: parseInt(discOpta),
        fundamentation: parseInt(fund),
        freeElection: parseInt(libre),
      },
      null,
      schedule,
      "Ingeniería - 402",
      splitedStudents,
      splitedTeacher
    );

    console.log(group )
    console.log(group.groupJson )

    await awsHelper.createGroup(group);
    setMustNavigate(true)
  };



  if (mustNavigate) return <Redirect to='/grupos' />;
  if (isLoading) return <CenteredLoader />;

  return (
    <CreateGroupLayout>
      <h1>Nuevo grupo</h1>
      <FormContainer>
        <div className="column">
          <h3>Materia:</h3>
          <AutocompleteContainer>
            <Autocomplete
              value={selectedCourse}
              onChange={(event, newValue) => {
                setSelectedCourse(newValue);
                setselectedCourseCode(newValue);
              }}
              options={courses}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <Input width="250px" type="text" {...params.inputProps} placeholder='Nombre' />
                </div>
              )}
            />
            <Autocomplete
              value={selectedCourseCode}
              onChange={(event, newValue) => {
                setSelectedCourse(newValue);
                setselectedCourseCode(newValue);
              }}
              options={courses}
              getOptionLabel={(option) => option.code || ''}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <Input width="250px" type="text" {...params.inputProps} placeholder='Código' />
                </div>
              )}
            />
          </AutocompleteContainer>
          <h3>Cupos:</h3>
          <div className="form-group">
            <h4>Disc. obligatoria</h4>
            <Input
              type="number"
              smallBorder
              onChange={(e) => setDiscObli(e.target.value)}
            />
          </div>
          <div className="form-group">
            <h4>Disc. optativa</h4>
            <Input
              type="number"
              smallBorder
              onChange={(e) => setDiscOpta(e.target.value)}
            />
          </div>
          <div className="form-group">
            <h4>Fundamentación</h4>
            <Input
              type="number"
              smallBorder
              onChange={(e) => setFund(e.target.value)}
            />
          </div>
          <div className="form-group">
            <h4>Libre elección</h4>
            <Input
              type="number"
              smallBorder
              onChange={(e) => setLibre(e.target.value)}
            />
          </div>
          <div className="form-group">
            <h4>Total</h4>
            {parseInt(discObli) +
              parseInt(discOpta) +
              parseInt(fund) +
              parseInt(libre)}
          </div>
          <h3>Horarios:</h3>
          {schedule.map((row, i) => (
            <ScheduleSelect key={i} id={i} onChange={onSelectChange}></ScheduleSelect>
          ))}
          <Button 
            alt
            onClick={() => setSchedule([...schedule, { day: "", hour: "" }])}
          >
            Añadir horario
          </Button>
        </div>
        <div className="column">
          <h3>Participantes</h3>
          <div>
            <h4>Profesor(es):</h4>
            <Input smallBorder onChange={(e) => setTeachers(e.target.value)} />
          </div>
          <div>
            <h4>Estudiantes:</h4>
            <Input smallBorder height="100px" onChange={(e) => setStudents(e.target.value)}/>
          </div>
          <div>
            <h4>Total</h4>0
          </div>
        </div>
      </FormContainer>
      <div className="actions">
        <Button>Cancelar</Button>
        <Button solid onClick={saveGroup}>
          Crear grupo
        </Button>
      </div>
    </CreateGroupLayout>
  );
};

export default CreateGroup;
