import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';

export const download = async () => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('학생등록_템플릿');

  const columns = [
    '학년',
    '반',
    '번호',
    '성별\n(ex. 남, 여)',
    '이름',
    '호실번호\n(ex. 301,  501)',
    '호실자리위치\n(ex. A, B, C)',
  ];
  worksheet.columns = columns.map((column) => ({
    header: column,
    key: column,
    alignment: {
      vertical: 'middle',
      horizontal: 'center',
    },
  }));

  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE400' },
  };

  worksheet.getRow(1).border = {
    top: { style: 'double', color: { argb: '949494' } },
    left: { style: 'double', color: { argb: '949494' } },
    bottom: { style: 'double', color: { argb: '949494' } },
    right: { style: 'double', color: { argb: '949494' } },
  };

  worksheet.getRow(1).alignment = {
    vertical: 'middle',
    horizontal: 'center',
  };

  worksheet.getColumn(4).width = 12;
  worksheet.getColumn(5).width = 10;
  worksheet.getColumn(6).width = 15;
  worksheet.getColumn(7).width = 15;

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), '학생등록_템플릿.xlsx');
};
