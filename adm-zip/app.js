const AdmZip = require('adm-zip');

const zip = new AdmZip();

const func = async () => {
  let content = "inner content of the file";
  zip.addFile("test.txt", Buffer.from(content, "utf8"), "entry comment goes here");
  
  zip.addLocalFile("./ReadMe.md");
  
  let willSendthis = await zip.toBuffer(() => {
    console.log('success');
  });
  
  let res = await zip.writeZip('./ziped/ziped.zip');
  console.log(res)
};

func();

