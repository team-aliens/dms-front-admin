import styled from 'styled-components';

export function StudentInfo() {
  return (
    <_StudnetInfo>
      <img />
      <_Wrapper>
        <_PersonalInfo>
          <p className="name">가나다</p>
          <p className="gcn">1101</p>
        </_PersonalInfo>
        <p className="roomNumber">401호</p>
      </_Wrapper>
    </_StudnetInfo>
  );
}

const _StudnetInfo = styled.div`
  display: flex;
  > img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-right: 24px;
    background-color: gray;
  }
`;
const _Wrapper = styled.div`
  margin-top: 18px;
  > .roomNumber {
    margin-top: 20px;
    font-size: ${({ theme }) => theme.textFont.l.size}px;
    font-weight: ${({ theme }) => theme.textFont.l.weight};
    color: ${({ theme }) => theme.color.gray6};
  }
`;
const _PersonalInfo = styled.div`
  display: flex;
  > p {
    font-size: ${({ theme }) => theme.titleFont.m.size}px;
    font-weight: ${({ theme }) => theme.titleFont.m.weight};
  }
  > .name {
    color: ${({ theme }) => theme.color.gray9};
  }
  > .gcn {
    color: ${({ theme }) => theme.color.gray6};
    margin-left: 20px;
  }
`;
