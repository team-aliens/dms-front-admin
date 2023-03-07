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

  for (let i = 1; i < 8; i++) {
    worksheet.getCell(1, i).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE400' },
    };

    worksheet.getCell(1, i).border = {
      top: { style: 'thin', color: { argb: '949494' } },
      left: { style: 'thin', color: { argb: '949494' } },
      bottom: { style: 'thin', color: { argb: '949494' } },
      right: { style: 'thin', color: { argb: '949494' } },
    };

    worksheet.getCell(1, i).alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
  }

  worksheet.getColumn(4).width = 12;
  worksheet.getColumn(5).width = 10;
  worksheet.getColumn(6).width = 15;
  worksheet.getColumn(7).width = 15;

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), '학생등록_템플릿.xlsx');
};
