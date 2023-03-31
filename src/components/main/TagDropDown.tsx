import { TagType } from '@/apis/tags/response';
import { useTagList } from '@/hooks/useTagsApi';
import { Arrow, Button, CheckBox } from '@team-aliens/design-system';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';
import { Tag } from './Tag';

interface PropsType {
  refetchSearchStudents: () => void;
  checkedTagList: TagType[];
  setCheckedTagList: Dispatch<SetStateAction<TagType[]>>;
}

export function TagDropDown({
  refetchSearchStudents,
  checkedTagList,
  setCheckedTagList,
}: PropsType) {
  const [click, setClick] = useState(false);
  const { data: tagList } = useTagList();

  const tagState = useMemo(() => {
    if (click)
      return {
        text: <Arrow size={18} colorKey="gray6" direction="bottom" />,
        color: 'gray',
      };
    else if (checkedTagList.length > 0) {
      return { text: ' ' + checkedTagList.length, color: 'primary' };
    }
    return { text: '', color: 'gray' };
  }, [click]);

  const onChangeCheckBox = (isClick: boolean, tagElement: TagType) => {
    if (isClick) {
      setCheckedTagList(checkedTagList.filter((item) => item !== tagElement));
    } else setCheckedTagList([...checkedTagList, tagElement]);
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setClick(false);
        refetchSearchStudents();
      }}
    >
      <_TagDropDown>
        <Button
          onClick={() => setClick(!click)}
          color={tagState.color as 'primary' | 'gray' | 'error'}
          kind="outline"
        >
          <>학생 태그{tagState.text}</>
        </Button>
        {click && (
          <_Tags>
            {tagList?.tags?.map((tag) => (
              <_Item key={tag.id}>
                <CheckBox
                  size={18}
                  status={checkedTagList.includes(tag)}
                  onChange={() =>
                    onChangeCheckBox(checkedTagList.includes(tag), tag)
                  }
                />
                <Tag id={tag.id} name={tag.name} color={tag.color} />
              </_Item>
            ))}
          </_Tags>
        )}
      </_TagDropDown>
    </OutsideClickHandler>
  );
}

const _TagDropDown = styled.div`
  position: relative;
`;

const _Tags = styled.div`
  position: absolute;
  top: 58px;
  width: 240px;
  max-height: 138px;
  background-color: ${({ theme }) => theme.color.gray1};
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 101;
  overflow-y: scroll;
`;

const _Item = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 8px;
  height: 46px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray3};
`;
