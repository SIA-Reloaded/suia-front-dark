import React, { useState } from "react";
import styled from "styled-components";
import Input from "../components/input";
import Button from "../components/button.js";
import GroupModel from "../models/group";
import { createGroup } from "../utilities/aws-helper";

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
      flex-direction: row;
      align-items: center;
      padding: 5px;
      padding-left: 20px;
      padding-button: 10px;
      flex-wrap: wrap;
      * {
        flex-basis: 80%;
        flex: 1;
        padding-right: 5px;
      }
      h4 {
        margin: 0;
      }
    }
  }
`;

const CreateGroup = (props) => {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [discObli, setDiscObli] = useState(0);
  const [discOpta, setDiscOpta] = useState(0);
  const [fund, setFund] = useState(0);
  const [libre, setLibre] = useState(0);
  const [shedule, setShedule] = useState([
    { day: "", startHours: "", endHours: "" },
  ]);

  const saveGroup = async () => {
    const group = new GroupModel(
      null,
      courseName,
      courseCode,
      {
        disciplinaryObligatory: discObli,
        disciplinaryOptional: discOpta,
        fundamentation: fund,
        freeElection: libre,
      },
      1,
      shedule,
      "Ingeniería - 401",
      [],
      null
    );
    console.log(await createGroup(group));
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

  return (
    <CreateGroupLayout>
      <h1>Nuevo grupo</h1>
      <FormContainer>
        <div class="column">
          <h3>Materia:</h3>
          <Input
            width="200px"
            placeholder="Nombre"
            onChange={(e) => setCourseName(e.target.value)}
          />
          <Input
            width="200px"
            placeholder="Código"
            onChange={(e) => setCourseCode(e.target.value)}
          />
          <h3>Cupos:</h3>
          <div class="form-group">
            <h4>Disc. obligatoria</h4>
            <Input
              type="number"
              smallBorder
              onChange={(e) => setDiscObli(e.target.value)}
            />
          </div>
          <div class="form-group">
            <h4>Disc. optativa</h4>
            <Input
              type="number"
              smallBorder
              onChange={(e) => setDiscOpta(e.target.value)}
            />
          </div>
          <div class="form-group">
            <h4>Fundamentación</h4>
            <Input
              type="number"
              smallBorder
              onChange={(e) => setFund(e.target.value)}
            />
          </div>
          <div class="form-group">
            <h4>Libre elección</h4>
            <Input
              type="number"
              smallBorder
              onChange={(e) => setLibre(e.target.value)}
            />
          </div>
          <div class="form-group">
            <h4>Total</h4>
            {parseInt(discObli) +
              parseInt(discOpta) +
              parseInt(fund) +
              parseInt(libre)}
          </div>
          <h3>Horarios:</h3>
          {shedule.map((row, idx) => (
            <div class="form-group">
              <Input
                type="text"
                smallBorder
                placeholder="Day"
                name={"session-day-" + idx}
                onChange={onSessionChange}
              />
              <Input
                type="text"
                smallBorder
                placeholder="Start hour"
                name={"session-startHours-" + idx}
                onChange={onSessionChange}
              />
              <Input
                type="text"
                smallBorder
                placeholder="End hour"
                name={"session-endHours-" + idx}
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
        <div class="column">
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
      <div class="actions">
        <Button>Cancelar</Button>
        <Button solid onClick={saveGroup}>
          Crear grupo
        </Button>
      </div>
    </CreateGroupLayout>
  );
};

export default CreateGroup;
