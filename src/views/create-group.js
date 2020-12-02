import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../components/input";
import Button from "../components/button.js";
import GroupModel from "../models/group";
import { createGroup } from "../utilities/aws-helper";

import * as awsHelper from '../utilities/aws-helper';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { CenteredLoader } from '../components/loader';
import { Redirect } from "react-router";

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

const CreateGroup = (props) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCourseCode, setselectedCourseCode] = useState("");
  const [discObli, setDiscObli] = useState(0);
  const [discOpta, setDiscOpta] = useState(0);
  const [fund, setFund] = useState(0);
  const [libre, setLibre] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mustNavigate, setMustNavigate] = useState(false);
  const [shedule, setShedule] = useState([
    { day: "", startHours: "", endHours: "" },
  ]);


  useEffect(() => {
    awsHelper.getCourses().then((data) => {
      setCourses(data)
    });
  }, [])

  const saveGroup = async () => {
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
      1,
      shedule,
      "Ingeniería - 401",
      [],
      null
    );

    await createGroup(group);
    console.log("lala")
    setMustNavigate(true)
  };

  const onSessionChange = (e) => {
    setShedule((oldShedule) => {
      const sessionId = parseInt(e.target.name.split("-")[2]);
      const sessionKey = e.target.name.split("-")[1];
      const newShedule = [...oldShedule];
      newShedule[sessionId][sessionKey] = e.target.value;
      return newShedule;
    });
  };

  if ( mustNavigate) return <Redirect to='/grupos'/>;
  if ( isLoading ) return <CenteredLoader/>;

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
                console.log(newValue)
                setSelectedCourse(newValue);
                setselectedCourseCode(newValue);
              }}
              options={courses}
              getOptionLabel={(option) => option.name || ''}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <Input width="250px" type="text" {...params.inputProps} placeholder='Nombre' />
                </div>
              )}
            />
            <Autocomplete
              value={selectedCourseCode}
              onChange={(event, newValue) => {
                console.log(newValue)
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
          {shedule.map((row, i) => (
            <div key={i} className="form-group">
              <Input
                type="text"
                smallBorder
                placeholder="Day"
                name={"session-day-" + i}
                onChange={onSessionChange}
              />
              <Input
                type="text"
                smallBorder
                placeholder="Start hour"
                name={"session-startHours-" + i}
                onChange={onSessionChange}
              />
              <Input
                type="text"
                smallBorder
                placeholder="End hour"
                name={"session-endHours-" + i}
                onChange={onSessionChange}
              />
            </div>
          ))}
          <Button
            alt
            onClick={() => setShedule([...shedule, { day: "", hour: "" }])}
          >
            Añadir horario
          </Button>
        </div>
        <div className="column">
          <h3>Participantes</h3>
          <div>
            <h4>Profesor:</h4>
            <Input smallBorder />
          </div>
          <div>
            <h4>Estudiantes:</h4>
            <Input smallBorder height="100px" />
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
