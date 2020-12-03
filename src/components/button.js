import styled, { css } from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) =>
    props.solid ? props.theme.colors.primary : props.theme.colors.gray[2]};
  border: none;
  border-radius: ${(props) => props.theme.universalBorderRadius};
  color: white;
  cursor: pointer;
  font-family: "Ancizar";
  font-size: ${(props) => props.theme.textTheme.fontSize.normal};
  padding: 8px 20px;
  margin-top: ${(props) => props.marginTop};

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryDarks};
  }

  ${(props) =>
    props.withIcon &&
    css`
      align-items: center;
      display: flex;

      i {
        font-size: 20px;
        margin: 0;
        margin-right: 10px;
      }
    `}

  ${(props) =>
    props.alt &&
    css`
      background-color: white;
      border: 1px ${(props) => props.theme.colors.secondary} solid;
      color: ${(props) => props.theme.colors.secondary};

      &:hover {
        background-color: ${(props) => props.theme.colors.secondary};
        border: 1px transparent solid;
        color: white;
      }
    `}
`;

export const ListButton = styled.button`
  background-color: transparent;
  background-color: ${(props) =>
    props.solid ? props.theme.colors.primary : "transparent"};
  border: none;
  border-bottom: solid 1px black;
  margin-bottom: 8px;
  padding: 8px;
  text-align: left;
`

export default StyledButton;
