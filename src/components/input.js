import styled, { css }from 'styled-components';

const Input = styled.input`
  border: 1px solid black;
  border-radius: ${(props) => props.theme.universalBorderRadius};
  height: 30px;
  padding: 4px 12px;
  width: ${(props) => props.width || 'auto'};


  ${(props) => props.smallBorder && css`
    border-radius: ${(props) => props.theme.inputBorderRadius};
  `}

  ${(props) => props.withIcon && css`
    i {
      margin-right: 12px;
    }
  `}
`

export default Input;
