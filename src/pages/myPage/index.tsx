import { Arrow, Text } from '@team-aliens/design-system';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Confirmation } from '@/components/myPage/Confirmation';
import { Verification } from '@/components/myPage/Verification';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { useForm } from '@/hooks/useForm';
import { useModal } from '@/hooks/useModal';
import { ChangeQnA } from '@/components/modals/ChangeQnA';
import { LogOutModal } from '@/components/modals/LogOut';
import { ChangeSchoolQnARequest } from '@/apis/schools/request';
import { useChangeQnA, useReissueSchoolCode } from '@/hooks/useSchoolsApi';
import { useMyProfileInfo } from '@/hooks/useMangersApis';

export function MyPage() {
  const { modalState, selectModal, closeModal } = useModal();
  const openNewQuestionModal = () => selectModal('NEW_QNA');
  const openLogoutModal = () => selectModal('LOGOUT');

  const { onHandleChange: onChange, state: qnaState } =
    useForm<ChangeSchoolQnARequest>({
      question: '',
      answer: '',
    });
  const { answer, question } = qnaState;

  const { data: myProfileData } = useMyProfileInfo();
  const changeQnA = useChangeQnA(qnaState);
  const getNewCode = useReissueSchoolCode();

  const [code, setCode] = useState('');
  useEffect(() => {
    setCode(myProfileData?.code);
  }, [myProfileData]);

  useEffect(() => {
    if (getNewCode.data) setCode(getNewCode.data?.code);
  }, [getNewCode.isSuccess, getNewCode.data]);

  return (
    <>
      <WithNavigatorBar>
        <_Wrapper>
          <_School display="block" size="headlineM">
            {myProfileData?.school_name}
          </_School>
          <_CardWrapper>
            <div>
              <Verification onClickNewCode={getNewCode.mutate} code={code} />
              <_OptionBtn>
                <_PasswordChange to="change-pwd">
                  <Text display="block" size="titleS">
                    비밀번호 변경
                  </Text>
                  <Arrow size={24} direction="right" />
                </_PasswordChange>
                <_Logout
                  onClick={openLogoutModal}
                  display="block"
                  size="titleS"
                  color="error"
                >
                  로그아웃
                </_Logout>
              </_OptionBtn>
            </div>
            <Confirmation
              openNewQuestionModal={openNewQuestionModal}
              question={myProfileData?.question}
              answer={myProfileData?.answer}
            />
          </_CardWrapper>
        </_Wrapper>
      </WithNavigatorBar>
      {modalState.selectedModal === 'NEW_QNA' && (
        <ChangeQnA
          close={closeModal}
          question={question}
          onChange={onChange}
          answer={answer}
          onClick={changeQnA.mutate}
        />
      )}
      {modalState.selectedModal === 'LOGOUT' && (
        <LogOutModal closeModal={closeModal} />
      )}
    </>
  );
}

const _CardWrapper = styled.div`
  display: flex;
  margin-left: auto;
`;

const _OptionBtn = styled.div`
  display: flex;
  margin-top: 30px;
`;

const _Wrapper = styled.div`
  margin: 160px 0 0 80px;
`;

const _School = styled(Text)`
  margin-bottom: 60px;
`;

const _PasswordChange = styled(Link)`
  width: 233px;
  display: flex;
  align-items: center;
  padding-left: 24px;
  box-shadow: 0 1px 20px rgba(204, 204, 204, 0.24);
  border-radius: 4px;
  > div {
    margin-right: 60px;
  }
`;

const _Logout = styled(Text)`
  width: 250px;
  box-shadow: 0 1px 20px rgba(204, 204, 204, 0.24);
  border-radius: 4px;
  padding: 24px 21px;
  cursor: pointer;
  margin-left: auto;
`;
