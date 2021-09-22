// 这个比 xml2json 多一个 <?xml version='1.1' encoding='UTF-8'?>

var convert = require('xml-js');

const xmlContent = `<?xml version="1.0" encoding="UTF-8"?><project><description>description11112</description></project>`;

const jsonContent = convert.xml2json(xmlContent, { compact: true });
console.log(jsonContent);
console.log(JSON.parse(jsonContent));

// const xml = convert.json2xml(jsonContent, { compact: true });
// console.log(xml);
