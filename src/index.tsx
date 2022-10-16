import { createRoot } from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './style/global';
import { StyledProvider } from 'aliens-design-system-front';

const root = createRoot(document.getElementById('root'));

root.render(
  <StyledProvider>
    <App />
  </StyledProvider>
);
