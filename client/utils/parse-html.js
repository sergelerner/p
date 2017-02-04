export default (inputDoc) => {
  const styleStart = '<style type="text/css">';
  const styleEnd = '</style>';
  const splitStyleStart = inputDoc.split(styleStart);
  const splitStyleEnd = splitStyleStart[1].split(styleEnd);

  const htmlStart = '<body ';
  const htmlStart2 = '>';
  const htmlEnd = '</body>';
  let splitHtmlStart = splitStyleEnd[1].split(htmlStart);
  const splitHtmlStart2 = splitHtmlStart[1].split(htmlStart2);
  const htmlClass = splitHtmlStart2[0];
  const htmlStartFull = htmlStart + htmlClass + htmlStart2;
  splitHtmlStart = splitStyleEnd[1].split(htmlStartFull);
  const splitHtmlEnd = splitHtmlStart[1].split(htmlEnd);

  return {
    styles: styleStart + splitStyleEnd[0] + styleEnd,
    html: `<div>${splitHtmlEnd[0]}</div>`,
  };
};
