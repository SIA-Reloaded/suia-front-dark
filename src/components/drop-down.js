import styled  from "styled-components";

const Dropdown = styled.select`
  border: 1px solid black;
  border-radius: ${(props) => props.theme.universalBorderRadius};
  height: ${(props) => props.height || "30px"};
  padding: 4px 12px ;
  width:${(props) => props.width || "auto"};
  margin-left: ${(props) => props.marginLeft};
`;

export default Dropdown;