import React from 'react';
import styled from 'styled-components';

import Input from '../components/input';

const CreateGroupLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 100%;
`

const MainBody = styled.div`
  display: flex;

  div {
    width: 50%;
    display: flex;
    flex-direction: column;
  }
`


const CreateGroup = (props) => {
  return <CreateGroupLayout>
    <h1>Nuevo Grupo</h1>
    <MainBody>
      <div>
        <h1>dfadsf</h1>
        <Input smallBorder/>
      </div>  
      <div>
        <h1>blblb </h1>
      </div>
    </MainBody>
  </CreateGroupLayout>
}



export default CreateGroup;
