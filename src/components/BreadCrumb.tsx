import { BreadCrumb } from '@team-aliens/design-system';
import styled from 'styled-components';

interface PropsType {
  margin: string;
  pathToKorean: {
    [key: string]: string;
  };
}

export function BreadCrumbWrapper({ margin, pathToKorean }: PropsType) {
  return (
    <_BreadCrumbWrapper margin={margin}>
      <BreadCrumb pathToKorean={pathToKorean} />
    </_BreadCrumbWrapper>
  );
}

const _BreadCrumbWrapper = styled.div<{
  margin: string;
}>`
  margin: ${(props) => props.margin};
`;
