import fs from 'fs';
import csvtojson from 'csvtojson';

const csvFilePath = './csv/username.csv';
const txtFilePath = './txt/username.txt';

csvtojson()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    if(fs.existsSync(txtFilePath)){
        fs.unlinkSync(txtFilePath);
    }
    jsonObj.forEach((obj)=>{
        fs.appendFile(txtFilePath, JSON.stringify(obj) + '\n', (err) => {
            if (err) {
                console.error(err);
                return;
            };
        });
    });
    console.log('File has been created');
});
