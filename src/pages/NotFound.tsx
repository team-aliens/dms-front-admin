import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const router = useNavigate();
  return <div>Not Found</div>;
};
