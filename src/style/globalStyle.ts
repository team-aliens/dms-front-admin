import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.primary};
    border-radius: 10px;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.color.gray1};
    border-radius: 10px;
  }
`;
