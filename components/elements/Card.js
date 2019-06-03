import styled from 'styled-components';

const Card = styled.div`
  width: fit-content;
  padding: 40px;
  background-color: ${props => props.theme.white};
  box-shadow: ${props => props.theme.boxShadow};

  .card-title {
    font-size: 2em;
    font-weight: 400;
    margin: 0;
  }
`;

export default Card;
