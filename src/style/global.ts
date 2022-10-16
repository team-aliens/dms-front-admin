import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

html{
    height: 100%;
}
* {
margin: 0;
padding: 0;
border: 0;
outline: unset;
list-style: none;
 text-decoration: none;
font-weight:400
}

    *[hidden] {
        display: none;
    }
    button,label {
        cursor: pointer;
        background-color: transparent;
    }    
    
    a{
      text-decoration: none;
      color: inherit;
    }
`;
