import styled from 'styled-components';

const StyledSection = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundLightAlt};
  flex-grow: 1;
  min-width: 0;
  padding: 20px 15px 0px 15px;
  overflow-y: scroll;

  margin-top: 10px;
`

export default StyledSection;
