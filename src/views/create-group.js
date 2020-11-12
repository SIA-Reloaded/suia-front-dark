import React, { useState } from "react";
import styled from "styled-components";
import Input from "../components/input";
import Button from "../components/button.js";

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
  const [shedule, setShedule] = useState([{ day: "", hour: "" }]);

  return (
    <CreateGroupLayout>
      <h1>Nuevo grupo</h1>
      <FormContainer>
        <div class="column">
          <h3>Materia:</h3>
          <Input width="200px" placeholder="Buscar por nombre o código" />
          <h3>Cupos:</h3>
          <div class="form-group">
            <h4>Disc. obligatoria</h4>
            <Input type="number" value="0" smallBorder />
          </div>
          <div class="form-group">
            <h4>Disc. optativa</h4>
            <Input type="number" value="0" smallBorder />
          </div>
          <div class="form-group">
            <h4>Fundamentación</h4>
            <Input type="number" value="0" smallBorder />
          </div>
          <div class="form-group">
            <h4>Libre elección</h4>
            <Input type="number" value="0" smallBorder />
          </div>
          <div class="form-group">
            <h4>Total</h4>0
          </div>
          <h3>Horarios:</h3>
          {shedule.map((row) => (
            <div class="form-group">
              <Input
                type="text"
                smallBorder
                placeholder="MON"
                value={row.day}
              />
              <Input
                type="text"
                smallBorder
                placeholder="14:00"
                value={row.hour}
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
        <Button solid>Crear grupo</Button>
      </div>
    </CreateGroupLayout>
  );
};

export default CreateGroup;
