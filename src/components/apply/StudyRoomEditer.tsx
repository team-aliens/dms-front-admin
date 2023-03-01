import styled from 'styled-components';

export function StudyRoomEditer() {
  return (
    <_Wrapper>
      <_Editer />
    </_Wrapper>
  );
}

const _Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 684px;
  align-items: center;
`;

const _Editer = styled.div`
  width: 600px;
  height: 600px;
  overflow: scroll;
  display: flex;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.color.primary};
`;
