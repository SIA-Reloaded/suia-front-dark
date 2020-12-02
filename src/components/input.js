import styled, { css } from "styled-components";

const Input = styled.input`
  border: 1px solid black;
  border-radius: ${(props) => props.theme.universalBorderRadius};
  height: ${(props) => props.height || "30px"};
  padding: 4px 12px;
  width: ${(props) => props.width || "auto"};

  ${(props) =>
    props.smallBorder &&
    css`
      border-radius: ${(props) => props.theme.inputBorderRadius};
    `}

  ${(props) =>
    props.withIcon &&
    css`
      i {
        margin-right: 12px;
      }
    `}

`;

export const SearchInput = styled.input`
  background-color: ${(props) => props.theme.colors.gray[5]};
  border: none;
  border-radius: ${(props) => props.theme.universalBorderRadius};
  color: ${(props) => props.theme.colors.gray[1]};
  height: 40px;
  margin-right: 15px;
  padding: 4px 18px;
  width: ${(props) => props.width || "auto"};

  ${(props) =>
    props.smallBorder &&
    css`
      border-radius: ${(props) => props.theme.inputBorderRadius};
    `}

  ${(props) =>
    props.withIcon &&
    css`
      i {
        margin-right: 12px;
      }
    `}
`;

export default Input;
