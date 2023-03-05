import {
  Add,
  Arrow,
  Button,
  DropDown,
  Input,
  Modal,
  Search,
} from '@team-aliens/design-system';
import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { useAddPointOption, useGivePointOption } from '@/apis/points';
import {
  AllPointsOptionResponse,
  SearchPointOptionsRequest,
} from '@/apis/points/response';
import { useDropDown } from '@/hooks/useDropDown';
import { useForm } from '@/hooks/useForm';
import { PointItem } from '../main/DetailBox/PointItem';
import { useModal } from '@/hooks/useModal';

interface PropsType {
  selectedStudentId: string[];
  setSelectedStudentId?: Dispatch<SetStateAction<string[]>>;
  close: () => void;
  allPointOptions: AllPointsOptionResponse;
  refetchAllPointOptions?: () => void;
  refetchSearchStudents?: () => void;
}

const canClick = true;
export function GivePointOptionsModal({
  close,
  selectedStudentId,
  setSelectedStudentId,
  allPointOptions,
  refetchAllPointOptions,
  refetchSearchStudents,
}: PropsType) {
  const [newItem, setNewItem] = useState(true);
  const { onDropDownChange, sort } = useDropDown<string>('');
  const [addPointOption, setAddPointOption] = useState({
    score: 0,
    name: '',
  });

  const { score: scoreOption, name: nameOption } = addPointOption;
  const { closeModal } = useModal();

  const onAddPointOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name: option } = e.target;
    setAddPointOption({
      ...addPointOption,
      [option]: value,
    });
  };

  const [selectedPointOption, setSelectedPointOption] = useState<string>('');

  const newItemInput = () => {
    setNewItem(!newItem);
  };

  const onClickPointOption = (id: string) => {
    setSelectedPointOption((OptionId) => (OptionId === id ? '' : id));
  };

  const { state: pointOptionState, onHandleChange } =
    useForm<SearchPointOptionsRequest>({
      point_option_name: '',
    });

  const givePointOptionAPI = useGivePointOption(
    selectedPointOption,
    selectedStudentId,
    {
      onSuccess: () => {
        closeModal();
        setSelectedStudentId(['']);
      },
    },
  );
  const addPointOptionAPI = useAddPointOption(scoreOption, nameOption, sort, {
    onSuccess: () => refetchAllPointOptions(),
  });

  return (
    <Modal
      className="grantPoint"
      title="상/벌점 항목을 선택해주세요."
      content=""
      close={close}
      buttonList={[
        <Button
          className="grantPoint"
          margin={newItem ? [-40, 0, 0, 0] : [0, 0, 0, 0]}
          disabled={
            newItem
              ? !(selectedPointOption && selectedStudentId)
              : !(scoreOption && nameOption && sort)
          }
          onClick={
            newItem ? givePointOptionAPI.mutate : addPointOptionAPI.mutate
          }
        >
          {newItem ? '부여' : '추가'}
        </Button>,
      ]}
    >
      <_SearchWrapper className="grantPoint">
        <Search className="grantPoint" />
        <_SearchInput
          className="grantPoint"
          type="text"
          placeholder="ex) 봉사활동"
          name="point_option_name"
          value={pointOptionState.point_option_name}
          onChange={onHandleChange}
        />
      </_SearchWrapper>
      <_PointOptionList className="grantPoint">
        {allPointOptions?.point_options
          .filter((options) =>
            options.name.includes(pointOptionState.point_option_name),
          )
          .map((options) => {
            const { point_option_id, name, type, score } = options;
            return (
              <PointItem
                point_history_id={point_option_id}
                name={name}
                type={type}
                score={score}
                canClick={canClick}
                onClick={onClickPointOption}
                OptionSelected={selectedPointOption}
              />
            );
          })}
      </_PointOptionList>
      <_AddImgWrapper
        className="grantPoint"
        onClick={newItemInput}
        newItem={newItem}
      >
        {newItem ? (
          <Add className="addImg" />
        ) : (
          <Arrow direction="top" className="addImg" />
        )}
        {newItem ? (
          <_Text className="grantPoint">항목 추가</_Text>
        ) : (
          <_Text className="grantPoint">항목 닫기</_Text>
        )}
      </_AddImgWrapper>
      <_AddInputBigWrapper className="grantPoint">
        {newItem ? (
          ''
        ) : (
          <Input
            className="grantPoint"
            width={478}
            label="이름"
            type="text"
            placeholder="ex) 무단 외출"
            name="name"
            value={nameOption}
            onChange={onAddPointOption}
          />
        )}
        <_AddInputSmallWrapper className="grantPoint">
          {newItem ? (
            ''
          ) : (
            <Input
              className="grantPoint"
              width={243}
              label="점수"
              type="number"
              placeholder="ex) 12 (숫자만 입력)"
              name="score"
              value={scoreOption}
              onChange={onAddPointOption}
            />
          )}
          {newItem ? (
            ''
          ) : (
            <DropDown
              className="grantPoint"
              width={216}
              label="타입"
              placeholder="상/벌점"
              items={['상점', '벌점']}
              value={sort}
              onChange={onDropDownChange}
            />
          )}
        </_AddInputSmallWrapper>
      </_AddInputBigWrapper>
    </Modal>
  );
}

const _SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  .Search {
    position: absolute;
    top: 8px;
  }
`;

const _SearchInput = styled.input`
  width: 202px;
  height: 40px;
  border-bottom: 1px solid #dddddd;
  margin: 0px 0px 0px 30px;
  font-size: 16px;
`;

const _AddImgWrapper = styled.div<{ newItem: boolean }>`
  display: flex;
  align-items: center;
  padding-top: 35px;
  cursor: pointer;
  padding-bottom: ${({ newItem }) => (newItem ? '-20px' : '20px')};
  .addImg {
    width: 17px;
    margin-right: 10px;
  }
`;

const _Text = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #555555;
`;

const _PointOptionList = styled.div`
  overflow: scroll;
  height: 22vh;
  > div {
    margin-bottom: 9px;
  }
`;

const _AddInputBigWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const _AddInputSmallWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;
