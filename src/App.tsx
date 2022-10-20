import { ToastContainer, ToastProvider } from 'aliens-design-system-front';
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
