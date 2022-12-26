import { pipeline } from 'stream';
import csvtojson from 'csvtojson';
import fs from 'fs';
import path from 'path';

const csvFilePath = path.resolve(__dirname, './csv/username.csv');
const txtFilePath = path.resolve(__dirname, './txt/username.txt');

pipeline(
    fs.createReadStream(csvFilePath),
    csvtojson(),
    fs.createWriteStream(txtFilePath),
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded.');
        }
    }
);
