import {
  Add,
  Arrow,
  Button,
  Text,
  Input,
  Modal,
  Search,
} from '@team-aliens/design-system';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAddPointOption, useEditPointOption } from '@/apis/points';
import {
  PointOptionRequest,
  PointOptionUnderBarRequest,
  SearchPointOptionsRequest,
} from '@/apis/points/request';
import { useDropDown } from '@/hooks/useDropDown';
import { useForm } from '@/hooks/useForm';
import { useToast } from '@/hooks/useToast';
import { TagListResponse } from '@/apis/tags/response';
import { TagList } from '../main/DetailBox/TagList';
import {
  AddTagRequest,
  EditTagRequest,
  SearchTagRequest,
} from '@/apis/tags/request';
import Triangle from '../../assets/Triangle.svg';
import { AxiosError } from 'axios';
import { useAddTag, useEditTag, useGiveTag } from '@/apis/tags';
import OutsideClickHandler from 'react-outside-click-handler';

interface PropsType {
  close: () => void;
  selectedTag: string;
  setSelectedTag: Dispatch<SetStateAction<string>>;
  allTags: TagListResponse;
  refetchAllTags?: () => void;
  setTagModal: Dispatch<SetStateAction<string>>;
}

interface Colors {
  backColor: string;
  title: string;
  line: boolean;
}

export function ViewAllTagModal({
  close,
  selectedTag,
  setSelectedTag,
  allTags,
  refetchAllTags,
  setTagModal,
}: PropsType) {
  const [newItem, setNewItem] = useState(true);

  const [editColorDropDown, setEditColorDropDown] = useState<boolean>(false);
  const [editSelectedColor, setEditSelectedColor] = useState<string>('#F5F9D6');
  const [addColorDropDown, setAddColorDropDown] = useState<boolean>(false);
  const [addSelectedColor, setAddSelectedColor] = useState<string>('#F5F9D6');
  const ColorDropDownArray: Colors[] = [
    { backColor: '#F5F5F5', title: '회색', line: true },
    { backColor: '#FFF1F0', title: '빨간색', line: true },
    { backColor: '#FFF9DB', title: '노란색', line: true },
    { backColor: '#F5F9D6', title: '초록색', line: true },
    { backColor: '#F5ECFB', title: '보라색', line: true },
    { backColor: '#ECF9FF', title: '파란색', line: false },
  ];

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

  const {
    state: editTag,
    setState: setEditTag,
    onHandleChange: editTagHandler,
  } = useForm<EditTagRequest>({
    editTagName: '',
  });

  const newItemInput = () => {
    setNewItem(!newItem);
  };

  const onClickAndTag = (tagId: string, tagName: string, tagColor: string) => {
    setEditTag({ editTagName: tagName });
    setEditSelectedColor(tagColor);
    setSelectedTag(() => (!(tagId === selectedTag) ? tagId : ''));
  };

  const addTagAPI = useAddTag(addTag.addTagName, addSelectedColor, {
    onSuccess: () => {
      refetchAllTags();
      setAddSelectedColor('');
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

  const { toastDispatch } = useToast();

  const editPointOptionAPI = useEditTag(
    selectedTag,
    editTag.editTagName,
    editSelectedColor,
    {
      onSuccess: () => {
        refetchAllTags();
        toastDispatch({
          toastType: 'SUCCESS',
          actionType: 'APPEND_TOAST',
          message: '태그가 수정되었습니다.',
        });
      },
      onError: () => {
        toastDispatch({
          toastType: 'ERROR',
          actionType: 'APPEND_TOAST',
          message: '태그 수정을 실패했습니다.',
        });
      },
    },
  );

  useEffect(() => {
    setTagModal('VIEW_TAG_OPTIONS');
  }, []);

  return (
    <Modal
      title="학생 태그"
      content=""
      close={() => {
        setSelectedTag('');
        close();
      }}
      buttonList={[
        selectedTag ? (
          <Button
            disabled={!(editSelectedColor && editTag.editTagName)}
            onClick={editPointOptionAPI.mutate}
          >
            수정
          </Button>
        ) : (
          !newItem && (
            <Button
              disabled={!(addTag.addTagName && addSelectedColor)}
              onClick={addTagAPI.mutate}
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
                onClick={onClickAndTag}
                OptionSelected={selectedTag}
                key={id}
                tag_name={name}
                tag_color={color}
                tag_id={id}
              />
            );
          })}
      </_AllTagList>
      {selectedTag ? (
        <>
          <_EditTextWrapper>
            <_Text>항목 수정</_Text>
          </_EditTextWrapper>
          <>
            <Input
              width={478}
              label="이름"
              type="text"
              placeholder="ex) 뉴미디어 디자인과"
              name="editTagName"
              value={editTag.editTagName}
              onChange={editTagHandler}
            />
            <_CenterWrapper>
              <Text size="bodyS" color="gray6">
                색상
              </Text>
              <OutsideClickHandler
                onOutsideClick={() => {
                  setEditColorDropDown(false);
                }}
              >
                <_BigCircleWrapper
                  onClick={() => setEditColorDropDown(!editColorDropDown)}
                >
                  <_BigColorCircle backColor={editSelectedColor} />
                  <img src={Triangle} alt="삼각형" />
                  {editColorDropDown && (
                    <_DropDownContainer>
                      {ColorDropDownArray.map((res) => {
                        const { title, backColor, line } = res;
                        return (
                          <div key={title}>
                            <_SmallCircleWrapper
                              onClick={() => {
                                setEditSelectedColor(backColor);
                                setEditColorDropDown(false);
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
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setAddColorDropDown(false);
                  }}
                >
                  <_BigCircleWrapper
                    onClick={() => setAddColorDropDown(!addColorDropDown)}
                  >
                    <_BigColorCircle backColor={addSelectedColor} />
                    <img src={Triangle} alt="삼각형" />
                    {addColorDropDown && (
                      <_DropDownContainer>
                        {ColorDropDownArray.map((res) => {
                          const { title, backColor, line } = res;
                          return (
                            <div key={title}>
                              <_SmallCircleWrapper
                                onClick={() => {
                                  setAddSelectedColor(backColor);
                                  setAddColorDropDown(false);
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
  width: 85px;
  margin-bottom: ${({ newItem }) => (newItem ? '-20px' : '20px')};
  .addImg {
    width: 17px;
    margin-right: 10px;
  }
`;

const _EditTextWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 35px;
  cursor: pointer;
  width: 85px;
  margin-bottom: 20px;
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

const _BigColorCircle = styled.div<{ backColor: string }>`
  width: 30px;
  height: 30px;
  border: 2px Solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  background-color: ${({ backColor }) => backColor};
  margin-right: 15px;
`;

const _SmallColorCircle = styled.div<{ backColor: string }>`
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
