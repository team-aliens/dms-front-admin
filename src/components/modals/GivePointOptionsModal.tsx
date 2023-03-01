import { useAddPointOption, useGivePointOption } from "@/apis/points";
import { SearchPointOptionsRequest } from "@/apis/points/response";
import { useDropDown } from "@/hooks/useDropDown";
import { useForm } from "@/hooks/useForm";
import { usePointOptionList } from "@/hooks/usePointsApi";
import { Add, Arrow, Button, DropDown, Input, Modal, Search } from "@team-aliens/design-system";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { PointItem } from "../main/DetailBox/PointItem";

interface PropsType {
    selectedStudentId: string;
    close: () => void;
}

export function GivePointOptionsModal({ close, selectedStudentId }: PropsType) {
    const [newItem, setNewItem] = useState(true)
    const { onDropDownChange, sort } = useDropDown<string>("")
    const [addPointOption, setAddPointOption] = useState({
        score: null,
        name: "",
    })

    const { score, name } = addPointOption;

    const onAddPointOption = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setAddPointOption({
            ...addPointOption,
            [name]: value,
        });
    };

    const [selectedPointOption, setSelectedPointOption] = useState<string>('');
    const { data: allPointOptions } = usePointOptionList();

    const newItemInput = () => {
        setNewItem(!newItem)
    }

    const onClickPointOption = (id: string) => {
        setSelectedPointOption((OptionId) => (OptionId === id ? '' : id));
    }

    const { state: pointOptionState, onHandleChange } =
        useForm<SearchPointOptionsRequest>({
            point_option_name: '',
        });

    const givePointOptionAPI = useGivePointOption(selectedPointOption, selectedStudentId);
    const addPointOptionAPI = useAddPointOption(score, name, sort);

    return (
        <Modal
            title="상/벌점 항목을 선택해주세요."
            content=""
            close={close}
            buttonList={[
                <Button margin={newItem ? [-40, 0, 0, 0] : [0, 0, 0, 0]} disabled={newItem ? !(selectedPointOption && selectedStudentId) : !(score && name && sort)} onClick={newItem ? givePointOptionAPI.mutate : addPointOptionAPI.mutate}>{newItem ? "부여" : "추가"}</Button>
            ]}>
            <_SearchWrapper>
                <Search className="Search" />
                <_SearchInput type="text" placeholder="ex) 봉사활동" name="point_option_name" value={pointOptionState.point_option_name} onChange={onHandleChange} />
            </_SearchWrapper>
            <_PointOptionList>
                {allPointOptions?.point_options.filter((options) => options.name.includes(pointOptionState.point_option_name)).map((options, i) => {
                    const { point_option_id, name, type, score } = options;
                    return (
                        <PointItem
                            key={i}
                            point_history_id={point_option_id}
                            name={name}
                            type={type}
                            score={score}
                            canClick={true}
                            onClick={onClickPointOption}
                            OptionSelected={selectedPointOption}
                        />
                    );
                })}
            </_PointOptionList>
            <_AddImgWrapper onClick={newItemInput} newItem={newItem}>
                {newItem ? <Add className="addImg" /> : <Arrow direction="top" className="addImg" />}
                {newItem ? <_Text>항목 추가</_Text> : <_Text>항목 닫기</_Text>}
            </_AddImgWrapper>
            <_AddInputBigWrapper>
                {newItem ? "" : <Input width={478} label="이름" type="text" placeholder="ex) 무단 외출" name="name" value={name} onChange={onAddPointOption} />}
                <_AddInputSmallWrapper>
                    {newItem ? "" : <Input width={243} label="점수" type="number" placeholder="ex) 12 (숫자만 입력)" name="score" value={score} onChange={onAddPointOption} />}
                    {newItem ? "" : <DropDown width={216} label="타입" placeholder="상/벌점" items={["상점", '벌점']} value={sort} onChange={onDropDownChange}></DropDown>}
                </_AddInputSmallWrapper>
            </_AddInputBigWrapper>
        </Modal >
    );
}

const _SearchWrapper = styled.div`
    position: relative;
    margin-bottom: 20px;
.Search{
    position: absolute;
    top: 8px;
}
`

const _SearchInput = styled.input`
    width: 202px;
    height: 40px;
    border-bottom: 1px solid #DDDDDD;
    padding: 0px 0px 0px 30px;
    font-size: 16px;
`

const _AddImgWrapper = styled.div<{newItem: boolean}>`
    display: flex;
    align-items: center;
    margin-top: 35px;
    cursor: pointer;
    margin-bottom: ${({ newItem }) => newItem ? "-20px" : "20px"};
.addImg{
    width: 17px;
    margin-right: 10px;
}
`

const _Text = styled.div`
    font-size: 14px;
    font-weight: 700;
    color: #555555;
`

const _PointOptionList = styled.div`
    overflow: scroll;
    height: 261px;
    > div {
        margin-bottom: 9px;
    }
`

const _AddInputBigWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const _AddInputSmallWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
`