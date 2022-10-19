import { ToastProvider } from 'aliens-design-system-front/dist/context/ToastContext';
import { ToastContainer } from 'aliens-design-system-front';
import { Router } from './router';

function App() {
  return (
    <ToastProvider>
      <ToastContainer />
      <Router />
    </ToastProvider>
  );
}

export default App;
