import { NoticeItem } from '@/components/notice/NoticeItem';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NoticeList = () => {
  return (
    <_Wrapper>
      {Array(10)
        .fill(void 0)
        .map((item, index) => (
          <Link to={`/notice/detail/${index + 1}`}>
            <NoticeItem key={index} />
          </Link>
        ))}
    </_Wrapper>
  );
};

const _Wrapper = styled.ul`
  width: 1030px;
  display: flex;
  flex-direction: column;
  gap: 16px 0;
  margin-top: 20px;
`;
