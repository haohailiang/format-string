let fs = require("fs");
let readLine = require("readline");

function readFileToArr(fReadName, cb) {

  let tagNamePool = ['script', 'template', 'style'];
  let result = {};
  let curTagName = '';
  let arr = [];
    let readObj = readLine.createInterface({
        input: fs.createReadStream(fReadName)
    });

    readObj.on('line', function (line) {
      let startRegExp
      let endRegExp
      // let curTagName
      let isStartMatch = false;
      let isEndMatch = false;
      for(let i=0; i<tagNamePool.length; i++) {
        startRegExp = new RegExp('^<' + tagNamePool[i] + '');
        endRegExp = new RegExp('^<\/' + tagNamePool[i] + '');

        if (startRegExp.test(line)) {
          curTagName = tagNamePool[i];
          isStartMatch = true;
          break;
        } else if (endRegExp.test(line)) {
          isEndMatch = true;
          break;
        }
      }

      if (isEndMatch) {
        arr.shift();
        if (curTagName === 'script') {
          arr.shift();
          arr.pop();
        }
        result[curTagName] = arr;
        curTagName = '';
        arr = [];
      } else if (curTagName) {
        arr.push(line);
      }
    });
    readObj.on('close', function () {
        cb(result);
    });
}

readFileToArr('./haha.vue', function (result) {
    const template = [
      'xxx = xx',
      '   xxx = xx',
    ]
    const templateStr = [
      ...template,
      ...result.template,
      'xxx',
    ].join('\n');

    const scriptStr = [
      ...template,
      ...result.script,
      'xxx',
    ].join('\n');

    fs.writeFileSync('./haha.text', templateStr, { flag: 'a+' })
    fs.writeFileSync('./haha.text', scriptStr, { flag: 'a+' })
});
