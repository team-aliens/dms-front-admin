import { Modal, Button } from '@team-aliens/design-system';
import { useDeleteStudent } from '@/hooks/useMangersApis';

interface PropsType {
  selectedStudentId: string;
  close: () => void;
}

export function DeleteStudentModal({ close, selectedStudentId }: PropsType) {
  const deleteStudent = useDeleteStudent(selectedStudentId);

  return (
    <Modal
      content="학생을 삭제 하시겠습니까?"
      close={close}
      buttonList={[
        <Button onClick={close} kind="outline" color="gray">
          취소
        </Button>,
        <Button color="error" onClick={deleteStudent.mutate}>
          확인
        </Button>,
      ]}
    />
  );
}
