import styled from 'styled-components';
import { Button, Text } from '@team-aliens/design-system';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import RemainModal from '@/components/apply/remains/remainModal';
import DeleteModal from '@/components/apply/remains/deleteModal';
import { useGetAllRemains, useGetExcelPrint } from '@/hooks/useRemainApi';
import TimeModal from '@/components/apply/remains/timeModal';
import { getAllRemain } from '@/apis/remains';
import { queryClient } from '@/index';
import { useModal } from '@/hooks/useModal';

export default function RemainsLists() {
  const { data: allRemains } = useGetAllRemains();
  const { mutate: downloadExcel } = useGetExcelPrint();
  const { mutate: getAllRemainMutate } = useMutation(getAllRemain);

  const [remainKind, setRemainKind] = useState<'create' | 'edit'>('create');
  const { selectModal, closeModal, modalState } = useModal();
  const [remainModal, setRemainModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const [onMenuModal, setOnMenuModal] = useState<{ id; isCheck: boolean }>({
    id: '',
    isCheck: false,
  });
  const [selectModalId, setSelectModalId] = useState<string>('');
  const [selectTitle, setSelectTitle] = useState<string>('');
  const [selectContent, setSelectContent] = useState<string>('');

  useEffect(() => {
    getAllRemainMutate(null, {
      onSuccess: () => {
        queryClient.invalidateQueries('getAllRemains');
      },
    });
  }, [deleteModal, remainModal, timeModal]);
  const onEdit = (id: string, title: string, content: string) => {
    setSelectModalId(id);
    setRemainKind('edit');
    setSelectTitle(title);
    setSelectContent(content);
    setRemainModal(true);
  };
  const onDelete = (id: string) => {
    setSelectModalId(id);
    setDeleteModal(true);
  };
  const onCreate = () => {
    setRemainKind('create');
    setRemainModal(true);
  };
  const onSetTime = () => {
    setTimeModal(true);
  };

  const onExcelPrint = () => {
    downloadExcel();
  };

  const onCheckMenu = (remain) => {
    setOnMenuModal((prev) => {
      return {
        id: remain.id,
        isCheck: !prev.isCheck || prev.id !== remain.id,
      };
    });
  };
  return (
    <WithNavigatorBar>
      <_Layout>
        <_Header>
          <Button color="gray" kind="outline" onClick={onExcelPrint}>
            액셀 출력
          </Button>
          <_ButtonWrapper>
            <Button onClick={onSetTime}>잔류 신청 시간 설정</Button>
            <Button kind="outline" onClick={onCreate}>
              항목 추가
            </Button>
          </_ButtonWrapper>
        </_Header>
        <_ListLayout>
          {allRemains?.remain_options.map((remain) => (
            <_ListWrapper key={remain.id}>
              <_Title>{remain.title}</_Title>
              <_Text>{remain.description}</_Text>
              <_CheckInput
                id="menu"
                type="checkbox"
                onClick={() => onCheckMenu(remain)}
              />
              {onMenuModal.id === remain.id && onMenuModal.isCheck ? (
                <_MenuWrapper>
                  <Text color="error" onClick={() => onDelete(remain.id)}>
                    항목 삭제
                  </Text>
                  <_Line />
                  <Text
                    color="gray6"
                    onClick={() =>
                      onEdit(remain.id, remain.title, remain.description)
                    }
                  >
                    항목 수정
                  </Text>
                </_MenuWrapper>
              ) : null}
            </_ListWrapper>
          ))}
        </_ListLayout>
      </_Layout>
      <RemainModal
        selectModalId={selectModalId}
        remainModal={remainModal}
        setRemainModal={setRemainModal}
        kind={remainKind}
        initTitle={selectTitle}
        initContent={selectContent}
      />
      <DeleteModal
        selectModalId={selectModalId}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />
      <TimeModal timeModal={timeModal} setTimeModal={setTimeModal} />
    </WithNavigatorBar>
  );
}
const _Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 160px auto 0 auto;
  width: 1030px;
`;
const _Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1030px;
`;
const _ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const _ListLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 17px;
  gap: 20px;
`;
const _ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 16px;
  padding: 28px 0 0 40px;
  width: 1030px;
  min-height: 180px;
  box-shadow: 0 1px 20px rgba(238, 238, 238, 0.8);
  border-radius: 4px;
`;
const _Title = styled.p`
  font-weight: 700;
  font-size: 22px;
`;
const _Line = styled.div`
  width: 129px;
  height: 2px;
  background-color: #eeeeee;
`;
const _Text = styled.p`
  width: 729px;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
`;
const _MenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  gap: 15px;
  top: 56px;
  right: 20px;
  width: 160px;
  height: 112px;
  cursor: pointer;
  box-shadow: 0 1px 20px rgba(238, 238, 238, 0.8);
  border-radius: 6px;
  background-color: white;
`;
const _CheckInput = styled.input`
  appearance: none;
  &:after {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 999;
    content: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_10930_18573)'%3E%3Cpath d='M10.5371 19.4277C10.5371 20.2527 11.2121 20.9277 12.0371 20.9277C12.8621 20.9277 13.5371 20.2527 13.5371 19.4277C13.5371 18.6027 12.8621 17.9277 12.0371 17.9277C11.2121 17.9277 10.5371 18.6027 10.5371 19.4277ZM10.5371 4.42773C10.5371 5.25273 11.2121 5.92773 12.0371 5.92773C12.8621 5.92773 13.5371 5.25273 13.5371 4.42773C13.5371 3.60273 12.8621 2.92773 12.0371 2.92773C11.2121 2.92773 10.5371 3.60273 10.5371 4.42773ZM10.5371 11.9277C10.5371 12.7527 11.2121 13.4277 12.0371 13.4277C12.8621 13.4277 13.5371 12.7527 13.5371 11.9277C13.5371 11.1027 12.8621 10.4277 12.0371 10.4277C11.2121 10.4277 10.5371 11.1027 10.5371 11.9277Z' fill='%23999999'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_10930_18573'%3E%3Crect width='24' height='24' fill='white' transform='translate(0 24) rotate(-90)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
  }
`;
