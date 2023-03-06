import styled from 'styled-components';
import { Button, Text } from '@team-aliens/design-system';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { WithNavigatorBar } from '@/components/WithNavigatorBar';
import RemainModal from '@/components/apply/remains/remainModal';
import DeleteModal from '@/components/apply/remains/deleteModal';
import { useGetAllRemains } from '@/hooks/useRemainApi';
import TimeModal from '@/components/apply/remains/timeModal';
import { getAllRemain, useGetRemainListExcel } from '@/apis/remains';
import { queryClient } from '@/index';
import { useModal } from '@/hooks/useModal';
import { useForm } from '@/hooks/useForm';
import { RemainOption } from '@/components/apply/remains/options';

export default function RemainsLists() {
  const { data: allRemains } = useGetAllRemains();
  const { mutate: downloadExcel } = useGetRemainListExcel();
  const { mutate: getAllRemainMutate } = useMutation(getAllRemain);

  const [remainKind, setRemainKind] = useState<'create' | 'edit'>('create');
  const { selectModal, modalState } = useModal();
  const [onMenuModal, setOnMenuModal] = useState<{
    id: string;
    isCheck: boolean;
  }>({
    id: '',
    isCheck: false,
  });
  const [selectModalId, setSelectModalId] = useState<string>('');
  const { setState: setSelectState, state: selectState } = useForm({
    title: '',
    content: '',
  });

  useEffect(() => {
    getAllRemainMutate(null, {
      onSuccess: () => {
        queryClient.invalidateQueries('getAllRemains');
      },
    });
  }, [modalState]);
  const onEdit = (id: string, title: string, content: string) => {
    setSelectModalId(id);
    setRemainKind('edit');
    setSelectState({
      title: title,
      content: content,
    });
    selectModal('EDIT_REMAIN_ITEM');
  };
  const onDelete = (id: string) => {
    setSelectModalId(id);
    selectModal('DELETE_REMAIN_ITEM');
  };
  const onCreate = () => {
    setRemainKind('create');
    selectModal('CREATE_REMAIN_ITEM');
  };
  const onSetTime = () => {
    selectModal('SET_REMAIN_TIME');
  };

  return (
    <WithNavigatorBar>
      <_Layout>
        <_Header>
          <Button color="gray" kind="outline" onClick={downloadExcel}>
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
            <RemainOption {...remain} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </_ListLayout>
      </_Layout>
      {modalState.selectedModal === 'SET_REMAIN_TIME' ? <TimeModal /> : null}
      {modalState.selectedModal === 'CREATE_REMAIN_ITEM' ||
      modalState.selectedModal === 'EDIT_REMAIN_ITEM' ? (
        <RemainModal
          selectModalId={selectModalId}
          kind={remainKind}
          initTitle={selectState.title}
          initContent={selectState.content}
        />
      ) : null}
      {modalState.selectedModal === 'DELETE_REMAIN_ITEM' ? (
        <DeleteModal selectModalId={selectModalId} />
      ) : null}
    </WithNavigatorBar>
  );
}
const _Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 160px auto 150px auto;
  width: 1030px;
  padding-bottom: 80px;
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
