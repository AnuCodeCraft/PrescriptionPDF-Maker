const fs = require('fs');
var path = require('path');
const ejs = require('ejs');
const pdf = require('html-pdf');
const AWS  = require('aws-sdk');

require('dotenv').config()


const s3 = new AWS.S3({
  accessKeyId: process.env.AWSID,
  secretAccessKey: process.env.AWSKEY,
  region: process.env.AWS_REGION,
});

//console.log(accessKeyId, secretAccessKey,region)
console.log(process.env.AWSID);

const data = {
  user: {
        "name" : "Rahul Sharma",
        "age": "23",
        "bmi":"18.5",
        "problem":"cold and cough"
    }, 
};  
const gethtmltopdf = async () => {
    try {
        
        const filePathName = path.resolve(__dirname, 'example1/index.ejs');
        console.log(filePathName)
        const htmlString = fs.readFileSync(filePathName).toString();
        let  options = { format: 'Letter' };
        const ejsData = ejs.render(htmlString, data);


        return await pdf.create(ejsData, options).toStream((err, response) => {
            if (err) return console.log(err);
            return new Promise((res, rej) => {
                const uploadParams = {
                  Bucket: 'docprofilephoto',
                  Key: 'doctorPrescription/questions.pdf',
                  ACL: 'public-read-write',
                  Body: response,
                };
                s3.upload(uploadParams, (err, data) => {
                  if (err) {
                      console.log("error", err);
                    rej('');
                  }
                 return data.Location;
                });
              });
        });
       
    } catch (err) {
        console.log("Error processing request: " + err);
    }


}


module.exports = gethtmltopdf;

