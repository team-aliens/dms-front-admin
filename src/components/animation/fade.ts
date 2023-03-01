import { keyframes } from 'styled-components';

export const fadeInRight = keyframes`
0% {
   opacity: 0;
   transform: translate3d(100%, 0, 0);
 }
 to {
   opacity: 1;
   transform: translateZ(0);
 } 
`;
