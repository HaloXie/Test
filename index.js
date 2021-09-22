Array.prototype.pushWithLine = function (str, endWith = false) {
  if (str !== undefined && str !== null) {
    this.push(`\n${str}${endWith ? '\n' : ''}`);
  }
  return this;
};

//
const interfaceContent = function (interfaceData) {
  const content = [];

  // bind
  const appendHeader = ({ name, description }) => {
    const header = `## ${escape(name)}`;

    content.pushWithLine(header).pushWithLine(description);
  };
  const appendHeader1 = ({ name, description }) => {
    const header = `##1 ${escape(name)}`;

    content.pushWithLine(header).pushWithLine(description);
  };

  const callAll =
    (...fns) =>
    (...args) =>
      fns.forEach((fn) => fn && fn(...args));

  // content.
  (Array.isArray(interfaceData) ? interfaceData : [interfaceData]).forEach(
    callAll(appendHeader, appendHeader1)
  );

  return content;
};

const content = interfaceContent({ name: '1', description: '22222' });
console.log(content);
