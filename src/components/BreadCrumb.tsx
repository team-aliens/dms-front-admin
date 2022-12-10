import { BreadCrumb } from 'aliens-design-system-front';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface PropsType {
  margin: string;
  pathToKorean: unknown;
}

export function BreadCrumbWrapper({ margin, pathToKorean }: PropsType) {
  const { pathname } = useLocation();
  return (
    <_BreadCrumbWrapper margin={margin}>
      <BreadCrumb pathToKorean={pathToKorean} pathname={pathname} />
    </_BreadCrumbWrapper>
  );
}

const _BreadCrumbWrapper = styled.div<{
  margin: string;
}>`
  margin: ${(props) => props.margin};
`;
