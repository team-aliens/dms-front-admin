import styled from 'styled-components';
import { Button, SearchBox, Sort } from '@team-aliens/design-system';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SortEnum } from '@/apis/managers';
import { StudentBox } from '@/components/main/StudentBox';
import { StudentInfo } from '@/apis/managers/response';
import { useModal } from '@/hooks/useModal';
import { PointFilterModal } from '@/components/modals/PointFilter';
import { DeletePointListModal } from '../modals/DeletePointList';
import { DeleteTagIdAtom, PointHistroyIdAtom } from '@/utils/atoms';
import {
  useCancelPointHistory,
  usePointOptionList,
} from '@/hooks/usePointsApi';
import { FilterState, ModeType } from '@/pages/Home';
import { PointEnum, PointType, useDeletePointOption } from '@/apis/points';
import { DeleteStudentModal } from '../modals/DeleteStudent';
import { useDeleteStudent } from '@/hooks/useMangersApis';
import { GivePointOptionsModal } from '../modals/GivePointOptionsModal';
import { ViewPointOptionsModal } from '../modals/ViewPointOptionsModal';
import { DeletePointOptionModal } from '../modals/DeletePointOption';
import { useToast } from '@/hooks/useToast';
import { TagDropDown } from './TagDropDown';
import { TagType } from '@/apis/tags/response';
import { DeleteStudentTagModal } from '../modals/DeleteStudentTag';
import { useDeleteStudentTag } from '@/hooks/useTagApi';
import { GiveAllTagModal } from '../modals/GiveAllTagModal';
import { useTagList } from '@/hooks/useTagsApi';
import { DeleteTagModal } from '../modals/DeleteTag';
import { ViewAllTagModal } from '../modals/ViewAllTagModal';
import { useDeleteTag } from '@/apis/tags';
import OutsideClickHandler from 'react-outside-click-handler';

interface Props extends FilterState {
  mode: ModeType;
  selectedStudentId: string[];
  setSelectedStudentId: Dispatch<SetStateAction<string[]>>;
  studentList: StudentInfo[];
  startPoint: number;
  endPoint: number;
  checkedTagList: TagType[];
  setCheckedTagList: Dispatch<SetStateAction<TagType[]>>;
  onChangeSearchName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeSortType: () => void;
  onClickStudent: (id: string, modeType?: ModeType) => void;
  onChangeFilterType: (type: PointType) => void;
  onChangeLimitPoint: (startPoint: number, endPoint: number) => void;
  refetchSearchStudents?: () => void;
  refetchStudentDetail?: () => void;
  refetchStudentPointHistory: () => void;
}

