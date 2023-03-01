import styled from 'styled-components';
import { logoPattern } from '../../assets';

export function LogoBox() {
  return (
    <_ImgWrapper>
      <_Pattern img={logoPattern as string} />
    </_ImgWrapper>
  );
}

const _ImgWrapper = styled.div`
  width: 50%;
  height: 100vh;
  max-height: 100vh;
  box-shadow: 0px 2px 40px rgba(52, 52, 52, 0.1);
`;

const _Pattern = styled.div<{
  img: string;
}>`
  width: 100%;
  height: 100vh;
  background-image: ${({ img }) => `url(${img})`};
  background-repeat: no-repeat;
  background-size: cover;
`;
