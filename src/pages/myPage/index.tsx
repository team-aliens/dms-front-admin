import {
  Arrow, Button, Title, Modal, Input,
} from 'aliens-design-system-front';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Confirmation } from '@/components/myPage/Confirmation';
import { Verification } from '@/components/myPage/Verification';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import { useForm } from '@/hooks/useForm';

interface NewQuestionType {
  question: string;
  answer: string;
}

export function MyPage() {
  const [newQuestionModalState, setNewQuestionModalState] =
    useState<boolean>(false);
  const [logoutModalState, setLogoutModalState] = useState<boolean>(false);
  const openNewQuestionModal = () => setNewQuestionModalState(true);
  const closeNewQuestionModal = () => setNewQuestionModalState(false);
  const openLogoutModal = () => setLogoutModalState(true);
  const closeLogoutModal = () => setLogoutModalState(false);

  const { onHandleChange, state: newQuestionState } = useForm<NewQuestionType>({
    question: '',
    answer: '',
  });
  const { question, answer } = newQuestionState;

  return (
    <>
      <WithNavigatorBar>
        <_Wrapper>
          <_School display="block" fontSize="l">
            미림여자정보과학고등학교
          </_School>
          <_B>
            <div>
              <Verification />
              <_A>
                <_PasswordChange to="change-pwd">
                  <Title display="block" fontSize="xs">
                    비밀번호 변경
                  </Title>
                  <Arrow size={24} direction="right" />
                </_PasswordChange>
                <_Logout
                  onClick={openLogoutModal}
                  display="block"
                  fontSize="xs"
                  color="error"
                >
                  로그아웃
                </_Logout>
              </_A>
            </div>
            <Confirmation openNewQuestionModal={openNewQuestionModal} />
          </_B>
        </_Wrapper>
      </WithNavigatorBar>
      {newQuestionModalState && (
        <Modal
          close={closeNewQuestionModal}
          buttonList={[<Button type="contained">저장</Button>]}
          header="새 확인 질문과 답변을 입력해주세요."
          inputList={[
            <Input
              name="question"
              value={question}
              onChange={onHandleChange}
              placeholder="질문"
            />,
            <Input
              name="answer"
              value={answer}
              onChange={onHandleChange}
              placeholder="답변"
            />,
          ]}
        />
      )}
      {logoutModalState && (
        <Modal
          close={closeLogoutModal}
          header="로그아웃 재확인"
          content="로그아웃 하시겠습니까?"
          buttonList={[
            <Button onClick={closeLogoutModal} type="outline" color="gray">
              취소
            </Button>,
            <Button type="contained" color="error">
              확인
            </Button>,
          ]}
        />
      )}
    </>
  );
}

const _B = styled.div`
  display: flex;
  height: 280px;
`;

const _A = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const _Wrapper = styled.div`
  margin: 160px 0px 0px 80px;
`;

const _School = styled(Title)`
  margin-bottom: 60px;
`;

const _PasswordChange = styled(Link)`
  width: 233px;
  display: flex;
  align-items: center;
  padding-left: 24px;
  box-shadow: 0px 1px 20px rgba(204, 204, 204, 0.24);
  border-radius: 4px;
  > div {
    margin-right: 60px;
  }
`;

const _Logout = styled(Title)`
  width: 250px;
  box-shadow: 0px 1px 20px rgba(204, 204, 204, 0.24);
  border-radius: 4px;
  padding: 24px 21px;
  cursor: pointer;
`;
