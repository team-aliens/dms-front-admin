import { createRoot } from 'react-dom/client';
import { StyledProvider } from 'aliens-design-system-front';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <StyledProvider>
    <App />
  </StyledProvider>
);