export function StudentList({
  mode,
  selectedStudentId,
  setSelectedStudentId,
  studentList,
  name,
  sort,
  filterType,
  startPoint,
  endPoint,
  checkedTagList,
  setCheckedTagList,
  onChangeSearchName,
  onChangeSortType,
  onClickStudent,
  onChangeFilterType,
  onChangeLimitPoint,
  refetchSearchStudents,
  refetchStudentDetail,
  refetchStudentPointHistory,
}: Props) {
  const { modalState, selectModal, closeModal } = useModal();
  const [tagModal, setTagModal] = useState<string>('');
  const [showGiveModal, setShowGiveModal] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const openPointFilterModal = () => selectModal('POINT_FILTER');
  const [pointHistoryId] = useRecoilState(PointHistroyIdAtom);

  const cancelPoint = useCancelPointHistory(pointHistoryId, {
    onSuccess: () => {
      refetchStudentPointHistory();
      refetchStudentDetail();
    },
  });
  const deleteStudent = useDeleteStudent(selectedStudentId[0], {
    onSuccess: () => {
      refetchSearchStudents();
      setSelectedStudentId(['']);
      closeModal();
    },
  });

  const [selectedPointOption, setSelectedPointOption] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  const { data: allPointOptions, refetch: refetchAllPointOptions } =
    usePointOptionList();

  const { data: allTags, refetch: refetchAllTags } = useTagList();

  const { toastDispatch } = useToast();

  const deletePointOptionAPI = useDeletePointOption(selectedPointOption, {
    onSuccess: () => {
      selectModal('POINT_OPTIONS');
      refetchAllPointOptions();
      setSelectedPointOption('');
      toastDispatch({
        toastType: 'SUCCESS',
        actionType: 'APPEND_TOAST',
        message: '상/벌점 항목이 삭제되었습니다.',
      });
    },
    onError: () => {
      toastDispatch({
        toastType: 'ERROR',
        actionType: 'APPEND_TOAST',
        message: '상/벌점 항목 삭제를 실패했습니다.',
      });
    },
  });

  const deleteTagAPI = useDeleteTag(selectedTag, {
    onSuccess: () => {
      refetchAllTags();
      setSelectedTag('');
      toastDispatch({
        toastType: 'SUCCESS',
        actionType: 'APPEND_TOAST',
        message: '태그가 삭제되었습니다.',
      });
      selectModal('');
    },
    onError: () => {
      toastDispatch({
        toastType: 'ERROR',
        actionType: 'APPEND_TOAST',
        message: '태그 삭제를 실패했습니다.',
      });
    },
  });

  const filterText = () => {
    if (startPoint === -100 && endPoint === 100 && filterType === 'ALL') {
      return '상/벌점';
    }
    return `${PointEnum[filterType]} / ${startPoint}~${endPoint}점`;
  };

  const filterColor = () => {
    if (startPoint === -100 && endPoint === 100 && filterType === 'ALL') {
      return 'gray';
    }
    return 'primary';
  };

  const pointListText = () => {
    if (selectedStudentId.filter((i) => i).length > 0) {
      return '부여';
    }
    return '항목 보기';
  };

  const setShowGiveModalFunc = () => {
    setShowGiveModal(!showGiveModal);
    setShowViewModal(false);
  };

  const setShowViewModalFunc = () => {
    setShowViewModal(!showViewModal);
    setShowGiveModal(false);
  };

  const tagId = useRecoilValue(DeleteTagIdAtom);

  const deleteStudentTag = useDeleteStudentTag(
    selectedStudentId[0],
    tagId,
    refetchSearchStudents,
    refetchStudentDetail,
  );

  return (
    <_Wrapper detailIsOpened={!!selectedStudentId[0]}>
      <_Filter className="filter">
        <SearchBox
          className="searchBox"
          value={name}
          onChange={onChangeSearchName}
        />
        <_Buttons>
          {mode === 'POINTS' && (
            <_ChooseModalBoxWrapper>
              <Button
                className="grantPoint"
                onClick={() =>
                  selectedStudentId.filter((i) => i).length > 0
                    ? setShowGiveModalFunc()
                    : setShowViewModalFunc()
                }
              >
                {pointListText()}
              </Button>
              {selectedStudentId.filter((i) => i).length > 0 &&
                showGiveModal && (
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      setShowGiveModal(false);
                    }}
                  >
                    <_ChooseBox>
                      <_ChooseBoxText
                        onClick={() => {
                          selectModal('GIVE_POINT');
                          setShowGiveModal(false);
                        }}
                      >
                        상/벌점 부여
                      </_ChooseBoxText>
                      <_Line />
                      <_ChooseBoxText
                        onClick={() => {
                          selectModal('GIVE_TAG_OPTIONS');
                          setShowGiveModal(false);
                        }}
                      >
                        학생 태그 부여
                      </_ChooseBoxText>
                    </_ChooseBox>
                  </OutsideClickHandler>
                )}
              {!(selectedStudentId.filter((i) => i).length > 0) &&
                showViewModal && (
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      setShowViewModal(false);
                    }}
                  >
                    <_ChooseBox>
                      <_ChooseBoxText
                        onClick={() => {
                          selectModal('POINT_OPTIONS');
                          setShowViewModal(false);
                        }}
                      >
                        상/벌점 항목 보기
                      </_ChooseBoxText>
                      <_Line />
                      <_ChooseBoxText
                        onClick={() => {
                          selectModal('VIEW_TAG_OPTIONS');
                          setShowViewModal(false);
                        }}
                      >
                        학생 태그 항목 보기
                      </_ChooseBoxText>
                    </_ChooseBox>
                  </OutsideClickHandler>
                )}
            </_ChooseModalBoxWrapper>
          )}
          <Button
            kind="outline"
            color="gray"
            onClick={onChangeSortType}
            Icon={<Sort />}
            className="filterButton"
          >
            {SortEnum[sort]}순
          </Button>
        </_Buttons>
      </_Filter>
      <_Buttons>
        <Button
          color={filterColor()}
          kind="outline"
          onClick={openPointFilterModal}
        >
          {filterText()}
        </Button>
        <TagDropDown
          refetchSearchStudents={refetchSearchStudents}
          checkedTagList={checkedTagList}
          setCheckedTagList={setCheckedTagList}
        />
      </_Buttons>
      <_StudentList>
        {studentList.map((item) => (
          <StudentBox
            key={item.id}
            mode={mode}
            studentInfo={item}
            onClickStudent={onClickStudent}
            isSelected={selectedStudentId.includes(item.id)}
            selectedStudentId={selectedStudentId}
          />
        ))}
      </_StudentList>
      {modalState.selectedModal === 'POINT_FILTER' && (
        <PointFilterModal
          filterType={filterType}
          minPoint={startPoint}
          maxPoint={endPoint}
          onChangeLimitPoint={onChangeLimitPoint}
          onChangeFilterType={onChangeFilterType}
          close={closeModal}
        />
      )}
      {modalState.selectedModal === 'DELETE_POINT_LIST' && (
        <DeletePointListModal
          onClick={cancelPoint.mutate}
          closeModal={closeModal}
        />
      )}
      {modalState.selectedModal === 'DELETE_STUDENT' && (
        <DeleteStudentModal onClick={deleteStudent.mutate} close={closeModal} />
      )}
      {modalState.selectedModal === 'POINT_OPTIONS' && (
        <ViewPointOptionsModal
          selectedPointOption={selectedPointOption}
          setSelectedPointOption={setSelectedPointOption}
          close={closeModal}
          allPointOptions={allPointOptions}
          refetchAllPointOptions={refetchAllPointOptions}
        />
      )}
      {modalState.selectedModal === 'GIVE_POINT' && (
        <GivePointOptionsModal
          selectedStudentId={selectedStudentId}
          close={closeModal}
          allPointOptions={allPointOptions}
          refetchAllPointOptions={refetchAllPointOptions}
        />
      )}
      {modalState.selectedModal === 'DELETE_POINT_OPTION' && (
        <DeletePointOptionModal
          setSelectedOption={setSelectedPointOption}
          onClick={deletePointOptionAPI.mutate}
          closeModal={closeModal}
        />
      )}
      {modalState.selectedModal === 'DELETE_STUDENT_TAG' && (
        <DeleteStudentTagModal
          onClick={() => {
            deleteStudentTag.mutate();
            closeModal();
          }}
          close={closeModal}
      {modalState.selectedModal === 'GIVE_TAG_OPTIONS' && (
        <GiveAllTagModal
          close={closeModal}
          selectedStudentId={selectedStudentId}
          refetchAllTags={refetchAllTags}
          allTags={allTags}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          setTagModal={setTagModal}
        />
      )}
      {modalState.selectedModal === 'VIEW_TAG_OPTIONS' && (
        <ViewAllTagModal
          close={closeModal}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          allTags={allTags}
          refetchAllTags={refetchAllTags}
          setTagModal={setTagModal}
        />
      )}
      {modalState.selectedModal === 'DELETE_TAG' && (
        <DeleteTagModal
          setSelectedOption={setSelectedTag}
          onClick={deleteTagAPI.mutate}
          closeModal={closeModal}
          tagModal={tagModal}
        />
      )}
    </_Wrapper>
  );
}

const _Wrapper = styled.div<{ detailIsOpened: boolean }>`
  width: ${({ detailIsOpened }) => (detailIsOpened ? 500 : 670)}px;
  transition: width 0.7s ease-in-out;
  margin-left: 50px;
  margin-bottom: 150px;
`;

const _Filter = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > button {
    > svg > path {
      fill: ${({ theme }) => theme.color.gray6};
    }
  }
`;
const _StudentList = styled.ul`
  padding: 20px 0 20px 0;
  display: flex;
  flex-direction: column;
  gap: 16px 0;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const _Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
`;

const _ChooseModalBoxWrapper = styled.div`
  position: relative;
`;

const _ChooseBox = styled.div`
  z-index: 99;
  margin-left: -48px;
  margin-top: 8px;
  position: absolute;
  width: 132px;
  height: 92px;
  background: #ffffff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.color.gray3};
`;

const _ChooseBoxText = styled.div`
  font-weight: 400;
  font-size: 12px;
  height: 46px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const _Line = styled.div`
  width: 110px;
  height: 1px;
  border: 1px solid ${({ theme }) => theme.color.gray3};
`;
