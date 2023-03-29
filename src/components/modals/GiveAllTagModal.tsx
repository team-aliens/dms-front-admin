import {
  Add,
  Arrow,
  Button,
  Input,
  Modal,
  Search,
  Text,
} from '@team-aliens/design-system';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from '@/hooks/useForm';
import Triangle from '../../assets/Triangle.svg';
import { TagList } from '../main/DetailBox/TagList';
import { AddTagRequest, SearchTagRequest } from '@/apis/tags/request';
import { TagListResponse } from '@/apis/tags/response';
import OutsideClickHandler from 'react-outside-click-handler';
import { useAddTag, useGiveTag } from '@/apis/tags';
import { useToast } from '@/hooks/useToast';
import { AxiosError } from 'axios';

interface PropsType {
  selectedStudentId: string[];
  close: () => void;
  allTags: TagListResponse;
  refetchAllTags: () => void;
  selectedTag: string;
  setSelectedTag: Dispatch<SetStateAction<string>>;
  setTagModal: Dispatch<SetStateAction<string>>;
}

interface Colors {
  backColor: string;
  title: string;
  line: boolean;
}

export function GiveAllTagModal({
  close,
  selectedStudentId,
  allTags,
  refetchAllTags,
  selectedTag,
  setSelectedTag,
  setTagModal,
}: PropsType) {
  const [newItem, setNewItem] = useState<boolean>(true);
  const [colorDropDown, setColorDropDown] = useState<boolean>(false);
  const [selectedColor, setselectedColor] = useState<string>('');
  const ColorDropDownArray: Colors[] = [
    { backColor: '#F5F5F5', title: '회색', line: true },
    { backColor: '#FFF1F0', title: '빨간색', line: true },
    { backColor: '#FFF9DB', title: '노란색', line: true },
    { backColor: '#F5F9D6', title: '초록색', line: true },
    { backColor: '#F5ECFB', title: '보라색', line: true },
    { backColor: '#ECF9FF', title: '파란색', line: false },
  ];
  const { toastDispatch } = useToast();
  const { state: tagState, onHandleChange: tagStateHandler } =
    useForm<SearchTagRequest>({
      searchTagName: '',
    });
  const {
    state: addTag,
    onHandleChange: addTagHandler,
    setState: setAddTag,
  } = useForm<AddTagRequest>({
    addTagName: '',
  });

  const newItemInput = () => {
    if (selectedTag) {
      setSelectedTag('');
    }
    setNewItem(!newItem);
  };

  const onClickTag = (id: string) => {
    if (selectedTag === id) {
      setSelectedTag('');
    } else {
      setSelectedTag(id);
    }
    if (!selectedTag) {
      setNewItem(true);
    }
  };

  const closeColorDropDown = () => {
    setColorDropDown(false);
  };

  const giveTagAPI = useGiveTag(
    selectedTag,
    selectedStudentId.filter((i) => i),
    {
      onSuccess: () => {
        toastDispatch({
          actionType: 'APPEND_TOAST',
          toastType: 'SUCCESS',
          message: `태그가 부여되었습니다.`,
        });
      },
      onError: (e: AxiosError) => {
        if (e.request.status) {
          switch (e.request.status) {
            case 500:
              return toastDispatch({
                actionType: 'APPEND_TOAST',
                toastType: 'ERROR',
                message: `관리자에게 문의해주세요.`,
              });
            default:
              toastDispatch({
                actionType: 'APPEND_TOAST',
                toastType: 'ERROR',
                message: `태그 부여를 실패했습니다.`,
              });
          }
        } else {
          toastDispatch({
            actionType: 'APPEND_TOAST',
            toastType: 'SUCCESS',
            message: `인터넷 연결을 확인해주세요.`,
          });
        }
      },
    },
  );

  const addTagAPI = useAddTag(addTag.addTagName, selectedColor, {
    onSuccess: () => {
      refetchAllTags();
      setselectedColor('');
      setAddTag({ addTagName: '' });
      setNewItem(true);
      toastDispatch({
        toastType: 'SUCCESS',
        actionType: 'APPEND_TOAST',
        message: '태그가 추가되었습니다.',
      });
    },
    onError: (e: AxiosError) => {
      if (e.request.status) {
        switch (e.request.status) {
          case 400:
            return toastDispatch({
              actionType: 'APPEND_TOAST',
              toastType: 'ERROR',
              message: `태그 이름은 10자 이하여야 합니다.`,
            });
          case 500:
            return toastDispatch({
              actionType: 'APPEND_TOAST',
              toastType: 'ERROR',
              message: `관리자에게 문의해주세요.`,
            });
          default:
            toastDispatch({
              toastType: 'ERROR',
              actionType: 'APPEND_TOAST',
              message: '태그 추가를 실패했습니다.',
            });
        }
      } else {
        toastDispatch({
          actionType: 'APPEND_TOAST',
          toastType: 'SUCCESS',
          message: `인터넷 연결을 확인해주세요.`,
        });
      }
    },
  });

  const { isLoading } = giveTagAPI;

  const submitAPI = newItem ? giveTagAPI.mutate : addTagAPI.mutate;

  useEffect(() => {
    setTagModal('GIVE_TAG_OPTIONS');
  }, []);

  return (
    <Modal
      title="학생 태그"
      content=""
      close={close}
      buttonList={[
        <Button
          margin={newItem && [-40, 0, 0, 0]}
          disabled={
            newItem
              ? !selectedTag
              : !(addTag.addTagName && selectedColor && !isLoading)
          }
          onClick={submitAPI}
        >
          {newItem ? '부여' : '추가'}
        </Button>,
      ]}
    >
      <_SearchWrapper>
        <Search className="Search" />
        <_SearchInput
          type="text"
          placeholder="ex) 봉사활동"
          name="SearchTagName"
          value={tagState.searchTagName}
          onChange={tagStateHandler}
        />
      </_SearchWrapper>
      <_AllTagList>
        {allTags?.tags
          .filter((options) => options.name.includes(tagState.searchTagName))
          .map((options) => {
            const { color, name, id } = options;
            return (
              <TagList
                onClick={onClickTag}
                OptionSelected={selectedTag}
                key={id}
                tag_name={name}
                tag_color={color}
                tag_id={id}
              />
            );
          })}
      </_AllTagList>
      <_AddImgWrapper onClick={newItemInput} newItem={newItem}>
        {newItem ? <Add /> : <Arrow direction="top" />}
        {newItem ? <_Text>항목 추가</_Text> : <_Text>항목 닫기</_Text>}
      </_AddImgWrapper>
      <_AddInputBigWrapper>
        {!newItem && (
          <>
            <Input
              width={478}
              label="이름"
              type="text"
              placeholder="ex) 뉴미디어 디자인과"
              name="addTagName"
              value={addTag.addTagName}
              onChange={addTagHandler}
            />
            <_CenterWrapper>
              <Text size="bodyS" color="gray6">
                색상
              </Text>
              <OutsideClickHandler onOutsideClick={closeColorDropDown}>
                <_BigCircleWrapper
                  onClick={() => setColorDropDown(!colorDropDown)}
                >
                  <_BigColorCircle backColor={selectedColor} />
                  <img src={Triangle} alt="삼각형" />
                  {colorDropDown && (
                    <_DropDownContainer>
                      {ColorDropDownArray.map((res) => {
                        const { title, backColor, line } = res;
                        return (
                          <div key={title}>
                            <_SmallCircleWrapper
                              onClick={() => {
                                setselectedColor(backColor);
                                closeColorDropDown();
                              }}
                            >
                              <_SmallColorCircle backColor={backColor} />
                              <Text size="bodyS">{title}</Text>
                            </_SmallCircleWrapper>
                            {line && <_line />}
                          </div>
                        );
                      })}
                    </_DropDownContainer>
                  )}
                </_BigCircleWrapper>
              </OutsideClickHandler>
            </_CenterWrapper>
          </>
        )}
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
  padding: 0px 0px 0px 30px;
  font-size: 16px;
`;

const _AddImgWrapper = styled.div<{ newItem: boolean }>`
  display: flex;
  align-items: center;
  margin-top: 35px;
  cursor: pointer;
  width: 85px;
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

const _AllTagList = styled.div`
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

const _BigColorCircle = styled.div<{
  backColor: string;
}>`
  width: 30px;
  height: 30px;
  border: 2px Solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  background-color: ${({ backColor }) => backColor};
  margin-right: 15px;
`;

const _SmallColorCircle = styled.div<{
  backColor: string;
}>`
  width: 13px;
  height: 13px;
  border: 1px Solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  background-color: ${({ backColor }) => backColor};
  margin-right: 15px;
  margin-left: 7px;
`;

const _line = styled.div`
  width: 110px;
  height: 0px;
  border: 1px solid #eeeeee;
`;

const _BigCircleWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;

const _SmallCircleWrapper = styled.div`
  height: 44.3px;
  width: 110px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const _CenterWrapper = styled.div`
  margin-top: 20px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const _DropDownContainer = styled.div`
  width: 132px;
  height: 280px;
  border: 2px solid #eeeeee;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  position: absolute;
  margin-left: 70px;
  margin-top: -248px;
  border-radius: 5px;
  z-index: 99;
`;
