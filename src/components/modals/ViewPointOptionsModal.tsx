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
import {
  useAddPointOption,
  useEditPointOption,
} from '@/apis/points';
import { PointOptionRequest, PointOptionUnderBarRequest, SearchPointOptionsRequest } from '@/apis/points/request';
import { useDropDown } from '@/hooks/useDropDown';
import { useForm } from '@/hooks/useForm';
import { usePointOptionList } from '@/hooks/usePointsApi';
import { PointItem } from '../main/DetailBox/PointItem';

interface PropsType {
  selectedPointOption?: string;
  setSelectedPointOption?: Dispatch<SetStateAction<string>>;
  close: () => void;
}


export function ViewPointOptionsModal({
  close,
  selectedPointOption,
  setSelectedPointOption,
}: PropsType) {
  
  const MustTrue = true;

  const [newItem, setNewItem] = useState(true);

  const { onDropDownChange: AddChange, sort: AddState } =
    useDropDown<string>('');
  const { onDropDownChange: EditChange, sort: EditState } =
    useDropDown<string>('');

  const { state: addPointOption, onHandleChange: addPointOptionHandler } =
    useForm<PointOptionRequest>({
      score: 0,
      name: '',
    });
  const { state: editPointOption, setState: setEditPointOption, onHandleChange: EditPointOptionHandler } =
    useForm<PointOptionUnderBarRequest>({
      score_: 0,
      name_: '',
    });

  const { score: addPointScore, name: addPointName } = addPointOption;
  const { score_, name_ } = editPointOption;


  const { data: allPointOptions } = usePointOptionList();

  const newItemInput = () => {
    setNewItem(!newItem);
  };

  const onClickPointOption = (
    option_id: string,
    option_name: string,
    option_score: number,
    option_type: string,
  ) => {
    setEditPointOption({
      score_: option_score,
      name_: option_name,
    });
    EditChange(option_type);
    setSelectedPointOption((OptionId) =>
      OptionId === option_id ? '' : option_id,
    );
  };

  const { state: pointOptionState, onHandleChange } =
    useForm<SearchPointOptionsRequest>({
      point_option_name: '',
    });

  const addPointOptionAPI = useAddPointOption(
    addPointScore,
    addPointName,
    AddState,
  );
  const editPointOptionAPI = useEditPointOption(
    selectedPointOption,
    score_,
    name_,
    EditState,
  );

  return (
    <Modal
      className="grantPoint"
      title="상/벌점 항목"
      content=""
      close={close}
      buttonList={[
        selectedPointOption ? (
          <Button
            disabled={
              selectedPointOption
                ? !(
                    editPointOption.score_ &&
                    editPointOption.name_ &&
                    EditState
                  )
                : !(addPointScore && addPointName && AddState)
            }
            onClick={
              selectedPointOption
                ? editPointOptionAPI.mutate
                : addPointOptionAPI.mutate
            }
          >
            수정
          </Button>
        ) : (
          !newItem && (
            <Button
              disabled={!(addPointScore && addPointName && AddState)}
              onClick={addPointOptionAPI.mutate}
            >
              추가
            </Button>
          )
        ),
      ]}
    >
      <_SearchWrapper>
        <Search className="Search" />
        <_SearchInput
          type="text"
          placeholder="ex) 봉사활동"
          name="point_option_name"
          value={pointOptionState.point_option_name}
          onChange={onHandleChange}
        />
      </_SearchWrapper>
      <_PointOptionList>
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
                canDelete={MustTrue}
                canClick={MustTrue}
                isDeleteListOption={MustTrue}
                onClick={onClickPointOption}
                OptionSelected={selectedPointOption}
              />
            );
          })}
      </_PointOptionList>
      {selectedPointOption ? (
        <>
          <_AddImgWrapper
            newItem={newItem}
          >
            <_Text>항목 수정</_Text>
          </_AddImgWrapper>
          <_AddInputBigWrapper>
            <Input
              margin={newItem ? [50, 0, 0, 0] : [0, 0, 0, 0]}
              width={478}
              label="이름"
              type="text"
              placeholder="ex) 무단 외출"
              name="name_"
              value={name_}
              onChange={EditPointOptionHandler}
            />
            <_AddInputSmallWrapper>
              <Input
                width={243}
                label="점수"
                type="number"
                placeholder="ex) 12 (숫자만 입력)"
                name="score_"
                value={score_}
                onChange={EditPointOptionHandler}
              />
              <DropDown
                width={216}
                disable={MustTrue}
                label="타입"
                placeholder="상/벌점"
                items={['상점', '벌점']}
                value={EditState === 'BONUS' ? '상점' : '벌점'}
                onChange={EditChange}
              />
            </_AddInputSmallWrapper>
          </_AddInputBigWrapper>
        </>
      ) : (
        <>
          <_AddImgWrapper onClick={newItemInput} newItem={newItem}>
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
          <_AddInputBigWrapper>
            {!newItem && (
              <Input
                className="grantPoint"
                width={478}
                label="이름"
                type="text"
                placeholder="ex) 무단 외출"
                name="name"
                value={addPointName}
                onChange={addPointOptionHandler}
              />
            )}
            <_AddInputSmallWrapper>
              {!newItem &&  (
                <Input
                  className="grantPoint"
                  width={243}
                  label="점수"
                  type="number"
                  placeholder="ex) 12 (숫자만 입력)"
                  name="score"
                  value={addPointScore}
                  onChange={addPointOptionHandler}
                />
              )}
              {!newItem && (
                <DropDown
                  className="grantPoint"
                  width={216}
                  label="타입"
                  placeholder="상/벌점"
                  items={['상점', '벌점']}
                  value={AddState === 'BONUS' ? '상점' : '벌점'}
                  onChange={AddChange}
                />
              )}
            </_AddInputSmallWrapper>
          </_AddInputBigWrapper>
        </>
      )}
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
  padding: 0px 0px 0px 30px;
  font-size: 16px;
`;

const _AddImgWrapper = styled.div<{ newItem: boolean }>`
  display: flex;
  align-items: center;
  margin-top: 35px;
  cursor: pointer;
  margin-bottom: ${({ newItem }) => (newItem ? '-20px' : '20px')};
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
