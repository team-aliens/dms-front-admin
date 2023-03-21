import { getCookie } from '@/utils/cookies';
import { pagePath } from '@/utils/pagePath';
import { useCookies } from 'react-cookie';
import { Outlet, useNavigate } from 'react-router-dom';

const Root = () => {
  const navigate = useNavigate();

  const [, , removeCookie] = useCookies([
    'refresh_token',
    'access_token',
    'service',
  ]);

  setInterval(() => {
    if (
      !getCookie('service') &&
      (getCookie('access_token') || getCookie('refresh_token'))
    ) {
      removeCookie('refresh_token');
      removeCookie('access_token');
      removeCookie('service');
      navigate(pagePath.login);
    }
  }, 600000);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Root;
