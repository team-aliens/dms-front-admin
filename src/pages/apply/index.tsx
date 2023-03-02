import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';

export default function Index() {
  return (
    <WithNavigatorBar>
      <Layout>
        <Link to="study">
          <_Wrapper>
            <Title>자습실</Title>
            <Text>자습실 관리와 생성 또는 수정,삭제할 수 있습니다.</Text>
          </_Wrapper>
        </Link>
        <Link to="remains">
          <_Wrapper>
            <Title>잔류</Title>
            <Text>자습실 관리와 생성 또는 수정,삭제할 수 있습니다.</Text>
          </_Wrapper>
        </Link>
      </Layout>
    </WithNavigatorBar>
  );
}
const Layout = styled.div`
  display: flex;
  margin: 260px 0 0 80px;
  gap: 30px;
`;
const _Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 17px;
  padding-left: 40px;
  width: 500px;
  height: 200px;
  background: #ffffff;
  box-shadow: 0px 1px 20px rgba(238, 238, 238, 0.8);
  border-radius: 4px;
`;
const Title = styled.p`
  font-weight: 700;
  font-size: 22px;
`;
const Text = styled.p`
  width: 223px;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
`;
