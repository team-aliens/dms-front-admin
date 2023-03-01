import { Button, Modal } from '@team-aliens/design-system';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

interface PropsType {
  closeModal: () => void;
}

export function LogOutModal({ closeModal }: PropsType) {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies([
    'refresh_token',
    'access_token',
  ]);

  const logout = () => {
    removeCookie('refresh_token');
    removeCookie('access_token');
    navigate('/login');
  };

  return (
    <Modal
      close={closeModal}
      title="로그아웃 재확인"
      content="로그아웃 하시겠습니까?"
      buttonList={[
        <Button onClick={closeModal} kind="outline" color="gray">
          취소
        </Button>,
        <Button onClick={logout} kind="contained" color="error">
          확인
        </Button>,
      ]}
    />
  );
}
