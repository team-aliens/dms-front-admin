export const getFileNameFromContentDisposition = (encodedText: string) => {
  let decodedText = decodeURI(encodedText);
  decodedText = decodedText.replace(' ', '');
  decodedText = decodedText.replace('attachment;filename=', '');
  return decodedText;
};
