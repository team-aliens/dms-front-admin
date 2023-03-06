import { Arrow, Text } from '@team-aliens/design-system';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const NotFoundPage = () => {
  const router = useNavigate();
  return (
    <_Wrapper>
      <Text color="gray6" size="headlineL">
        Page Not Found
      </Text>
      <Link to="/">
        <_HStack>
          <Text color="error" size="titleM">
            go home
          </Text>
          <Arrow colorKey="error" direction="right" />
        </_HStack>
      </Link>
    </_Wrapper>
  );
};

const _Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const _HStack = styled.div`
  display: flex;
  align-items: center;
`;
