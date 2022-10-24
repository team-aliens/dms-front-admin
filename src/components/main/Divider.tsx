import styled from 'styled-components';

export function Divider() {
  return <_Divider />;
}

const _Divider = styled.hr`
  width: 1px;
  height: 500px;
  background-color: ${({ theme }) => theme.color.gray3};
`;
