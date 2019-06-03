import styled from 'styled-components';

const Input = styled.input`
  border: 1px solid ${props => props.theme.black};
  border-radius: 5px;
  padding: 8px 12px;
  font-size: 1.2em;
  color: ${props => props.theme.black};
  display: block;

  ::placeholder {
    color: ${props => props.theme.grey};
  }

  :focus {
    outline: none;
  }
`;

export default Input;
