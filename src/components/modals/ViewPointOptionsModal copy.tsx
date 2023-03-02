import { useAddPointOption, useDeletePointOption, useEditPointOption } from "@/apis/points";
import { SearchPointOptionsRequest } from "@/apis/points/response";
import { useDropDown } from "@/hooks/useDropDown";
import { useForm } from "@/hooks/useForm";
import { useModal } from "@/hooks/useModal";
import { usePointOptionList } from "@/hooks/usePointsApi";
import { Add, Arrow, Button, DropDown, Input, Modal, Search } from "@team-aliens/design-system";
import { useState } from "react";
import styled from "styled-components";
import { PointItem } from "../main/DetailBox/PointItem";
import { DeletePointListModal } from '../modals/DeletePointOption';

interface PropsType {
    selectedStudentId?: string;
    close: () => void;
}

export function ViewPointOptionsModal({ close, selectedStudentId }: PropsType) {
    const { modalState, selectModal, closeModal } = useModal();
    const [newItem, setNewItem] = useState(true)
    const { onDropDownChange: AddChange, sort: AddState } = useDropDown<string>("")
    const { onDropDownChange: EditChange, sort: EditState } = useDropDown<string>("")
    const [addPointOption, setAddPointOption] = useState({
        score: 0,
        name: "",
    })
    const [editPointOption, setEditPointOption] = useState({
        score_: 0,
        name_: "",
    })

    const { score, name } = addPointOption;
    const { score_, name_ } = editPointOption;

    const onAddPointOption = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setAddPointOption({
            ...addPointOption,
            [name]: value,
        });
    };

    const onEditPointOption = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setEditPointOption({
            ...editPointOption,
            [name]: value,
        });
    };

    const [selectedPointOption, setSelectedPointOption] = useState<string>('');
    const { data: allPointOptions } = usePointOptionList();

    const newItemInput = () => {
        setNewItem(!newItem)
    }

    const onClickPointOption = (id: string, name: string, score: number, type: string) => {
        setEditPointOption({
            score_: score,
            name_: name,
        })
        EditChange(type)
        setSelectedPointOption((OptionId) => (OptionId === id ? "" : id));
    }

    const { state: pointOptionState, onHandleChange } =
        useForm<SearchPointOptionsRequest>({
            point_option_name: '',
        });

    const addPointOptionAPI = useAddPointOption(score, name, AddState);
    const editPointOptionAPI = useEditPointOption(selectedPointOption, score_, name_, EditState);
    const deletePointOptionAPI = useDeletePointOption(selectedPointOption);

    return (
        <Modal
            title="상/벌점 항목"
            content=""
            close={close}
            buttonList={[
                selectedPointOption ? <Button disabled={selectedPointOption ? !(editPointOption.score_ && editPointOption.name_ && EditState) : !(score && name && AddState)} onClick={selectedPointOption ? editPointOptionAPI.mutate : addPointOptionAPI.mutate}>수정</Button> : !newItem && <Button disabled={!(score && name && AddState)} onClick={addPointOptionAPI.mutate}>추가</Button>
            ]}>
            {modalState.selectedModal === 'DELETE_POINT_OPTION' && (
                <DeletePointListModal
                    onClick={deletePointOptionAPI.mutate}
                    closeModal={closeModal}
                />
            )}
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
                            canDelete={true}
                            canClick={true}
                            onClick={onClickPointOption}
                            OptionSelected={selectedPointOption}
                        />
                    );
                })}
            </_PointOptionList>
            {selectedPointOption ?
                <>
                    <_AddImgWrapper onClick={selectedPointOption ? undefined : newItemInput} newItem={newItem}>
                        <_Text>항목 수정</_Text>
                    </_AddImgWrapper>
                    <_AddInputBigWrapper>
                        <Input margin={newItem ? [50, 0, 0, 0] : [0, 0, 0, 0]} width={478} label="이름" type="text" placeholder="ex) 무단 외출" name="name_" value={name_} onChange={onEditPointOption} />
                        <_AddInputSmallWrapper>
                            <Input width={243} label="점수" type="number" placeholder="ex) 12 (숫자만 입력)" name="score_" value={score_} onChange={onEditPointOption} />
                            <DropDown width={216} disable={true} label="타입" placeholder="상/벌점" items={["상점", '벌점']} value={EditState === "BONUS" ? "상점" : "벌점"} onChange={EditChange}></DropDown>
                        </_AddInputSmallWrapper>
                    </_AddInputBigWrapper></>
                :
                <>
                    <_AddImgWrapper onClick={newItemInput} newItem={newItem}>
                        {newItem ? <Add className="addImg" /> : <Arrow direction="top" className="addImg" />}
                        {newItem ? <_Text>항목 추가</_Text> : <_Text>항목 닫기</_Text>}
                    </_AddImgWrapper>
                    <_AddInputBigWrapper>
                        {newItem ? "" : <Input width={478} label="이름" type="text" placeholder="ex) 무단 외출" name="name" value={name} onChange={onAddPointOption} />}
                        <_AddInputSmallWrapper>
                            {newItem ? "" : <Input width={243} label="점수" type="number" placeholder="ex) 12 (숫자만 입력)" name="score" value={score} onChange={onAddPointOption} />}
                            {newItem ? "" : <DropDown width={216} label="타입" placeholder="상/벌점" items={["상점", '벌점']} value={AddState === "BONUS" ? "상점" : "벌점"} onChange={AddChange}></DropDown>}
                        </_AddInputSmallWrapper>
                    </_AddInputBigWrapper>
                </>}
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

const _AddImgWrapper = styled.div<{ newItem: boolean }>`
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
    height: 22vh;
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