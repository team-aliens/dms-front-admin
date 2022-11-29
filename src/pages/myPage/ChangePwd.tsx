import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { useForm } from '@/hooks/useForm';
import { Reset } from '@/components/auth/reset/Reset';
import { ChangePasswordRequest } from '@/apis/users/request';

export function ChangePwd() {
  const { onHandleChange, state: pwdState } = useForm<ChangePasswordRequest>({
    current_password: '',
    new_password: '',
  });

  return (
    <WithNavigatorBar>
      {/* <Reset onChangeValue={} resetPasswordState={} /> */}
    </WithNavigatorBar>
  );
}
