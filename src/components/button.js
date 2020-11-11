import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props) => props.solid ? props.theme.colors.primary : props.theme.colors.gray[2]};
  border: none;
  border-radius: ${(props) => props.theme.universalBorderRadius};
  color: white;
  cursor: pointer;
  font-family: 'Ancizar';
  font-size: ${(props) => props.theme.textTheme.fontSize.normal};
  padding: 8px 20px;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryDarks};
  }

  ${(props) => props.withIcon && css`
    align-items: center;
    display: flex;

    i {
      font-size: 20px;
      margin-right: 10px;
    }
  `}

  ${(props) => props.alt && css`
    background-color: 'white';
    border: 1x ${(props) => props.theme.colors.secondary} solid;
    color: ${(props) => props.theme.colors.secondary};

    &:hover {
      background-color: ${(props) => props.theme.colors.secondary};
      border: 1px transparent solid;
      color: white;
    }
  `}
`

export default StyledButton;
