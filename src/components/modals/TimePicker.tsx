import { DropDown } from '@team-aliens/design-system';
import { dropDownItemArray } from '@/constent/DropDownItem';

type StateType = {
  startHourState: string;
  startMinState: string;
  endHourState: string;
  endMinState: string;
};
type OnChangeType = {
  onChangeSH: (value: string) => void;
  onChangeSM: (value: string) => void;
  onChangeEH: (value: string) => void;
  onChangeEM: (value: string) => void;
};

interface TimePickerProps {
  timeState: StateType;
  onChangeState: OnChangeType;
}

export function TimePicker({ timeState, onChangeState }: TimePickerProps) {
  const { startHourState, startMinState, endHourState, endMinState } =
    timeState;
  const { onChangeSH, onChangeSM, onChangeEH, onChangeEM } = onChangeState;

  const hourArray = dropDownItemArray(24);
  const minArray = dropDownItemArray(60);

  return (
    <>
      <DropDown
        items={hourArray}
        placeholder="00"
        onChange={(value) => {
          onChangeSH(value);
        }}
        width={80}
        value={startHourState}
      />
      <p>:</p>
      <DropDown
        items={minArray}
        placeholder="00"
        onChange={(value) => {
          onChangeSM(value);
        }}
        width={80}
        value={startMinState}
      />
      <p>~</p>
      <DropDown
        items={hourArray}
        placeholder="00"
        onChange={(value) => {
          onChangeEH(value);
        }}
        width={80}
        value={endHourState}
      />
      <p>:</p>
      <DropDown
        items={minArray}
        placeholder="00"
        onChange={(value) => {
          onChangeEM(value);
        }}
        width={80}
        value={endMinState}
      />
    </>
  );
}
