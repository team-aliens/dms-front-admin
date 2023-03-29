import { TagType } from '@/apis/tags/response';
import { useTagList } from '@/hooks/useTagApi';
import { Arrow, Button, CheckBox } from '@team-aliens/design-system';
import { Dispatch, SetStateAction, useState } from 'react';
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

  const tagText = () => {
    if (click) return <Arrow size={18} colorKey="gray6" direction="bottom" />;
    else if (checkedTagList.length > 0) {
      return ' ' + checkedTagList.length;
    }
  };

  const tagColor = () => {
    if (checkedTagList.length && click === false) {
      return 'primary';
    }
    return 'gray';
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
          color={tagColor()}
          kind="outline"
        >
          <>학생 태그{tagText()}</>
        </Button>
        {click && (
          <_Tags>
            {tagList.tags.map((tag) => (
              <_Item key={tag.id}>
                <CheckBox
                  size={18}
                  status={checkedTagList.includes(tag)}
                  onChange={() =>
                    checkedTagList.includes(tag)
                      ? setCheckedTagList(
                          checkedTagList.filter((item) => item !== tag),
                        )
                      : setCheckedTagList([...checkedTagList, tag])
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
