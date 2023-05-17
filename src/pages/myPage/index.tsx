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
import { StudentRegistrationExcel } from '@/components/modals/StudentRegistrationExcel';
import { pagePath } from '@/utils/pagePath';
import { SchoolCheckingCodeModal } from '@/components/modals/SchoolCheckingCode';
import { StudentEditRoom } from '@/components/modals/student/StudentEditRoom';
import { StudentEditGrade } from '@/components/modals/student/StudentEditGrade';

export function MyPage() {
  const { modalState, selectModal, closeModal } = useModal();
  const openNewQuestionModal = () => selectModal('NEW_QNA');
  const openLogoutModal = () => selectModal('LOGOUT');
  const openStudentExelModal = () => selectModal('STUDENT_EXEL');
  const openStudentEditRoomExcel = () => selectModal('STUDENT_EDIT_ROOM_EXCEL');
  const openStudentEditGradeExcel = () =>
    selectModal('STUDENT_EDIT_GRADE_EXCEL');

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
          <Text display="block" size="headlineM" margin={['bottom', 60]}>
            {myProfileData?.school_name}
          </Text>
          <_CardWrapper>
            <div>
              <Verification
                onClickNewCode={() => selectModal('SCHOOL_CHECKING_CODE')}
                code={code}
              />
              <_OptionBtn>
                <_PasswordChange to={pagePath.myPage.changePwd}>
                  <Text display="block" size="titleS">
                    비밀번호 변경
                  </Text>
                  <Arrow size={24} direction="right" />
                </_PasswordChange>
                <_Logout
                  margin={['left', 'auto']}
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
          <_StudentExcelWrapper>
            <_StudentIssuance onClick={openStudentExelModal}>
              <Text display="block" size="titleS">
                학생 등록
              </Text>
              <Arrow size={24} direction="right" />
            </_StudentIssuance>
            <_StudentEditWrapper>
              <_StudentEdit onClick={openStudentEditRoomExcel}>
                <Text display="block" size="titleS">
                  호실 정보 변경
                </Text>
              </_StudentEdit>
              <_StudentEdit onClick={openStudentEditGradeExcel}>
                <Text display="block" size="titleS">
                  학년 정보 변경
                </Text>
              </_StudentEdit>
            </_StudentEditWrapper>
          </_StudentExcelWrapper>
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
      {modalState.selectedModal === 'SCHOOL_CHECKING_CODE' && (
        <SchoolCheckingCodeModal
          closeModal={closeModal}
          onClick={getNewCode.mutate}
        />
      )}
      {modalState.selectedModal === 'LOGOUT' && (
        <LogOutModal closeModal={closeModal} />
      )}
      {modalState.selectedModal === 'STUDENT_EXEL' && (
        <StudentRegistrationExcel closeModal={closeModal} />
      )}
      {modalState.selectedModal === 'STUDENT_EDIT_ROOM_EXCEL' && (
        <StudentEditRoom closeModal={closeModal} />
      )}
      {modalState.selectedModal === 'STUDENT_EDIT_GRADE_EXCEL' && (
        <StudentEditGrade closeModal={closeModal} />
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
const _StudentExcelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const _StudentIssuance = styled.div`
  width: 500px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0 24px;
  margin-top: 25px;
  box-shadow: 0 1px 20px rgba(204, 204, 204, 0.24);
  border-radius: 4px;
`;
const _StudentEditWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
`;
const _StudentEdit = styled.div`
  width: 233px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0 24px;
  margin-top: 25px;
  box-shadow: 0 1px 20px rgba(204, 204, 204, 0.24);
  border-radius: 4px;
`;
const _Logout = styled(Text)`
  width: 250px;
  box-shadow: 0 1px 20px rgba(204, 204, 204, 0.24);
  border-radius: 4px;
  padding: 24px 21px;
  cursor: pointer;
`;
