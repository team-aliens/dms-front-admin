import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';

export const download = async () => {
  const data = {
    '이름': '',
    '학번': '',
    '호실 번호': '',
    '성별 (ex. 남, 여)': '',
  };

  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('학생등록_템플릿');

  const columns = Object.keys(data);
  worksheet.columns = columns.map((column) => ({
    header: column,
    key: column,
  }));
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), '학생등록_템플릿.xlsx');
};
